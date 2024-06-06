using GroginStore.API.Common;
using GroginStore.Application.Comments.Command.CreateComment;
using GroginStore.Application.Comments.Command.DeleteComment;
using GroginStore.Application.Comments.Command.UpdateComment;
using GroginStore.Application.Comments.Queries.GetAllCommentByProductId;
using GroginStore.Application.Comments.Queries.GetCommentById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GroginStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IMediator mediator;

        public CommentController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("/product/{productId}")]
        public async Task<IActionResult> GetAllCommentWithProductId([FromRoute] string productId)
        {
            var comments = await mediator.Send(new GetAllCommentByProductIdQuery(productId));
            var response = new Response
            {
                Status = 200,
                Message = $"Success Getting Comment With ProductId: {productId}",
                Data = comments
            };
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCommentById([FromRoute] string id)
        {
            var comment = await mediator.Send(new GetCommentByIdQuery(id));
            var response = new Response
            {
                Status = 200,
                Message = $"Success Getting Comment With id: {id}",
                Data = comment
            };
            return Ok(response);
        }

        [HttpPost("{orderDetailId}")]
        //[Authorize(Roles = UserRoles.Customer)]
        public async Task<IActionResult> CreateComment([FromRoute] string orderDetailId, [FromForm] CreateCommentCommand data)
        {
            data.OrderDetailId = orderDetailId;
            var comment = await mediator.Send(data);
            var response = new Response
            {
                Status = 201,
                Message = "Success Create New Comment",
                Data = comment
            };
            return Ok(response);
        }

        [HttpPut("{id}")]
        //[Authorize(Roles = UserRoles.Customer)]
        public async Task<IActionResult> UpdateComment([FromRoute] string id, [FromForm] UpdateCommentCommand data)
        {
            data.Id = id;
            var comment = await mediator.Send(data);
            var response = new Response
            {
                Status = 200,
                Message = $"Success Updating Comment with id: {id}",
                Data = comment
            };
            return Ok(response);
        }


        [HttpDelete("{id}")]
        //[Authorize(Roles = UserRoles.Customer)]
        public async Task<IActionResult> DeleteComment([FromRoute] string id)
        {
            await mediator.Send(new DeleteCommentCommand(id));
            return NoContent();
        }
    }
}
