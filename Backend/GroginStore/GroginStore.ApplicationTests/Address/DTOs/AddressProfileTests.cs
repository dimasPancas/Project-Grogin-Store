using AutoMapper;
using FluentAssertions;
using GroginStore.Application.Address.Commands.CreateAddress;
using GroginStore.Application.Address.Commands.UpdateAddress;
using GroginStore.Domain.Entities;
using Xunit;

namespace GroginStore.Application.Address.DTOs.Tests;

public class AddressProfileTests
{
    private IMapper mapper;

    public AddressProfileTests()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<AddressProfile>();
        });

        mapper = configuration.CreateMapper();
    }


    [Fact()]
    public void CreateMap_ForAddressToAddressDto_MapsCorrectly()
    {
        //arrange
        var address = new Addres()
        {
            Id = Guid.NewGuid(),
            Province = "Jakarta",
            City = "Cakung",
            PostalCode = 1,
            Village = "Pedaengan",
            Street = "street"
        };

        //act
        var addressDto = mapper.Map<AddressDto>(address);

        //assert
        addressDto.Should().NotBeNull();
        addressDto.Id.Should().Be(address.Id);
        addressDto.Province.Should().Be(address.Province);
        addressDto.City.Should().Be(address.City);
        addressDto.PostalCode.Should().Be(address.PostalCode);
        addressDto.Village.Should().Be(address.Village);
        addressDto.Street.Should().Be(address.Street);
    }

    [Fact()]
    public void CreateMap_ForAddressToAddressDetailByIdDto_MapsCorrectly()
    {
        //arrange
        var address = new Addres()
        {
            Id = Guid.NewGuid(),
            Province = "Jakarta",
            City = "Cakung",
            PostalCode = 1,
            Village = "Pedaengan",
            Street = "street",
            CreatedDate = DateTime.Now,
            UpdatedDate = DateTime.Now.AddDays(2)
        };

        //act
        var addressDto = mapper.Map<AddressDetailByIdDto>(address);

        //assert
        addressDto.Should().NotBeNull();
        addressDto.Id.Should().Be(address.Id);
        addressDto.Province.Should().Be(address.Province);
        addressDto.City.Should().Be(address.City);
        addressDto.PostalCode.Should().Be(address.PostalCode);
        addressDto.Village.Should().Be(address.Village);
        addressDto.Street.Should().Be(address.Street);
        addressDto.CreatedDate.Should().Be(address.CreatedDate);
        addressDto.UpdatedDate.Should().Be(address.UpdatedDate);
    }

    [Fact()]
    public void CreateMap_ForCreateAddressCommandToAdress_MapsCorrectly()
    {
        //arrange
        var addressCommand = new CreateAddressComand()
        {
            Province = "Jakarta",
            City = "Cakung",
            PostalCode = 1,
            Village = "Pedaengan",
            Street = "street"
        };

        //act
        var address = mapper.Map<Addres>(addressCommand);

        //assert
        address.Should().NotBeNull();
        address.Province.Should().Be(addressCommand.Province);
        address.City.Should().Be(addressCommand.City);
        address.PostalCode.Should().Be(addressCommand.PostalCode);
        address.Village.Should().Be(addressCommand.Village);
        address.Street.Should().Be(addressCommand.Street);
    }


    [Fact()]
    public void CreateMap_ForUpdateAddressCommandToAddress()
    {
        //arrange
        var command = new UpdateAddressCommand()
        {
            Id = Guid.NewGuid().ToString(),
            Province = "Jakarta",
            City = "Cakung",
            PostalCode = 1,
            Village = "Pedaengan",
            Street = "street"
        };

        //act
        var address = mapper.Map<Addres>(command);

        //assert
        address.Should().NotBeNull();
        address.Id.Should().Be(command.Id);
        address.Province.Should().Be(command.Province);
        address.City.Should().Be(command.City);
        address.PostalCode.Should().Be(command.PostalCode);
        address.Village.Should().Be(command.Village);
        address.Street.Should().Be(command.Street);
    }
}