using GroginStore.API.Common;
using GroginStore.Application.Users.Commands.DeleteAccountUser;
using GroginStore.Application.Users.Commands.Login;
using GroginStore.Application.Users.Commands.Register;
using GroginStore.Application.Users.Commands.UpdateDataUser;
using GroginStore.Application.Users.Queries.GetAllUsers;
using GroginStore.Application.Users.Queries.GetDetailUser;
using GroginStore.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GroginStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator mediator;

        public UserController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GettAllUsers()
        {
            var query = new GetAllUsersQuery();
            var users = await mediator.Send(query);
            var response = new Response
            {
                Status = 200,
                Message = "Success getting all users",
                Data = users
            };

            return Ok(response);
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetDetailUserProfile()
        {
            var query = new GetDetailUserQuery();
            var user = await mediator.Send(query);
            var response = new Response
            {
                Status = 200,
                Message = "Success getting detail user",
                Data = user
            };

            return Ok(response);
        }


        [HttpPost("register")]
        public async Task<IActionResult> UserRegister([FromBody] RegisterUserCommand data)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await mediator.Send(data);
            if (result == null) return BadRequest(ModelState);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> UserLogin([FromBody] LoginUserCommand data)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await mediator.Send(data);
            if (result == null) return Unauthorized("Invalid UserName or Password");
            return Ok(result);
        }

        [HttpPatch]
        [Authorize]
        public async Task<IActionResult> UpdateDataUser([FromForm] UpdateDataUserCommand data)
        {
            await mediator.Send(data);
            return NoContent();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteUserAccount()
        {
            var query = new DeleteAccountUserCommand();
            await mediator.Send(query);
            return NoContent();
        }
    }
}
