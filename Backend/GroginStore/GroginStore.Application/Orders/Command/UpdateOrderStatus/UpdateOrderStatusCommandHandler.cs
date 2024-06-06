using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Orders.Command.UpdateOrderStatus;

public class UpdateOrderStatusCommandHandler : IRequestHandler<UpdateOrderStatusCommand>
{
    private readonly IOrderRepository orderRepository;
    private readonly IOrderDetailRepository orderDetailRepository;
    private readonly ILogger<UpdateOrderStatusCommandHandler> logger;
    private readonly IProductsRepository productsRepository;

    public UpdateOrderStatusCommandHandler(IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository,
        ILogger<UpdateOrderStatusCommandHandler> logger, IProductsRepository productsRepository
        )
    {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.logger = logger;
        this.productsRepository = productsRepository;
    }


    public async Task Handle(UpdateOrderStatusCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"Updating order status with orderId: {request.orderId}");
        var order = await orderRepository.GetOrderByOrderId(request.orderId!);
        if(order == null ) throw new NotFoundException(nameof(Order), request.orderId!);
        order.OrderStatus = request.OrderStatus;

        if (order.OrderStatus == 5 && order.PaymentVerified)
        {
            var orderDetailItems = await orderDetailRepository.GetAllOrderDetailByOrderId(request.orderId!);
            foreach (var item in orderDetailItems)
            {
                var product = await productsRepository.GetDetailProduct(item.ProductId.ToString());
                if (product == null) throw new NotFoundException(nameof(Product), item.ProductId.ToString());
                product.Stock += item.Quantity;
            }
        }

        await productsRepository.SaveChanges();

    }
}
