using GroginStore.API.Common;
using GroginStore.Application.Wishlists.Command.AddWishlist;
using GroginStore.Application.Wishlists.Command.DeleteWishlist;
using GroginStore.Application.Wishlists.Queries.GetWishlistByUserId;
using GroginStore.Domain.Constant;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GroginStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly IMediator mediator;

        public WishlistController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> GetAllWishlistByUserId()
        {
            var query = new GetWishlistByUserIdQuery();
            var wishlistItems = await mediator.Send(query);
            var response = new Response
            {
                Status = 200,
                Message = "Success gettting Wishlist Items",
                Data = wishlistItems
            };
            return Ok(response);
        }


        [HttpPost]
        //[Authorize(Roles = UserRoles.Customer)]
        public async Task<IActionResult> AddToWishlist([FromBody] AddWishlistCommand data)
        {
            await mediator.Send(data);
            return Ok();
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles = UserRoles.Customer)]
        public async Task<IActionResult> DeleteWishlist([FromRoute] string id)
        {
            bool result = await mediator.Send(new DeleteWishlistCommand(id));
            if (result) return NoContent();
            return BadRequest();
        }
    }
}
