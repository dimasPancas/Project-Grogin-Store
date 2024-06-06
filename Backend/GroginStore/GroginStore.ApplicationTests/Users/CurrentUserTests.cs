using FluentAssertions;
using GroginStore.Domain.Constant;
using Xunit;

namespace GroginStore.Application.Users.Tests;

public class CurrentUserTests
{
    //TestMethod_Scenario_ExpectResult
    [Theory()]
    [InlineData(UserRoles.Admin)]
    [InlineData(UserRoles.Customer)]
    public void IsInRole_WithMachingRole_ShouldReturnTrue(string roleName)
    {
        //arrange
        var user = new CurrentUser("1", "test@gmail.com", [UserRoles.Admin, UserRoles.Customer]);

        //act
        var isInRole = user.IsInRole(roleName);

        //assert
        isInRole.Should().BeTrue();
    }


    [Fact()]
    public void IsInRole_WithNoMachingRole_ShouldReturFalse()
    {
        //arrange
        var user = new CurrentUser("1", "test@gmail.com", [UserRoles.Admin, UserRoles.Customer]);

        //act
        var isInRole = user.IsInRole("Other");

        //assert
        isInRole.Should().BeFalse();
    }


    [Fact()]
    public void IsInRole_WithNoMachingRoleCase_ShouldReturFalse()
    {
        //arrange
        var user = new CurrentUser("1", "test@gmail.com", [UserRoles.Admin, UserRoles.Customer]);

        //act
        var isInRole = user.IsInRole(UserRoles.Admin.ToLower());

        //assert
        isInRole.Should().BeFalse();
    }

}