using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Carts.Command.DeleteCart;

public class DeleteCartCommandHandler : IRequestHandler<DeleteCartCommand>
{
    private readonly ILogger<DeleteCartCommandHandler> logger;
    private readonly ICartRepository cartRepository;

    public DeleteCartCommandHandler(ILogger<DeleteCartCommandHandler> logger, ICartRepository cartRepository)
    {
        this.logger = logger;
        this.cartRepository = cartRepository;
    }


    public async Task Handle(DeleteCartCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"Deleting Cart with Id: {request.Id}");
        var cart = await cartRepository.GetCartById(request.Id);
        if (cart == null) throw new NotFoundException(nameof(Cart), request.Id);
        await cartRepository.DeleteCart(cart);
    }
}
