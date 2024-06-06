using AutoMapper;
using GroginStore.Application.Address.DTOs;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Address.Commands.UpdateAddress
{
    public class UpdateAddressCommandHandler : IRequestHandler<UpdateAddressCommand, AddressDto>
    {
        private readonly IMapper mapper;
        private readonly ILogger<UpdateAddressCommandHandler> logger;
        private readonly IAddressRepository addressRepository;

        public UpdateAddressCommandHandler(IMapper mapper, ILogger<UpdateAddressCommandHandler> logger, IAddressRepository addressRepository)
        {
            this.mapper = mapper;
            this.logger = logger;
            this.addressRepository = addressRepository;
        }


        public async Task<AddressDto> Handle(UpdateAddressCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Updating address with Id: {request.Id}");
            var address = await addressRepository.GetDetailAddresById(request.Id!);
            if (address == null) throw new NotFoundException(nameof(Addres), request.Id!);
            mapper.Map(request, address);
            address.UpdatedDate = DateTime.Now;
            await addressRepository.SaveChanges();
            var result = mapper.Map<AddressDto>(address);
            return result;
        }
    }
}
