using GroginStore.API.Controllers;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;
using System.Net;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authorization.Policy;
using GroginStore.APITests;
using Moq;
using GroginStore.Domain.IRepositories;
using Microsoft.Extensions.DependencyInjection.Extensions;
using GroginStore.Domain.Entities;

namespace GroginStore.API.Controllers.Tests;

public class PaymentControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> factory;
    private readonly Mock<IPaymentsRepository> paymentRepositoryMock = new();

    public PaymentControllerTests(WebApplicationFactory<Program> webApplicationFactory)
    {
        factory = webApplicationFactory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureTestServices(services =>
            {
                services.AddSingleton<IPolicyEvaluator, FakePolicyEvaluator>();
                services.Replace(ServiceDescriptor.Scoped(typeof(IPaymentsRepository), _ => paymentRepositoryMock.Object));
            });
        });
    }

    [Fact]
    public async Task GetAll_ForValidRequest_Returns200Ok()
    {
        // Arrange
        var client = factory.CreateClient();

        // Act
        var response = await client.GetAsync("/api/Payment");

        // Assert
        //Assert.Equal(System.Net.HttpStatusCode.OK, response.StatusCode);
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
    }

    [Fact()]
    public async Task GetPaymentById_ForNonExistingId_ShouldReturn404NotFound()
    {
        //arrange
        var id = Guid.NewGuid();

        paymentRepositoryMock.Setup(m => m.GetPaymentById(id.ToString())).ReturnsAsync((Payment?)null);
        var client = factory.CreateClient();

        //act
        var response = await client.GetAsync($"/api/Payment/admin/{id}");

        //assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}
