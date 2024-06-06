using AutoMapper;
using GroginStore.Application.Users.DTOs;
using GroginStore.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;



namespace GroginStore.Application.Users.Queries.GetAllUsers;

public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, IEnumerable<UserDto>>
{
    private readonly ILogger<GetAllUsersQueryHandler> logger;
    private readonly IMapper mapper;
    private readonly UserManager<User> userManager;

    public GetAllUsersQueryHandler(ILogger<GetAllUsersQueryHandler> logger, IMapper mapper, UserManager<User> userManager)
    {
        this.logger = logger;
        this.mapper = mapper;
        this.userManager = userManager;
    }


    public async Task<IEnumerable<UserDto>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
    {
        logger.LogInformation("Getting all users");
        var users = await userManager.Users.ToListAsync();
        var result = users.Select(user => mapper.Map<UserDto>(user));
        return result;
    }
}
