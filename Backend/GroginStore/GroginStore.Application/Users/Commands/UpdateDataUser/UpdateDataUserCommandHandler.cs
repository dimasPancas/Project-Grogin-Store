using GroginStore.Application.Common;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Users.Commands.UpdateDataUser;

public class UpdateDataUserCommandHandler : IRequestHandler<UpdateDataUserCommand>
{
    private readonly UserManager<User> userManager;
    private readonly IUserContext userContext;
    private readonly ILogger<UpdateDataUserCommandHandler> logger;
    private readonly IFileService fileService;

    public UpdateDataUserCommandHandler(UserManager<User> userManager, IUserContext userContext, ILogger<UpdateDataUserCommandHandler> logger,
        IFileService fileService)
    {
        this.userManager = userManager;
        this.userContext = userContext;
        this.logger = logger;
        this.fileService = fileService;
    }


    public async Task Handle(UpdateDataUserCommand request, CancellationToken cancellationToken)
    {
        var currentUser = userContext.GetCurrentUser();
        logger.LogInformation($"Updating data user with userId: {currentUser?.Id}");
        string[] allowedFileExtension = [".jpg", ".jpeg", ".png"];

        var user = await userManager.FindByIdAsync(currentUser!.Id);
        if (user == null) throw new NotFoundException(nameof(User), currentUser.Id);

        if (user.UserProfile != null) fileService.DeleteFile(user.UserProfile);

        string imgPath = await fileService.SaveFileAsync(request.ProfilePicture, allowedFileExtension);

        user.UserProfile = imgPath;
        user.UserName = request.UserName;
        user.PhoneNumber = request.PhoneNumber;
        user.Email = request.Email;

        await userManager.UpdateNormalizedEmailAsync(user);
        await userManager.UpdateNormalizedUserNameAsync(user);
        await userManager.UpdateAsync(user);
    }

}
