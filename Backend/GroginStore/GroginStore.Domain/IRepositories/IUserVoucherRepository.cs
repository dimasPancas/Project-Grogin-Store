using GroginStore.Domain.Entities;

namespace GroginStore.Domain.IRepositories;

public interface IUserVoucherRepository
{
    Task CreateVoucherUserClaim(UserVoucher data);

    Task<bool> HasUserClaimedVoucher(string userId, string voucherId);

    Task RemoveVoucherAfterClaim(string userId, string voucherId);
}
