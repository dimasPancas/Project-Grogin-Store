using AutoMapper;
using FluentAssertions;
using GroginStore.Application.Categories.Commands.CreateCategory;
using GroginStore.Application.Categories.Commands.UpdateCategory;
using GroginStore.Domain.Entities;
using Xunit;

namespace GroginStore.Application.Categories.DTOs.Tests;

public class CategoryProfileTests
{
    private IMapper mapper;

    public CategoryProfileTests()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<CategoryProfile>();
        });

        mapper = configuration.CreateMapper();
    }


    [Fact()]
    public void CreateMap_ForCategoryToCategoryDto_MapsCorrectly()
    {
        //arrange
        var category = new Category()
        {
            Id = Guid.NewGuid(),
            Name = "Fruit",
            CreatedDate = DateTime.Now,
            UpdatedDate = null,
            CreatedBy = "user1"
        };

        //act
        var categoryDto = mapper.Map<CategoryDto>(category);

        //assert
        categoryDto.Should().NotBeNull();
        categoryDto.Id.Should().Be(category.Id);
        categoryDto.Name.Should().Be(category.Name);
    }

    [Fact()]
    public void CreateMap_ForCategoryToCategoryByIdDto_MapsCorrectly()
    {
        //arrange
        var user = new User()
        {
            Id = "1",
            UserName = "admin",
            NormalizedEmail = "ADMIN"
        };

        var category = new Category()
        {
            Id = Guid.NewGuid(),
            Name = "Fruit",
            CreatedDate = DateTime.Now,
            UpdatedDate = DateTime.Now.AddDays(2),
            UpdatedBy = user.Id,
            CreatedBy = user.Id,
            DeletedDate = null,
            IsActive = true,
            UserAdmin = user,
        };

        //act
        var categoryByIdDto = mapper.Map<CategoryByIdDto>(category);

        //assert
        categoryByIdDto.Should().NotBeNull();
        categoryByIdDto.Id.Should().Be(category.Id);
        categoryByIdDto.Name.Should().Be(category.Name);
        categoryByIdDto.CreatedDate.Should().Be(category.CreatedDate);
        categoryByIdDto.UpdatedDate.Should().Be(category.UpdatedDate);
        categoryByIdDto.IsActive.Should().Be(category.IsActive);
        categoryByIdDto.CreatedBy.Should().Be(user.UserName);
        categoryByIdDto.UpdatedBy.Should().Be(user.UserName);
    }


    [Fact()]
    public void CreateMap_ForCategoryToAdminCategoryDto_MapsCorrectly()
    {
        //arrange
        var category = new Category()
        {
            Id = Guid.NewGuid(),
            Name = "Fruit",
            CreatedDate = DateTime.Now,
            UpdatedDate = DateTime.Now.AddDays(2),
            IsActive = true,
        };

        //act
        var commandAdminDto = mapper.Map<AdminCategoryDto>(category);

        //assert
        commandAdminDto.Should().NotBeNull();
        commandAdminDto.Id.Should().Be(category.Id);
        commandAdminDto.Name.Should().Be(category.Name);
        commandAdminDto.UpdatedDate.Should().Be(category.UpdatedDate);
        commandAdminDto.IsActive.Should().Be(category.IsActive);
    }


    [Fact()]
    public void CreateMap_ForCreateCategoryCommandToCategory_MapsCorrectly()
    {
        //arrange
        var categoryCommand = new CreateCategoryCommand()
        {
            Name = "test"
        };

        //act
        var category = mapper.Map<Category>(categoryCommand);

        //assert
        category.Should().NotBeNull();
        category.Name.Should().Be(categoryCommand.Name);
    }

    [Fact()]
    public void CreateMap_ForUpdateCategoryCommandCommandToCategory_MapsCorrectly()
    {
        //arrange
        var command = new UpdateCategoryCommand()
        {
            Id = Guid.NewGuid().ToString(),
            Name = "update"
        };

        //act
        var category = mapper.Map<Category>(command);

        //assert
        category.Should().NotBeNull();
        category.Id.Should().Be(command.Id);
        category.Name.Should().Be(command.Name);

    }

}