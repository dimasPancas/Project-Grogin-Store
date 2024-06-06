using AutoMapper;
using GroginStore.Application.Comments.Command.CreateComment;
using GroginStore.Application.Comments.Command.UpdateComment;
using GroginStore.Domain.Entities;

namespace GroginStore.Application.Comments.DTOs
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<Comment, CommentListDto>().ForMember(c => c.UserName, opt => opt.MapFrom(c => c.User!.UserName))
                .ForMember(c => c.UserProfile, opt => opt.MapFrom(c => c.User!.UserProfile));

            CreateMap<CreateCommentCommand, Comment>();
            CreateMap<UpdateCommentCommand, Comment>();
        }
    }
}
