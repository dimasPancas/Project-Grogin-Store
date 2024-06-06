using FluentAssertions;
using GroginStore.Domain.Constant;
using Microsoft.AspNetCore.Http;
using Moq;
using System.Security.Claims;
using Xunit;

namespace GroginStore.Application.Users.Tests;

public class UserContextTests
{
    //TestMethod_Scenario_ExpectResult
    [Fact()]
    public void GetCurrentUser_WithAuthenticatedUser_ShouldReturnCurrentUser()
    {
        //arrange
        var httpContextAccessorMock = new Mock<IHttpContextAccessor>();
        var clains = new List<Claim>()
        {
            new (ClaimTypes.NameIdentifier, "1"),
            new (ClaimTypes.Email, "test@gmail.com"),
            new (ClaimTypes.Role, UserRoles.Admin),
            new (ClaimTypes.Role, UserRoles.Customer),
        };

        var user = new ClaimsPrincipal(new ClaimsIdentity(clains, "Test"));

        httpContextAccessorMock.Setup(x => x.HttpContext).Returns(new DefaultHttpContext()
        {
            User = user
        });

        var userContext = new UserContext(httpContextAccessorMock.Object);

        //act
        var currentUser = userContext.GetCurrentUser();

        //assert
        currentUser.Should().NotBeNull();
        currentUser.Id.Should().Be("1");
        currentUser.Email.Should().Be("test@gmail.com");
        currentUser.Roles.Should().ContainInOrder(UserRoles.Admin, UserRoles.Customer);
    }


    [Fact()]
    public void GetCurrentUser_WithUserContextNotPresent_ThrowsInvalidOperationException()
    {
        //arrange
        var httpContextAccessorMock = new Mock<IHttpContextAccessor>();
        httpContextAccessorMock.Setup(x => x.HttpContext).Returns((HttpContext)null);

        var userContext = new UserContext(httpContextAccessorMock.Object);

        //act
        Action action = () => userContext.GetCurrentUser();

        //assert
        action.Should().Throw<InvalidOperationException>().WithMessage("User context is not present");
    }
}