using AutoMapper;
using GroginStore.Application.Carts.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Carts.Command.CreateCart;

public class CreateCartCommandHandler : IRequestHandler<CreateCartCommand, CartDto?>
{
    private readonly IUserContext userContext;
    private readonly ILogger<CreateCartCommandHandler> logger;
    private readonly ICartRepository cartRepository;
    private readonly IMapper mapper;
    private readonly IProductsRepository productsRepository;

    public CreateCartCommandHandler(
        IUserContext userContext, ILogger<CreateCartCommandHandler> logger,
        ICartRepository cartRepository, IMapper mapper,
        IProductsRepository productsRepository)
    {
        this.userContext = userContext;
        this.logger = logger;
        this.cartRepository = cartRepository;
        this.mapper = mapper;
        this.productsRepository = productsRepository;
    }

    public async Task<CartDto?> Handle(CreateCartCommand request, CancellationToken cancellationToken)
    {
        var user = userContext.GetCurrentUser();
        logger.LogInformation($"Adding to cart with userId:{user!.Id} and productId: {request.ProductId}");

        var product = await productsRepository.GetDetailProduct(request.ProductId!);
        if (product == null) throw new NotFoundException(nameof(Product), request.ProductId!.ToString());

        var existingItemsInCart = await cartRepository.GetItemsCartExist(user!.Id, request.ProductId!);
        decimal subtotal = request.Quantity * product.Price;

        if (existingItemsInCart != null)
        {
            int totalItemsInCart = existingItemsInCart.Quantity + request.Quantity;

            // Validasi jumlah item di keranjang agar tidak melebihi stok produk
            if (totalItemsInCart > product.Stock)
            {
                throw new InvalidOperationException("Total items in cart exceed available stock.");
            }

            existingItemsInCart.Quantity += request.Quantity;
            existingItemsInCart.Subtotal += subtotal;
            await cartRepository.SaveChanges();
        }
        else
        {
            // Validasi jumlah item yang akan ditambahkan agar tidak melebihi stok produk
            if (request.Quantity > product.Stock)
            {
                throw new InvalidOperationException("Requested quantity exceeds available stock.");
            }

            var cartModel = mapper.Map<Cart>(request);
            cartModel.Subtotal = subtotal;
            cartModel.UserId = user.Id;
            await cartRepository.AddToCart(cartModel);
        }

        // Mengembalikan data keranjang yang telah diperbarui atau ditambahkan
        var updatedCartItems = await cartRepository.GetItemsCartExist(user!.Id, request.ProductId!);
        var result = mapper.Map<CartDto>(updatedCartItems);
        return result;
    }


}
