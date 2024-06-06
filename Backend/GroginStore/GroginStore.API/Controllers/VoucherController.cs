using GroginStore.API.Common;
using GroginStore.Application.Vouchers.Command.CreateVoucher;
using GroginStore.Application.Vouchers.Command.DeleteVoucher;
using GroginStore.Application.Vouchers.Command.UpdateVoucher;
using GroginStore.Application.Vouchers.Command.UserClaimVoucher;
using GroginStore.Application.Vouchers.Queries.AdminGetAllVouchers;
using GroginStore.Application.Vouchers.Queries.AdminGetDetailVoucherById;
using GroginStore.Application.Vouchers.Queries.CustGetAllVouchers;
using GroginStore.Application.Vouchers.Queries.CustGetDetailVoucherById;
using GroginStore.Application.Vouchers.Queries.CustGetVouchersAvailable;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroginStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
        private readonly IMediator mediator;

        public VoucherController(IMediator mediator)
        {
            this.mediator = mediator;
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> CustomerGetAllVouchers()
        {
            var query = new CustGetAllVouchersQuery();
            var data = await mediator.Send(query);
            var response = new Response
            {
                Status = 200,
                Message = "Success getting all vouchers for customer",
                Data = data
            };
            return Ok(response);
        }

        [HttpGet("available")]
        [Authorize]
        public async Task<IActionResult> CustomerGetAvailableVouchers()
        {
            var query = new CustGetVouchersAvailableQuery();
            var data = await mediator.Send(query);
            var response = new Response
            {
                Status = 200,
                Message = "Success getting all vouchers for customer",
                Data = data
            };
            return Ok(response);
        }


        [HttpGet("{voucherId}")]
        public async Task<IActionResult> CustGetDetailVoucherById([FromRoute] string voucherId)
        {
            var query = new CustGetDetailVoucherByIdQuery(voucherId);
            var voucher = await mediator.Send(query);
            var response = new Response
            {
                Status = 200,
                Message = "Success get all vouchers",
                Data = voucher
            };
            return Ok(response);
        }

        [HttpPost("claim/{voucherId}")]
        [Authorize]
        public async Task<IActionResult> CustClaimVoucherById([FromRoute] string voucherId)
        {
            var query = new UserClaimVoucherCommand(voucherId);
            await mediator.Send(query);
            return Ok("Success claim voucher");
        }


        [HttpGet("admin")]
        public async Task<IActionResult> AdminGetAllVouchers([FromQuery] AdminGetAllVouchersQuery query)
        {
            var vouchers = await mediator.Send(query);
            var response = new Response
            {
                Status = 200,
                Message = "Success get all vouchers",
                Data = vouchers
            };
            return Ok(response);
        }

        [HttpGet("admin/{voucherId}")]
        public async Task<IActionResult> AdminGetDetailVoucherById([FromRoute] string voucherId)
        {
            var query = new AdminGetDetailVoucherByIdQuery(voucherId);
            var voucher = await mediator.Send(query);
            var response = new Response
            {
                Status = 200,
                Message = "Success get all vouchers",
                Data = voucher
            };
            return Ok(response);
        }



        [HttpPost("admin")]
        public async Task<IActionResult> CreateNewVoucher([FromBody] CreateVoucerCommand data)
        {
            await mediator.Send(data);
            var response = new Response
            {
                Status = 201,
                Message = "Success Created new voucher",
                Data = null
            };
            return Ok(response);
        }

        [HttpPatch("admin/{voucherId}")]
        public async Task<IActionResult> UpdateVoucher([FromRoute] string voucherId, [FromBody] UpdateVoucherCommand data)
        {
            data.VoucherId = voucherId;
            await mediator.Send(data);
            return Ok("Success updating voucher");
        }

        [HttpDelete("admin/{voucherId}")]
        public async Task<IActionResult> DeleteVoucher([FromRoute] string voucherId)
        {
            await mediator.Send(new DeleteVoucherCommand(voucherId));
            return NoContent();
        }
    }
}
