using GroginStore.API.Common;
using GroginStore.Application.Deliveries.Command.CreateDelivery;
using GroginStore.Application.Deliveries.Command.DeleteDelivery;
using GroginStore.Application.Deliveries.Command.RestoreDelivery;
using GroginStore.Application.Deliveries.Command.UpdateDelivery;
using GroginStore.Application.Deliveries.Queries.AdminGetAllDeliveries;
using GroginStore.Application.Deliveries.Queries.GetAllDeliveries;
using GroginStore.Application.Deliveries.Queries.GetDeliveryById;
using GroginStore.Domain.Constant;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.AccessControl;

namespace GroginStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        private readonly IMediator mediator;

        public DeliveryController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDeliveries()
        {
            var query = new GetAllDeliveriesQuery();
            var deliveries = await mediator.Send(query);
            var response = new Response()
            {
                Status = 200,
                Message = "Success Get All Deliveries",
                Data = deliveries
            };
            return Ok(response);
        }

        [HttpGet("admin")]
        public async Task<IActionResult> AdminGetAllDelivery([FromQuery] AdminGetAllDeliveriesQuery query)
        {
            var deliveries = await mediator.Send(query);
            var response = new Response
            {
                Status = 200,
                Message = "Admin Success geting all categories",
                Data = deliveries,
            };
            return Ok(response);

        }



        [HttpGet("admin/{id}")]
        public async Task<IActionResult> GetDeliveryById([FromRoute] Guid id)
        {
            var delivery = await mediator.Send(new GetDeliveryByIdQuery(id.ToString()));
            var response = new Response()
            {
                Status = 200,
                Message = $"Success Get Delivery with Id: {id}",
                Data = delivery
            };
            return Ok(response);
        }

        [HttpPost("admin")]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> CreateDelivery([FromBody] CreateDeliveryCommand data)
        {
            var delivery = await mediator.Send(data);
            var response = new Response()
            {
                Status = 200,
                Message = "Success Created New Delivery",
                Data = delivery
            };
            return Ok(response);
        }

        [HttpPatch("admin/{id}")]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> UpdateDelivery([FromRoute] Guid id, [FromBody] UpdateDeliveryCommand data)
        {
            data.Id = id;
            var delivery = await mediator.Send(data);
            var response = new Response()
            {
                Status = 201,
                Message = "Success Updated Delivery",
                Data = delivery
            };
            return Ok(response);
        }

        [HttpPatch("admin/restore/{id}")]
        public async Task<IActionResult> RestoreDeliveryById([FromRoute] string id)
        {
            await mediator.Send(new RestoreDeliveryCommand(id));
            return NoContent();
        }

        [HttpDelete("admin/{id}")]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> DeleteDelivery([FromRoute] Guid id)
        {
            await mediator.Send(new DeleteDeliveryCommand(id.ToString()));
            return NoContent();
        }

    }
}
