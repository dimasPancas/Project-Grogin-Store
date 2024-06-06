using AutoMapper;
using FluentAssertions;
using GroginStore.Application.Payments.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace GroginStore.Application.Payments.Commands.CreatePayment.Tests;

public class CreatePaymentCommandHandlerTests
{
    [Fact()]
    public async Task Handle_ForValidCommand_ReturnsPaymentDto()
    {
        // Arrange
        var loggerMock = new Mock<ILogger<CreatePaymentCommandHandler>>();
        var mapperMock = new Mock<IMapper>();

        var command = new CreatePaymentCommand();
        //{
        //    Name = "test",
        //    PaymentCost = 1
        //};

        var payment = new Payment();
        //{
        //    Id = Guid.NewGuid(),
        //    Name = command.Name,
        //    PaymentCost = command.PaymentCost,
        //};

        mapperMock.Setup(m => m.Map<Payment>(command)).Returns(payment);
        mapperMock.Setup(m => m.Map<PaymentDto>(It.IsAny<Payment>())).Returns((Payment src) => new PaymentDto
        {
            Id = src.Id,
            Name = src.Name,
            PaymentCost = src.PaymentCost
        });

        var userContextMock = new Mock<IUserContext>();
        var paymentRepositoryMock = new Mock<IPaymentsRepository>();

        paymentRepositoryMock.Setup(repo => repo.CreatePayment(It.IsAny<Payment>())).ReturnsAsync(payment);

        var currentUser = new CurrentUser("admin-id", "admin@gmail.com", new string[] { });
        userContextMock.Setup(u => u.GetCurrentUser()).Returns(currentUser);

        var paymentHandler = new CreatePaymentCommandHandler(mapperMock.Object, paymentRepositoryMock.Object,
            loggerMock.Object, userContextMock.Object);

        // Act
        var result = await paymentHandler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeEquivalentTo(new PaymentDto
        {
            Id = payment.Id,
            Name = payment.Name,
            PaymentCost = payment.PaymentCost
        });
        payment.CreatedBy.Should().Be(currentUser.Id);
        paymentRepositoryMock.Verify(p => p.CreatePayment(It.IsAny<Payment>()), Times.Once());
    }
}

