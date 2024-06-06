using GroginStore.API.Common;
using GroginStore.Application.Products.Commands.CreateProduct;
using GroginStore.Application.Products.Commands.DeleteProduct;
using GroginStore.Application.Products.Commands.RestoreProduct;
using GroginStore.Application.Products.Commands.UpdateProduct;
using GroginStore.Application.Products.Queries.AdminGetAllProduct;
using GroginStore.Application.Products.Queries.AdminGetDetailProductById;
using GroginStore.Application.Products.Queries.GetAllProducts;
using GroginStore.Application.Products.Queries.GetProductById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GroginStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator mediator;

        public ProductController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] GetAllProductsQuery query)
        {
            var products = await mediator.Send(query);
            var response = new Response()
            {
                Status = 200,
                Message = "Admin Success Get All Products",
                Data = products
            };
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetailProductById([FromRoute] string id)
        {
            var product = await mediator.Send(new GetProductByIdQuery(id));
            var response = new Response()
            {
                Status = 200,
                Message = $"Success Get Detail Product By Id: {id}",
                Data = product
            };
            return Ok(response);
        }



        [HttpGet("admin")]
        public async Task<IActionResult> AdminGetAllProducts([FromQuery] AdminGetAllProductQuery query)
        {
            var products = await mediator.Send(query);
            var response = new Response()
            {
                Status = 200,
                Message = "Admin Success Get All Products",
                Data = products
            };
            return Ok(response);
        }

        [HttpGet("admin/{id}")]
        public async Task<IActionResult> AdminGetDetailProductById([FromRoute] string id)
        {
            var product = await mediator.Send(new AdminGetDetailProductByIdQuery(id));
            var response = new Response()
            {
                Status = 200,
                Message = $"Success Get Detail Product By Id: {id}",
                Data = product
            };
            return Ok(response);
        }

        [HttpPost("admin")]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> CreateProduct([FromForm] CreateProductCommand data)
        {
            
            //string imgPath = await fileService.SaveFileAsync(data.ImageFile, allowedFileExtension);

            //data.ProductImage = imgPath;
            var product = await mediator.Send(data);
            var response = new Response()
            {
                Status = 201,
                Message = "Success Created New Product",
                Data = product
            };

            return Ok(response);
        }

        [HttpPatch("admin/{id}")]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> UpdateProduct([FromRoute] string id, [FromForm] UpdateProductCommand data)
        {
            //string imgPath = await fileService.SaveFileAsync(data.ImageFile, allowedFileExtension);

            data.Id = id;
            //data.ProductImage = imgPath;
            var product = await mediator.Send(data);
            var response = new Response()
            {
                Status = 200,
                Message = $"Success Updating Product With Id: {id}",
                Data = product
            };
            return Ok(response);
        }

        [HttpDelete("admin/{id}")]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> DeleteProduct([FromRoute] string id)
        {
            await mediator.Send(new DeleteProductCommand(id));
            return NoContent();
        }

        [HttpPatch("admin/restore/{id}")]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> RestoreProductById([FromRoute] string id)
        {
            await mediator.Send(new RestoreProductCommand(id));
            return NoContent();
        }
    }
}
