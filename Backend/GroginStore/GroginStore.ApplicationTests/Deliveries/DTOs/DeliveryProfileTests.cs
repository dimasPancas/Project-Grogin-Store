using AutoMapper;
using FluentAssertions;
using GroginStore.Application.Deliveries.Command.CreateDelivery;
using GroginStore.Application.Deliveries.Command.UpdateDelivery;
using GroginStore.Domain.Entities;
using Xunit;

namespace GroginStore.Application.Deliveries.DTOs.Tests;

public class DeliveryProfileTests
{
    private IMapper mapper;

    public DeliveryProfileTests()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<DeliveryProfile>();
        });

        mapper = configuration.CreateMapper();
    }


    [Fact()]
    public void CreateMap_ForDeliveryToDeliveryDto_MapsCorrectly()
    {
        var delivery = new Delivery()
        {
            Id = Guid.NewGuid(),
            Name = "Test",
            Price = 15000
        };

        //act
        var deliveryDto = mapper.Map<DelieryDto>(delivery);

        //assert

        deliveryDto.Should().NotBeNull();
        deliveryDto.Id.Should().Be(delivery.Id);
        deliveryDto.Name.Should().Be(delivery.Name);
        deliveryDto.Price.Should().Be(delivery.Price);
    }

    [Fact()]
    public void CreateMap_ForCreateDeliveryCommandToDelivery_MapsCorrectly()
    {
        var command = new CreateDeliveryCommand()
        {
            Name = "Test",
            Price = 5000
        };

        
        //act
        var delivery = mapper.Map<Delivery>(command);

        //assert
        delivery.Should().NotBeNull();
        delivery.Name.Should().Be(command.Name);
        delivery.Price.Should().Be(command.Price);
    }

    [Fact()]
    public void CreateMap_ForUpdateDeliveryCommandToDelivery_MapsCorrectly()
    {
        var command = new UpdateDeliveryCommand
        {
            Id = Guid.NewGuid(),
            Name = "Test update",
            Price = 5000,
        };


        //act
        var delivery = mapper.Map<Delivery>(command);

        //assert
        delivery.Should().NotBeNull();
        delivery.Name.Should().Be(command.Name);
        delivery.Price.Should().Be(command.Price);
    }
}