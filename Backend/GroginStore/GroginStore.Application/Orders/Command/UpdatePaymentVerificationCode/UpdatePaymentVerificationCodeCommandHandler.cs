using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Orders.Command.UpdatePaymentVerificationCode
{
    public class UpdatePaymentVerificationCodeCommandHandler : IRequestHandler<UpdatePaymentVerificationCodeCommand>
    {
        private readonly ILogger<UpdatePaymentVerificationCodeCommandHandler> logger;
        private readonly IOrderRepository orderRepository;
        private readonly IProductsRepository productsRepository;
        private readonly IOrderDetailRepository orderDetailRepository;

        public UpdatePaymentVerificationCodeCommandHandler(ILogger<UpdatePaymentVerificationCodeCommandHandler> logger,
            IOrderRepository orderRepository, IProductsRepository productsRepository, IOrderDetailRepository orderDetailRepository
            )
        {
            this.logger = logger;
            this.orderRepository = orderRepository;
            this.productsRepository = productsRepository;
            this.orderDetailRepository = orderDetailRepository;
        }

        public async Task Handle(UpdatePaymentVerificationCodeCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Updating order payment verification code");
            var order = await orderRepository.GetOrderByOrderId(request.OrderId!);
            if (order == null) throw new NotFoundException(nameof(Order), request.OrderId!);

            order.PaymentVerificationCode = request.PaymentCode;
            order.PaymentVerified = true;
            order.OrderStatus = 2;

            var orderDetailsItems = await orderDetailRepository.GetAllOrderDetailByOrderId(request.OrderId!);

            foreach (var item in orderDetailsItems)
            {
                var product = await productsRepository.GetDetailProduct(item.ProductId.ToString());
                if (product == null) throw new NotFoundException(nameof(Product), item.ProductId.ToString());
                product.Stock -= item.Quantity;
            }

            await orderRepository.SaveChanges();

        }
    }
}
