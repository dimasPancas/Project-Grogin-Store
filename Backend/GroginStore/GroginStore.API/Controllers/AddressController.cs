using GroginStore.API.Common;
using GroginStore.Application.Address.Commands.CreateAddress;
using GroginStore.Application.Address.Commands.DeleteAddress;
using GroginStore.Application.Address.Commands.UpdateAddress;
using GroginStore.Application.Address.Queries.GetAddressById;
using GroginStore.Application.Address.Queries.GetAllAddressByUserId;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GroginStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IMediator mediator;
        public AddressController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> GetAddressByUserId()
        {
            var addresses = await mediator.Send(new GetAddressByUserIdQuery());
            var response = new Response()
            {
                Status = 200,
                Message = "Success Getting Address for user",
                Data = addresses
            };
            return Ok(response);
        }

        [HttpGet("{id}")]
        //[Authorize]
        public async Task<IActionResult> GetAddresById([FromRoute] string id)
        {
            var address = await mediator.Send(new GetAddressByIdQuery(id));
            var response = new Response()
            {
                Status = 200,
                Message = $"Success Getting Address for Id: {id}",
                Data = address
            };
            return Ok(response);
        }

        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> CreateAddress([FromBody] CreateAddressComand data)
        {
            var address = await mediator.Send(data);
            var response = new Response()
            {
                Status = 201,
                Message = $"Success Create New Address",
                Data = address
            };
            return Ok(response);
        }

        [HttpPatch("{id}")]
        //[Authorize]
        public async Task<IActionResult> UpdateAddress([FromRoute] string id, [FromBody] UpdateAddressCommand data)
        {
            data.Id = id;
            var address = await mediator.Send(data);
            var response = new Response()
            {
                Status = 201,
                Message = $"Success Updating Address with Id: {id}",
                Data = address
            };
            return Ok(response);
        }

        [HttpDelete("{id}")]
        //[Authorize]
        public async Task<IActionResult> DeleteAddress([FromRoute] string id)
        {
            await mediator.Send(new DeleteAddressCommand(id.ToString()));
            return NoContent();
        }

    }
}
