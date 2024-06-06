using AutoMapper;
using GroginStore.Application.Carts.DTOs;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Carts.Command.UpdateCart;

public class UpdateCartCommandHandler : IRequestHandler<UpdateCartCommand, CartDto>
{
    private readonly IMapper mapper;
    private readonly ILogger<UpdateCartCommandHandler> logger;
    private readonly IProductsRepository productsRepository;
    private readonly ICartRepository cartRepository;

    public UpdateCartCommandHandler(
        IMapper mapper, ILogger<UpdateCartCommandHandler> logger,
        IProductsRepository productsRepository, ICartRepository cartRepository
        )
    {
        this.mapper = mapper;
        this.logger = logger;
        this.productsRepository = productsRepository;
        this.cartRepository = cartRepository;
    }


    public async Task<CartDto> Handle(UpdateCartCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"Updating quantity Cart to {request.Quantity} with CartId:{request.Id}");
        var cart = await cartRepository.GetCartById(request.Id);
        if (cart == null) throw new NotFoundException(nameof(Cart), request.Id);

        var product = await productsRepository.GetDetailProduct(cart.ProductId.ToString());
        if (product == null) throw new NotFoundException(nameof(Product), cart.ProductId.ToString());

        if(request.Quantity == 0)
        {
            await cartRepository.DeleteCart(cart);
        }

        // Validasi jumlah item agar tidak melebihi stok produk
        if (request.Quantity > product.Stock)
        {
            throw new InvalidOperationException("Requested quantity exceeds available stock.");
        }

        cart.Quantity = request.Quantity;
        cart.Subtotal = product.Price * request.Quantity;

        await cartRepository.SaveChanges();

        var result = mapper.Map<CartDto>(cart);
        return result;
    }

}
