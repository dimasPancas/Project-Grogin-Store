using MediatR;

namespace GroginStore.Application.Address.Commands.DeleteAddress;

public class DeleteAddressCommand : IRequest
{
    public DeleteAddressCommand(string id)
    {
        Id = id;
    }

    public string Id { get; }
}
