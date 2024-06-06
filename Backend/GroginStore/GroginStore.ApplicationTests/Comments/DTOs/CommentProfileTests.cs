using AutoMapper;
using FluentAssertions;
using GroginStore.Application.Comments.Command.CreateComment;
using GroginStore.Application.Comments.Command.UpdateComment;
using GroginStore.Domain.Entities;
using Xunit;

namespace GroginStore.Application.Comments.DTOs.Tests;

public class CommentProfileTests
{
    private IMapper mapper;
    public CommentProfileTests()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<CommentProfile>();
        });
        mapper = configuration.CreateMapper();
    }

    [Fact()]
    public void CreateMap_ForCommentToCommentListDto_MapsCorrectly()
    {
        //arrange
        var user = new User()
        {
            Id = Guid.NewGuid().ToString(),
            UserName = "Test",
            UserProfile = "profile"
        };
        var product = new Product()
        {
            Id = Guid.NewGuid(),
            Name = "tes"
        };

        var comment = new Comment()
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            ProductId = product.Id,
            CommentDate = DateTime.Now,
            CommentText = "Test",
            CommentImg = "image",
            Rating = 1,
            Product = product,
            User = user,
        };


        //act
        var commentListDto = mapper.Map<CommentListDto>(comment);

        //assert
        commentListDto.Should().NotBeNull();
        commentListDto.CommentText.Should().Be(comment.CommentText);
        commentListDto.CommentImg.Should().Be(comment.CommentImg);
        commentListDto.CommentDate.Should().Be(comment.CommentDate);
        commentListDto.Rating.Should().Be(comment.Rating);
        commentListDto.UserName.Should().Be(user.UserName);
        commentListDto.UserProfile.Should().Be(user.UserProfile);
    }


    [Fact()]
    public void CreateMap_ForCreateCommentCommandToComment_MapsCorrectly()
    {
        //arrange
        var product = new Product()
        {
            Id = Guid.NewGuid(),
            Name = "test"
        };

        var command = new CreateCommentCommand()
        {
            ProductId = product.Id.ToString(),
            CommentText = "test",
            OrderDetailId = Guid.NewGuid().ToString(),
            Rating = 1,
        };

        //act
        var comment = mapper.Map<Comment>(command);

        //assert
        comment.Should().NotBeNull();
        comment.CommentText.Should().Be(command.CommentText);
        comment.ProductId.Should().Be(product.Id);
        comment.OrderDetailId.Should().Be(command.OrderDetailId);
        comment.Rating.Should().Be(command.Rating);
    }

    [Fact()]
    public void CreateMap_ForUpdateCommentCommandToComment_MapsCorrectly()
    {
        //arrange
        var command = new UpdateCommentCommand()
        {
            Id = Guid.NewGuid().ToString(),
            CommentText = "test",
            Rating = 1,
        };

        //act
        var comment = mapper.Map<Comment>(command);

        //assert
        comment.Should().NotBeNull();
        comment.Id.Should().Be(command.Id);
        comment.CommentText.Should().Be(command.CommentText);
        comment.Rating.Should().Be(command.Rating);
    }
}