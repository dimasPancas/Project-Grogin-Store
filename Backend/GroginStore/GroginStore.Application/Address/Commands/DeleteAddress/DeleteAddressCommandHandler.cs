using AutoMapper;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Address.Commands.DeleteAddress;

public class DeleteAddressCommandHandler : IRequestHandler<DeleteAddressCommand>
{
    private readonly IAddressRepository addressRepository;
    private readonly IMapper mapper;
    private readonly ILogger<DeleteAddressCommandHandler> logger;

    public DeleteAddressCommandHandler(IAddressRepository addressRepository, IMapper mapper, ILogger<DeleteAddressCommandHandler> logger)
    {
        this.addressRepository = addressRepository;
        this.mapper = mapper;
        this.logger = logger;
    }

    public async Task Handle(DeleteAddressCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"Deleting addres with Id: {request.Id}");
        var address = await addressRepository.GetDetailAddresById(request.Id);
        if (address == null) throw new NotFoundException(nameof(Addres), request.Id.ToString());
        address.IsActive = false;
        address.DeletedDate = DateTime.Now;
        await addressRepository.SaveChanges();
    }
}
