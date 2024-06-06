using GroginStore.Application.Comments.DTOs;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;

namespace GroginStore.Application.Comments.Queries.GetCommentByOrderId;

public class GetCommentOrderIdQueryHandler : IRequestHandler<GetCommentOrderIdQuery, CommentListDto>
{
    private readonly IOrderRepository orderRepository;
    private readonly ICommentRepository commentRepository;
    private readonly IOrderDetailRepository orderDetailRepository;

    public GetCommentOrderIdQueryHandler(IOrderRepository orderRepository, ICommentRepository commentRepository,
        IOrderDetailRepository orderDetailRepository)
    {
        this.orderRepository = orderRepository;
        this.commentRepository = commentRepository;
        this.orderDetailRepository = orderDetailRepository;
    }

    public Task<CommentListDto> Handle(GetCommentOrderIdQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    //public async Task<CommentListDto> Handle(GetCommentOrderIdQuery request, CancellationToken cancellationToken)
    //{
    //var orderDetails = await orderDetailRepository.GetAllOrderDetailByOrderId(request.OrderId);
    //if(!orderDetails.Any()) throw new NotFoundException(nameof(Order), request.OrderId);
    //return
    //}
}
