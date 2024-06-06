using AutoMapper;
using FluentAssertions;
using GroginStore.Application.Categories.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace GroginStore.Application.Categories.Commands.CreateCategory.Tests;

public class CreateCategoryCommandHandlerTests
{
    [Fact()]
    public async Task Handle_ForValidCommand_ReturnsCategoryDto()
    {
        //arrange
        var loggerMock = new Mock<ILogger<CreateCategoryCommandHandler>>();
        var mapperMock = new Mock<IMapper>();
        var userContextMock = new Mock<IUserContext>();
        var categoryRepositoryMock = new Mock<ICategoryRepository>();

        var command = new CreateCategoryCommand();
        var category = new Category();

        mapperMock.Setup(m => m.Map<Category>(command)).Returns(category);
        mapperMock.Setup(m => m.Map<CategoryDto>(It.IsAny<Category>())).Returns((Category src) => new CategoryDto
        {
            Id = src.Id,
            Name = src.Name,
        });

        categoryRepositoryMock.Setup(repo => repo.CreateCategory(It.IsAny<Category>())).ReturnsAsync(category);

        var currentUser = new CurrentUser("admin-id", "admin@gmail.com", [] );
        userContextMock.Setup(u => u.GetCurrentUser()).Returns(currentUser);

        var categoryHandler = new CreateCategoryCommandHandler(mapperMock.Object, loggerMock.Object,
            categoryRepositoryMock.Object, userContextMock.Object);

        //act
        var result = await categoryHandler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeEquivalentTo(new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
        });
        category.CreatedBy.Should().Be(currentUser.Id);
        categoryRepositoryMock.Verify(c => c.CreateCategory(It.IsAny<Category>()), Times.Once());
    }
}