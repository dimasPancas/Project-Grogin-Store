using AutoMapper;
using GroginStore.Application.Address.DTOs;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Address.Queries.GetAddressById
{
    public class GetAddressByIdQueryHandler : IRequestHandler<GetAddressByIdQuery, AddressDetailByIdDto>
    {
        private readonly IMapper mapper;
        private readonly ILogger<GetAddressByIdQueryHandler> logger;
        private readonly IAddressRepository addressRepository;

        public GetAddressByIdQueryHandler(IMapper mapper, ILogger<GetAddressByIdQueryHandler> logger, IAddressRepository addressRepository)
        {
            this.mapper = mapper;
            this.logger = logger;
            this.addressRepository = addressRepository;
        }

        public async Task<AddressDetailByIdDto> Handle(GetAddressByIdQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Get address with Id: {request.Id}");
            var address = await addressRepository.GetDetailAddresById(request.Id);
            if (address == null) throw new NotFoundException(nameof(Addres), request.Id.ToString());
            var result = mapper.Map<AddressDetailByIdDto>(address);
            return result;
        }
    }
}
