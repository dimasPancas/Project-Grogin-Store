using AutoMapper;
using FluentAssertions;
using GroginStore.Application.Payments.Commands.CreatePayment;
using GroginStore.Application.Payments.Commands.UpdatePayment;
using GroginStore.Domain.Entities;
using Xunit;
namespace GroginStore.Application.Payments.DTOs.Tests;

public class PaymentsProfileTests
{
    private IMapper mapper;
    public PaymentsProfileTests()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<PaymentsProfile>();
        });

        mapper = configuration.CreateMapper();
    }

    [Fact()]
    public void CreateMap_ForPaymentToPaymentDto_MapsCorrectly()
    {
        //arrange
        var user = new User()
        {
            Id = Guid.NewGuid().ToString(),
            UserName = "admin"
        };

        var payment = new Payment()
        {
            Id = Guid.NewGuid(),
            Name = "test",
            PaymentCost = 1,
            CreatedDate = DateTime.Now,
            UpdatedDate = DateTime.Now.AddDays(7),
            DeletedDate = null,
            IsActive = true,
            CreatedBy = user.Id,
            UpdatedBy = user.Id,
            UserAdmin = user,
        };

        //act
        var paymentDto = mapper.Map<PaymentDto>(payment);

        //assert
        paymentDto.Should().NotBeNull();
        paymentDto.Id.Should().Be(payment.Id);
        paymentDto.Name.Should().Be(payment.Name);
        paymentDto.PaymentCost.Should().Be(payment.PaymentCost);

    }

    [Fact()]
    public void CreateMap_ForPaymentToAdminPaymentDto_MapsCorrectly()
    {
        //arrange
        var user = new User()
        {
            Id = Guid.NewGuid().ToString(),
            UserName = "admin"
        };

        var payment = new Payment()
        {
            Id = Guid.NewGuid(),
            Name = "test",
            PaymentCost = 1,
            CreatedDate = DateTime.Now,
            UpdatedDate = DateTime.Now.AddDays(7),
            DeletedDate = null,
            IsActive = true,
            CreatedBy = user.Id,
            UpdatedBy = user.Id,
            UserAdmin = user,
        };

        //act
        var adminPaymentDto = mapper.Map<AdminPaymentDto>(payment);

        //assert
        adminPaymentDto.Should().NotBeNull();
        adminPaymentDto.Id.Should().Be(payment.Id);
        adminPaymentDto.Name.Should().Be(payment.Name);
        adminPaymentDto.PaymentCost.Should().Be(payment.PaymentCost);
        adminPaymentDto.IsActive.Should().Be(payment.IsActive);
    }

    [Fact()]
    public void CreateMap_ForPaymentToPaymentByIdDto_MapsCorrectly()
    {
        //arrange
        var user = new User()
        {
            Id = Guid.NewGuid().ToString(),
            UserName = "admin"
        };

        var payment = new Payment()
        {
            Id = Guid.NewGuid(),
            Name = "test",
            PaymentCost = 1,
            CreatedDate = DateTime.Now,
            UpdatedDate = DateTime.Now.AddDays(7),
            DeletedDate = null,
            IsActive = true,
            CreatedBy = user.Id,
            UpdatedBy = user.Id,
            UserAdmin = user,
        };

        //act
        var paymentDetailDto = mapper.Map<PaymentByIdDto>(payment);

        //assert
        paymentDetailDto.Should().NotBeNull();
        paymentDetailDto.Id.Should().Be(payment.Id);
        paymentDetailDto.Name.Should().Be(payment.Name);
        paymentDetailDto.PaymentCost.Should().Be(payment.PaymentCost);
        paymentDetailDto.IsActive.Should().Be(payment.IsActive);
        paymentDetailDto.CreatedDate.Should().Be(payment.CreatedDate);
        paymentDetailDto.UpdatedDate.Should().Be(payment.UpdatedDate);
        paymentDetailDto.DeletedDate.Should().Be(payment.DeletedDate);
        paymentDetailDto.CreatedBy.Should().Be(user.UserName);
        paymentDetailDto.UpdatedBy.Should().Be(user.UserName);


    }

    [Fact()]
    public void CreateMap_ForCreatePaymentCommandToPayment_MapsCorrectly()
    {
        //arrange
        var commad = new CreatePaymentCommand()
        {
            Name = "test",
            PaymentCost = 1,
        };

        //act
        var payment = mapper.Map<Payment>(commad);

        //assert
        payment.Should().NotBeNull();
        payment.Name.Should().Be(commad.Name);
        payment.PaymentCost.Should().Be(commad.PaymentCost);
    }

    [Fact()]
    public void CreateMap_ForUpdatePaymentCommandToPayment_MapsCorrectly()
    {
        //arrange
        var commad = new UpdatePaymentCommand()
        {
            Id = Guid.NewGuid().ToString(),
            Name = "test",
            PaymentCost = 1,
        };

        //act
        var payment = mapper.Map<Payment>(commad);

        //assert
        payment.Should().NotBeNull();
        payment.Id.Should().Be(commad.Id);
        payment.Name.Should().Be(commad.Name);
        payment.PaymentCost.Should().Be(commad.PaymentCost);

    }
}