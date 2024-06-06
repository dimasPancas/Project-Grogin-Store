using AutoMapper;
using FluentAssertions;
using GroginStore.Application.Deliveries.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace GroginStore.Application.Deliveries.Command.CreateDelivery.Tests;

public class CreateDeliveryCommandHandlerTests
{
    [Fact()]
    public async Task Handle_ForValidCommand_ReturnsCategoryDto()
    {
        //arrange
        var loggerMock = new Mock<ILogger<CreateDeliveryCommandHandler>>();
        var mapperMock = new Mock<IMapper>();
        var userContextMock = new Mock<IUserContext>();
        var deliveryRepositoryMock = new Mock<IDeliveriesRepository>();

        var command = new CreateDeliveryCommand();
        var delivery = new Delivery();

        mapperMock.Setup(m => m.Map<Delivery>(command)).Returns(delivery);
        mapperMock.Setup(m => m.Map<DelieryDto>(It.IsAny<Delivery>())).Returns((Delivery src) => new DelieryDto
        {
            Id = src.Id,
            Name = src.Name,
            Price = src.Price,
        });

        deliveryRepositoryMock.Setup(
            repo => repo.CreateDelivery(It.IsAny<Delivery>())).ReturnsAsync(delivery);

        var currentUser = new CurrentUser("admin-id", "admin@gmail.com", []);
        userContextMock.Setup(u => u.GetCurrentUser()).Returns(currentUser);

        var deliveryHandler = new CreateDeliveryCommandHandler(deliveryRepositoryMock.Object,
            mapperMock.Object, loggerMock.Object, userContextMock.Object);


        //act
        var result = await deliveryHandler.Handle(command, CancellationToken.None);

        //assert
        result.Should().NotBeNull();
        result.Should().BeEquivalentTo(new DelieryDto
        {
            Id = delivery.Id,
            Name = delivery.Name,
            Price = delivery.Price,
        });
        delivery.CreatedBy.Should().Be(currentUser.Id);
        deliveryRepositoryMock.Verify(c => c.CreateDelivery(It.IsAny<Delivery>()), Times.Once());
    }


}