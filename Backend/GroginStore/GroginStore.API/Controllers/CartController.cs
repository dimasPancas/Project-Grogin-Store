using GroginStore.API.Common;
using GroginStore.Application.Carts.Command.CreateCart;
using GroginStore.Application.Carts.Command.DeleteCart;
using GroginStore.Application.Carts.Command.UpdateCart;
using GroginStore.Application.Carts.Queries.GetItemsCartByUserId;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GroginStore.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CartController : ControllerBase
{
    private readonly IMediator mediator;

    public CartController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetCartItemsByUserId()
    {
        var query = new GetItemsCartByUserIdQuery();
        var cartItems = await mediator.Send(query);
        var response = new Response
        {
            Status = 200,
            Message = "Success gettting Cart",
            Data = cartItems
        };
        return Ok(response);
    }


    [HttpPost]
    [Authorize]
    public async Task<IActionResult> AddToCart([FromBody] CreateCartCommand data)
    {
        var cart = await mediator.Send(data);
        var response = new Response
        {
            Status = 201,
            Message = "Success Adding to Cart",
            Data = cart
        };
        return Ok(response);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateQuantityCart([FromRoute] string id, [FromBody] UpdateCartCommand data)
    {
        data.Id = id;
        var cart = await mediator.Send(data);
        var response = new Response
        {
            Status = 200,
            Message = "Success updating to Cart",
            Data = cart
        };
        return Ok(response);
    }

    [HttpDelete("{id}")]
    //[Authorize]
    public async Task<IActionResult> DeleteCart([FromRoute] string id)
    {
        await mediator.Send(new DeleteCartCommand(id));
        return NoContent();
    }
}
