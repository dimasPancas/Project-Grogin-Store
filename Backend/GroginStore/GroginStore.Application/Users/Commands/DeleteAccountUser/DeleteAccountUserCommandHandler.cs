using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Users.Commands.DeleteAccountUser;

public class DeleteAccountUserCommandHandler : IRequestHandler<DeleteAccountUserCommand>
{
    private readonly IUserContext userContext;
    private readonly UserManager<User> userManager;
    private readonly ILogger<DeleteAccountUserCommandHandler> logger;
    private readonly ICommentRepository commentRepository;
    private readonly IWishlistRepository wishlistRepository;
    private readonly ICartRepository cartRepository;

    public DeleteAccountUserCommandHandler(IUserContext userContext, UserManager<User> userManager, ILogger<DeleteAccountUserCommandHandler> logger,
        ICommentRepository commentRepository, IWishlistRepository wishlistRepository, ICartRepository cartRepository)
    {
        this.userContext = userContext;
        this.userManager = userManager;
        this.logger = logger;
        this.commentRepository = commentRepository;
        this.wishlistRepository = wishlistRepository;
        this.cartRepository = cartRepository;
    }

    public async Task Handle(DeleteAccountUserCommand request, CancellationToken cancellationToken)
    {
        var currentUser = userContext.GetCurrentUser();
        logger.LogInformation($"Nonactive user account with UserId: {currentUser!.Id}");

        var user = await userManager.FindByIdAsync(currentUser.Id);
        if(user == null) throw new NotFoundException(nameof(User), currentUser.Id);

        //delete comments exist
        var commentsExistsUser = await commentRepository.GetAllCommentsByUserId(user.Id);
        if (commentsExistsUser != null)
        {
            foreach( var comment in commentsExistsUser)
            {
                await commentRepository.DeleteComment(comment!);
            }
        }

        //delete wihslist exist
        var wishlistExistUser = await wishlistRepository.GetAllWishlistByUserId(user.Id);
        if (wishlistExistUser != null)
        {
            foreach(var wishlist in wishlistExistUser)
            {
                await wishlistRepository.DeleteWishlist(wishlist!.Id.ToString());
            }
        }

        //delete carts items exist
        var cartItemsExist = await cartRepository.GetCartItemsByUserId(user.Id);
        if (cartItemsExist != null)
        {
            foreach(var item in cartItemsExist)
            {
                await cartRepository.DeleteCart(item!);
            }
        }

        user.IsActive = false;
        await userManager.UpdateAsync(user);
    }
}
