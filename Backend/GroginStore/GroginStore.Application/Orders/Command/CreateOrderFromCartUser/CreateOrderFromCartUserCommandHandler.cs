using AutoMapper;
using GroginStore.Application.Users;
using GroginStore.Domain.Constant;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Orders.Command.CreateOrderFromCartUser;

public class CreateOrderFromCartUserCommandHandler : IRequestHandler<CreateOrderFromCartUserCommand>
{
    private readonly ILogger<CreateOrderFromCartUserCommandHandler> logger;
    private readonly IUserContext userContext;
    private readonly IOrderRepository orderRepository;
    private readonly IOrderDetailRepository orderDetailRepository;
    private readonly ICartRepository cartRepository;
    private readonly IMapper mapper;
    private readonly IPaymentsRepository paymentsRepository;
    private readonly IDeliveriesRepository deliveriesRepository;
    private readonly IAddressRepository addressRepository;
    private readonly IVoucherRepository voucherRepository;
    private readonly IUserVoucherRepository userVoucherRepository;
    private readonly IOrderVoucherRepository orderVoucherRepository;
    public CreateOrderFromCartUserCommandHandler(
        ILogger<CreateOrderFromCartUserCommandHandler> logger, IUserContext userContext,
        IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository,
        ICartRepository cartRepository, IMapper mapper, IPaymentsRepository paymentsRepository,
        IDeliveriesRepository deliveriesRepository, IAddressRepository addressRepository,
        IVoucherRepository voucherRepository, IUserVoucherRepository userVoucherRepository,
        IOrderVoucherRepository orderVoucherRepository)
    {
        this.logger = logger;
        this.userContext = userContext;
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.cartRepository = cartRepository;
        this.mapper = mapper;
        this.paymentsRepository = paymentsRepository;
        this.deliveriesRepository = deliveriesRepository;
        this.addressRepository = addressRepository;
        this.voucherRepository = voucherRepository;
        this.userVoucherRepository = userVoucherRepository;
        this.orderVoucherRepository = orderVoucherRepository;
    }


    public async Task Handle(CreateOrderFromCartUserCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Create order from items in cart use");
        var user = userContext.GetCurrentUser();
        var paymentExist = await paymentsRepository.GetPaymentById(request.PaymentId!) ?? throw new NotFoundException(nameof(Payment), request.PaymentId!);
        var addressExist = await addressRepository.GetDetailAddresById(request.AddresId!) ?? throw new NotFoundException(nameof(Address), request.AddresId!);
        var deliveryExist = await deliveriesRepository.GetDeliveryById(request.DeliveryId!) ?? throw new NotFoundException(nameof(Delivery), request.DeliveryId!);

        var orderModel = mapper.Map<Order>(request);
        orderModel.OrderDate = DateTime.Now;
        orderModel.UserId = user!.Id;
        orderModel.OrderStatus = 1;

        var order = await orderRepository.CreateOrder(orderModel);

        var itemsProductCart = await cartRepository.GetCartItemsByUserId(user!.Id);
        if (!itemsProductCart.Any()) throw new InvalidOperationException("No items in cart to create order.");

        decimal subtotalOrder = 0;

        foreach (var item in itemsProductCart)
        {
            var orderDetailModel = new OrderDetail
            {
                OrderId = order.Id,
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                Subtotal = item.Subtotal,
            };

            subtotalOrder += item.Subtotal;
            await orderDetailRepository.CreateOrderDetail(orderDetailModel);
            await cartRepository.DeleteCart(item);
        }

        decimal totalAmount = subtotalOrder + paymentExist.PaymentCost + deliveryExist.Price;

        // Handle Free Shipping Voucher
        if (request.VoucherFreeShippingId != null)
        {
            var voucherFreeShipping = await voucherRepository.GetVoucherById(request.VoucherFreeShippingId);

            if (voucherFreeShipping == null || voucherFreeShipping.Type != VoucherType.FreeShipping || !voucherFreeShipping.IsActive ||
                (voucherFreeShipping.ExpiryDate.HasValue && voucherFreeShipping.ExpiryDate <= DateTime.Now))
            {
                throw new NotFoundException(nameof(Voucher), request.VoucherFreeShippingId!);
            }

            totalAmount -= deliveryExist.Price; // Apply free shipping

            var orderVoucher = new OrderVoucher
            {
                OrderId = order.Id,
                VoucherId = voucherFreeShipping.Id
            };
            await orderVoucherRepository.AddOrderVoucher(orderVoucher);

            await userVoucherRepository.RemoveVoucherAfterClaim(user.Id, request.VoucherFreeShippingId);
        }

        // Handle Discount Voucher
        if (request.VoucherDiscountId != null)
        {
            var voucherDiscount = await voucherRepository.GetVoucherById(request.VoucherDiscountId);

            if (voucherDiscount == null || !voucherDiscount.IsActive || (voucherDiscount.ExpiryDate.HasValue && voucherDiscount.ExpiryDate <= DateTime.Now))
            {
                throw new NotFoundException(nameof(Voucher), request.VoucherDiscountId!);
            }

            decimal discountAmount = 0;

            if (voucherDiscount.Type == VoucherType.Percentage)
            {
                discountAmount = subtotalOrder * (voucherDiscount.DiscountValue / 100) ?? 0;

                if (voucherDiscount.MaxDiscountAmount.HasValue && discountAmount > voucherDiscount.MaxDiscountAmount.Value)
                {
                    discountAmount = voucherDiscount.MaxDiscountAmount.Value;
                }

                totalAmount -= discountAmount;
            }
            else if (voucherDiscount.Type == VoucherType.Fixed && voucherDiscount.DiscountValue.HasValue)
            {
                totalAmount -= voucherDiscount.DiscountValue.Value;
            }

            var orderVoucher = new OrderVoucher
            {
                OrderId = order.Id,
                VoucherId = voucherDiscount.Id
            };
            await orderVoucherRepository.AddOrderVoucher(orderVoucher);

            await userVoucherRepository.RemoveVoucherAfterClaim(user.Id, request.VoucherDiscountId);
        }

        order.TotalAmount = totalAmount;
        await orderRepository.SaveChanges();

    }
}

