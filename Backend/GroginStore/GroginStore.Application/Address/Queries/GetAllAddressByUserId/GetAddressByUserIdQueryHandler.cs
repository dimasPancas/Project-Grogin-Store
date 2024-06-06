using AutoMapper;
using GroginStore.Application.Address.DTOs;
using GroginStore.Application.Users;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Address.Queries.GetAllAddressByUserId
{
    public class GetAddressByUserIdQueryHandler : IRequestHandler<GetAddressByUserIdQuery, IEnumerable<AddressDto>>
    {
        private readonly IMapper mapper;
        private readonly IAddressRepository addressRepository;
        private readonly ILogger<GetAddressByUserIdQueryHandler> logger;
        private readonly IUserContext userContext;

        public GetAddressByUserIdQueryHandler(IMapper mapper, IAddressRepository addressRepository,
            ILogger<GetAddressByUserIdQueryHandler> logger, IUserContext userContext)
        {
            this.mapper = mapper;
            this.addressRepository = addressRepository;
            this.logger = logger;
            this.userContext = userContext;
        }
        public async Task<IEnumerable<AddressDto>> Handle(GetAddressByUserIdQuery request, CancellationToken cancellationToken)
        {
            var user = userContext.GetCurrentUser();
            logger.LogInformation($"Getting all address with UserId: {user!.Id}");
            var addresess = await addressRepository.GetAllAddressByUserId(user!.Id);
            var result = mapper.Map<IEnumerable<AddressDto>>(addresess);
            return result;
        }
    }
}
