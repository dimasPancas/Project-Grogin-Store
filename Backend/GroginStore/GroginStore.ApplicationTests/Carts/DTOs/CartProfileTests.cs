using AutoMapper;
using FluentAssertions;
using GroginStore.Application.Carts.Command.CreateCart;
using GroginStore.Domain.Entities;
using Xunit;

namespace GroginStore.Application.Carts.DTOs.Tests;

public class CartProfileTests
{
    private IMapper mapper;
    public CartProfileTests()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<CartProfile>();
        });

        mapper = configuration.CreateMapper();
    }


    [Fact()]
    public void CreateMap_ForCartToCartListDto_MapsCorrectly()
    {
        //arrange
        var product = new Product()
        {
            Id = Guid.NewGuid(),
            Name = "test",
            Price = 1,
            ProductImage = "img",
            Stock = 10,
        };

        var cart = new Cart()
        {
            Id = Guid.NewGuid(),
            UserId = "1",
            ProductId = product.Id,
            Quantity = 1,
            Subtotal = 1,
            Product = product,
        };

        //act
        var cartListDto = mapper.Map<CartListDto>(cart);

        //assert
        cartListDto.Should().NotBeNull();
        cartListDto.Subtotal.Should().Be(cart.Subtotal);
        cartListDto.Quantity.Should().Be(cart.Quantity);
        cartListDto.ProductName.Should().Be(product.Name);
        cartListDto.ProductPrice.Should().Be(product.Price);
        cartListDto.ProductImage.Should().Be(product.ProductImage);
    }

    [Fact()]
    public void CreateMap_ForCreateCartCommandToCart_MapsCorrectly()
    {
        //arrange
        var product = new Product()
        {
            Id = Guid.NewGuid(),
            Name = "test",
        };

        var command = new CreateCartCommand()
        {
            ProductId = product.Id.ToString(),
            Quantity = 1,
        };

        //act
        var cart = mapper.Map<Cart>(command);

        //assert
        cart.Should().NotBeNull();
        cart.ProductId.Should().Be(product.Id);
        cart.Quantity.Should().Be(command.Quantity);
    }
}