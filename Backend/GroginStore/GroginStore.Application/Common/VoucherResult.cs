namespace GroginStore.Application.Common;

public class VoucherResult<T>
{
    public VoucherResult(IEnumerable<T> freeShipping, IEnumerable<T> voucherPercentage, IEnumerable<T> voucherDiscount)
    {
        FreeShipping = freeShipping;
        VoucherPercentage = voucherPercentage;
        VoucherDiscount = voucherDiscount;
    }

    public IEnumerable<T?>? FreeShipping {  get; set; }
    public IEnumerable<T?>? VoucherPercentage { get; set; }
    public IEnumerable<T?>? VoucherDiscount { get; set; }
}
