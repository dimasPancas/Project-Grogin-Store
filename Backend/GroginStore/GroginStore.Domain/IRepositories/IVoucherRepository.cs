using GroginStore.Domain.Constant;
using GroginStore.Domain.Entities;
using System.Threading.Tasks;

namespace GroginStore.Domain.IRepositories;

public interface IVoucherRepository
{
    //query all : admin
    Task<IEnumerable<Voucher>> AdminGetAllVoucher(VoucherType? type, bool? isActive);

    //query all : cust
    Task <(IEnumerable<Voucher>? FreeShipping, IEnumerable<Voucher>? VoucherDiscount, IEnumerable<Voucher>? VoucherPercentage)>
         CustomerGetAllVouchers(string userId);

    Task<(IEnumerable<Voucher>? FreeShipping, IEnumerable<Voucher>? VoucherDiscount, IEnumerable<Voucher>? VoucherPercentage)>
         CustomerGetAvailableVouchers(string userId);

    Task CreateVoucher(Voucher voucher);
    Task<Voucher?> GetVoucherById(string voucherId);

    Task SaveChanges();
}
