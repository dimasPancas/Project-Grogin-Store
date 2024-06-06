using GroginStore.API.Common;
using GroginStore.Application.Orders.Command.CreateOrderFromCartUser;
using GroginStore.Application.Orders.Command.CreateOrderFromProduct;
using GroginStore.Application.Orders.Command.UpdateOrderStatus;
using GroginStore.Application.Orders.Command.UpdatePaymentVerificationCode;
using GroginStore.Application.Orders.Queries.GetAllOrders;
using GroginStore.Application.Orders.Queries.GetAllOrdersByUserId;
using GroginStore.Application.Orders.Queries.GetDetailOrderById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GroginStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IMediator mediator;

        public OrderController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> GetALlOrdersByUserId([FromQuery] GetAllOrdersByUserIdQuery query)
        {
            var orders = await mediator.Send(query);
            var response = new Response
            {
                Status = 200,
                Message = "Success geting all orders by UserId",
                Data = orders
            };
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetailOrderById([FromRoute] string id)
        {
            var orderDetails = await mediator.Send(new GetDetailOrderByIdQuery(id));
            var response = new Response
            {
                Status = 200,
                Message = "Success geting details order by Id",
                Data = orderDetails
            };
            return Ok(response);
        }

        [HttpGet("admin")]
        public async Task<IActionResult> GetAllOrdersAdmin([FromQuery] GetAllOrdersQuery query)
        {
            var orders = await mediator.Send(query);
            var response = new Response
            {
                Status = 200,
                Message = "Success geting all orders",
                Data = orders
            };
            return Ok(response);
        }

        [HttpPost]
        //[Authorize(Roles = UserRoles.Customer)]
        public async Task<IActionResult> CreateOrderFromProduct([FromBody] CreateOrderFromProductCommand data,
            [FromQuery] string? voucherFreeShippingId, [FromQuery] string? voucherDiscountId)
        {
            data.VoucherFreeShippingId = voucherFreeShippingId;
            data.VoucherDiscountId = voucherDiscountId;

            await mediator.Send(data);
            return Ok();
        }


        [HttpPost("order-cart")]
        //[Authorize(Roles = UserRoles.Customer)]
        public async Task<IActionResult> CreateOrderFromProductCart([FromBody] CreateOrderFromCartUserCommand data,
            [FromQuery] string? voucherFreeShippingId, [FromQuery] string? voucherDiscountId)
        {
            data.VoucherDiscountId = voucherDiscountId;
            data.VoucherFreeShippingId = voucherFreeShippingId;
            await mediator.Send(data);
            return Ok();
        }


        [HttpPatch("{orderId}")]
        //[Authorize(Roles = UserRoles.Customer)]
        public async Task<IActionResult> UpdateOrderPaymentVerificationCode([FromRoute] string orderId, [FromBody] UpdatePaymentVerificationCodeCommand data)
        {
            data.OrderId = orderId;
            await mediator.Send(data);
            return Ok();
        }

        [HttpPatch("order-status/{orderId}")]
        public async Task<IActionResult> UpdateOrderStatusByOrderId([FromRoute] string orderId, [FromBody] UpdateOrderStatusCommand data)
        {
            data.orderId = orderId;
            await mediator.Send(data);
            return Ok();
        }
    }
}
