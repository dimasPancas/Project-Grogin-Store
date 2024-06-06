using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using GroginStore.Application.Users;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.Constant;

namespace GroginStore.Application.Orders.Command.CreateOrderFromProduct;

public class CreateOrderFromProductCommandHandler : IRequestHandler<CreateOrderFromProductCommand>
{
    private readonly IUserContext userContext;
    private readonly IMapper mapper;
    private readonly ILogger<CreateOrderFromProductCommandHandler> logger;
    private readonly IOrderRepository orderRepository;
    private readonly IOrderDetailRepository orderDetailRepository;
    private readonly IPaymentsRepository paymentsRepository;
    private readonly IDeliveriesRepository deliveriesRepository;
    private readonly IAddressRepository addressRepository;
    private readonly IProductsRepository productsRepository;
    private readonly IVoucherRepository voucherRepository;
    private readonly IUserVoucherRepository userVoucherRepository;
    private readonly IOrderVoucherRepository orderVoucherRepository;

    public CreateOrderFromProductCommandHandler(
        IUserContext userContext,
        IMapper mapper,
        ILogger<CreateOrderFromProductCommandHandler> logger,
        IOrderRepository orderRepository,
        IOrderDetailRepository orderDetailRepository,
        IPaymentsRepository paymentsRepository,
        IDeliveriesRepository deliveriesRepository,
        IAddressRepository addressRepository,
        IProductsRepository productsRepository,
        IVoucherRepository voucherRepository,
        IUserVoucherRepository userVoucherRepository,
        IOrderVoucherRepository orderVoucherRepository)
    {
        this.userContext = userContext;
        this.mapper = mapper;
        this.logger = logger;
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.paymentsRepository = paymentsRepository;
        this.deliveriesRepository = deliveriesRepository;
        this.addressRepository = addressRepository;
        this.productsRepository = productsRepository;
        this.voucherRepository = voucherRepository;
        this.userVoucherRepository = userVoucherRepository;
        this.orderVoucherRepository = orderVoucherRepository;
    }

    public async Task Handle(CreateOrderFromProductCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Create new order from product");
        var user = userContext.GetCurrentUser();
        if (user == null) throw new UnauthorizedAccessException("User is not logged in.");

        var paymentExist = await paymentsRepository.GetPaymentById(request.PaymentId!) ?? throw new NotFoundException(nameof(Payment), request.PaymentId!);
        var addressExist = await addressRepository.GetDetailAddresById(request.AddresId!) ?? throw new NotFoundException(nameof(Address), request.AddresId!);
        var deliveryExist = await deliveriesRepository.GetDeliveryById(request.DeliveryId!) ?? throw new NotFoundException(nameof(Delivery), request.DeliveryId!);
        var productExist = await productsRepository.GetDetailProduct(request.ProductId!) ?? throw new NotFoundException(nameof(Product), request.ProductId!);

        if (request.Quantity > productExist.Stock) throw new InvalidOperationException("Requested quantity exceeds available stock");

        var orderModel = new Order
        {
            OrderDate = DateTime.Now,
            UserId = user.Id,
            PaymentId = paymentExist.Id,
            DeliveryId = deliveryExist.Id,
            OrderStatus = 1,
            AddresId = addressExist.Id,
        };

        var order = await orderRepository.CreateOrder(orderModel);

        decimal totalAmount = productExist.Price * request.Quantity + paymentExist.PaymentCost + deliveryExist.Price;

        // Handle Free Shipping Voucher
        if (request.VoucherFreeShippingId != null)
        {
            var voucherFreeShipping = await voucherRepository.GetVoucherById(request.VoucherFreeShippingId);

            if (voucherFreeShipping == null || voucherFreeShipping.Type != VoucherType.FreeShipping || !voucherFreeShipping.IsActive ||
                (voucherFreeShipping.ExpiryDate.HasValue && voucherFreeShipping.ExpiryDate <= DateTime.Now))
            {
                throw new InvalidOperationException("Invalid free shipping voucher.");
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
                throw new InvalidOperationException("Invalid discount voucher.");
            }

            decimal discountAmount = 0;

            if (voucherDiscount.Type == VoucherType.Percentage)
            {
                discountAmount = totalAmount * (voucherDiscount.DiscountValue / 100) ?? 0;

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

        var orderDetailModel = new OrderDetail
        {
            OrderId = order.Id,
            ProductId = productExist.Id,
            Quantity = request.Quantity,
            Subtotal = productExist.Price * request.Quantity,
        };

        await orderDetailRepository.CreateOrderDetail(orderDetailModel);


    }
}



