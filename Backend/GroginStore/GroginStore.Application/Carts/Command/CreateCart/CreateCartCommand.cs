using GroginStore.Application.Carts.DTOs;
using MediatR;

namespace GroginStore.Application.Carts.Command.CreateCart;

public class CreateCartCommand : IRequest<CartDto?>
{
    public string? ProductId { get; set; }
    public int Quantity { get; set; }
}
