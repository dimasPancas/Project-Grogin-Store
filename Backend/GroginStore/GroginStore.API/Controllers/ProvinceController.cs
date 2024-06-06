using GroginStore.API.Common;
using GroginStore.Application.Province.Query;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroginStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvinceController : ControllerBase
    {
        private readonly IMediator mediator;

        public ProvinceController(IMediator mediator)
        {
            this.mediator = mediator;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllProvinces()
        {
            var query = new GetAllProvinceQuery();
            var result = await mediator.Send(query);
            var response = new Response
            {
                Status = 200,
                Message = "Success Get All Provinces",
                Data = result
            };
            return Ok(response);
        }
    }
}
