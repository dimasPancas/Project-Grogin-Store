 using GroginStore.API.Common;
using GroginStore.Application.Categories.Commands.CreateCategory;
using GroginStore.Application.Categories.Commands.DeleteCategory;
using GroginStore.Application.Categories.Commands.RestoreCategory;
using GroginStore.Application.Categories.Commands.UpdateCategory;
using GroginStore.Application.Categories.Queries.AdminGetAllCategories;
using GroginStore.Application.Categories.Queries.GetAllCategories;
using GroginStore.Application.Categories.Queries.GetCategoryById;
using GroginStore.Domain.Constant;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GroginStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMediator mediator;

        public CategoryController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var query = new GetAllCategoriesQuery();
            var categories = await mediator.Send(query);
            var response = new Response()
            {
                Status = 200,
                Message = $"Success Get All Categories",
                Data = categories
            };
            return Ok(response);
        }

        [HttpGet("admin/{id}")]
        public async Task<IActionResult> GetCategoryById([FromRoute] string id)
        {
            var category = await mediator.Send(new GetCategoryByIdQuery(id));
            var response = new Response()
            {
                Status = 200,
                Message = $"Success Get Detail Category By Id: {id}",
                Data = category
            };
            return Ok(response);
        }

        [HttpGet("admin")]
        public async Task<IActionResult> AdminGetAllCategories([FromQuery] AdminGetAllCategoriesQuery query)
        {
            var categories = await mediator.Send(query);
            var response = new Response
            {
                Status = 200,
                Message = "Admin Success geting all categories",
                Data = categories,
            };
            return Ok(response);
        }

        [HttpPost("admin")]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryCommand data)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var category = await mediator.Send(data);
            var response = new Response()
            {
                Status = 200,
                Message = $"Success Create New Category",
                Data = category
            };
            return Ok(response);
        }

        [HttpPatch("admin/{id}")]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> UpdateCategory([FromRoute] string id, [FromBody] UpdateCategoryCommand data)
        {
            data.Id = id;
            var category = await mediator.Send(data);
            var response = new Response()
            {
                Status = 200,
                Message = $"Success Updating Category with Id: {id}",
                Data = category
            };
            return Ok(response);
        }

        [HttpPatch("admin/restore/{id}")]
        public async Task<IActionResult> RestoreCategoryById([FromRoute] string id)
        {
            await mediator.Send(new RestoreCategoryCommand(id));
            return NoContent();
        }

        [HttpDelete("admin/{id}")]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> DeleteCategory([FromRoute] string id)
        {
            await mediator.Send(new DeleteCategoryCommand(id));
            return NoContent();
        }
    }
}
