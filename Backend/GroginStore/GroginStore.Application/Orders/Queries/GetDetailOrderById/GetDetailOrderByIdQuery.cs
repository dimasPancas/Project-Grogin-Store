using GroginStore.Application.Orders.DTOs;
using MediatR;

namespace GroginStore.Application.Orders.Queries.GetDetailOrderById
{
    public class GetDetailOrderByIdQuery : IRequest<List<OrderDetailDto>>
    {
        public GetDetailOrderByIdQuery(string id)
        {
            Id = id;
        }

        public string Id { get; }
    }

}
