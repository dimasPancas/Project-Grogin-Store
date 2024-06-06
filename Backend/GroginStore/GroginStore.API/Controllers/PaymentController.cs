using GroginStore.API.Common;
using GroginStore.Application.Payments.Commands.CreatePayment;
using GroginStore.Application.Payments.Commands.DeletePayment;
using GroginStore.Application.Payments.Commands.RestorePayment;
using GroginStore.Application.Payments.Commands.UpdatePayment;
using GroginStore.Application.Payments.Queries.AdminGetAllPayments;
using GroginStore.Application.Payments.Queries.GetAllPayments;
using GroginStore.Application.Payments.Queries.GetPaymentById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GroginStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IMediator mediator;

        public PaymentController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> GetAllPayments()
        {
            var query = new GetAllPaymentsQuery();
            var payments = await mediator.Send(query);
            var response = new Response()
            {
                Status = 200,
                Message = $"Success Get All Payments",
                Data = payments
            };
            return Ok(response);
        }

        [HttpGet("admin")]
        [Authorize]
        public async Task<IActionResult> AdminGetAllPayments([FromQuery] AdminGetAllPaymentsQuery query)
        {
            var payments = await mediator.Send(query);
            var response = new Response()
            {
                Status = 200,
                Message = $"Success Get All Payments",
                Data = payments
            };
            return Ok(response);
        }
        

        [HttpGet("admin/{id}")]
        [Authorize]
        public async Task<IActionResult> GetPaymentById([FromRoute] Guid id)
        {
            var payment = await mediator.Send(new GetPaymentByIdQuery(id.ToString()));
            var response = new Response()
            {
                Status = 200,
                Message = $"Success Get All Payments",
                Data = payment
            };
            return Ok(response);
        }

        [HttpPost("admin")]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> CreatePayment([FromBody] CreatePaymentCommand data)
        {
            var payment = await mediator.Send(data);
            var response = new Response()
            {
                Status = 201,
                Message = "Success Created New Payment",
                Data = payment
            };
            return Ok(response);
        }

        [HttpPatch("admin/{id}")]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> UpdatePayment([FromRoute] string id, [FromBody] UpdatePaymentCommand data)
        {
            data.Id = id;
            var payment = await mediator.Send(data);
            var response = new Response()
            {
                Status = 200,
                Message = $"Success Updating Payment With Id: {id}",
                Data = payment
            };
            return Ok(response);
        }


        [HttpPatch("admin/restore/{id}")]
        public async Task<IActionResult> RestorePaymentDeleted([FromRoute] string id)
        {
            await mediator.Send(new RestorePaymentCommand(id));
            return NoContent();

        }

        [HttpDelete("admin/{id}")]
        //[Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> DeletePayment([FromRoute] Guid id)
        {
            await mediator.Send(new DeletePaymentCommand(id.ToString()));
            return NoContent();
        }

    }
}
