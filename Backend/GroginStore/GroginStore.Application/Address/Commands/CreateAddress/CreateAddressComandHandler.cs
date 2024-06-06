using AutoMapper;
using GroginStore.Application.Address.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Address.Commands.CreateAddress;

public class CreateAddressComandHandler : IRequestHandler<CreateAddressComand, AddressDto>
{
    private readonly IMapper mapper;
    private readonly ILogger<CreateAddressComandHandler> logger;
    private readonly IAddressRepository addressRepository;
    private readonly IUserContext userContext;

    public CreateAddressComandHandler(IMapper mapper, ILogger<CreateAddressComandHandler> logger, IAddressRepository addressRepository, IUserContext userContext)
    {
        this.mapper = mapper;
        this.logger = logger;
        this.addressRepository = addressRepository;
        this.userContext = userContext;
    }

    public async Task<AddressDto> Handle(CreateAddressComand request, CancellationToken cancellationToken)
    {
        var user = userContext.GetCurrentUser();

        logger.LogInformation($"Creating new addres for user with UserId: {user!.Id}");
        var addressModel = mapper.Map<Addres>(request);
        addressModel.UserId = user.Id;
        addressModel.CreatedDate = DateTime.Now;
        var address = await addressRepository.CreateAddress(addressModel);
        var result = mapper.Map<AddressDto>(address);
        return result;
    }
}
