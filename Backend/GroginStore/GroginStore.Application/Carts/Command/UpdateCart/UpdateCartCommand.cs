using GroginStore.Application.Carts.DTOs;
using MediatR;

namespace GroginStore.Application.Carts.Command.UpdateCart;

public class UpdateCartCommand : IRequest<CartDto>
{
    public string Id { get; set; } = default!;
    public int Quantity { get; set; }
}
