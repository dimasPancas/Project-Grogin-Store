using AutoMapper;
using GroginStore.Application.Users.DTOs;
using GroginStore.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Users.Queries.GetDetailUser;

public class GetDetailUserQueryHandler : IRequestHandler<GetDetailUserQuery, GetDetailUserDto?>
{
    private readonly IMapper mapper;
    private readonly IUserContext userContext;
    private readonly ILogger<GetDetailUserQueryHandler> logger;
    private readonly UserManager<User> userManager;

    public GetDetailUserQueryHandler(IMapper mapper, IUserContext userContext, ILogger<GetDetailUserQueryHandler> logger,
        UserManager<User> userManager
        )
    {
        this.mapper = mapper;
        this.userContext = userContext;
        this.logger = logger;
        this.userManager = userManager;
    }


    public async Task<GetDetailUserDto?> Handle(GetDetailUserQuery request, CancellationToken cancellationToken)
    {
        var currentUser = userContext.GetCurrentUser();
        logger.LogInformation($"Get Detail user with userId : {currentUser?.Id}");

        var user = await userManager.FindByIdAsync(currentUser!.Id);
        if (user == null) return null;

        var result = mapper.Map<GetDetailUserDto>(user);
        return result;
    }

}
