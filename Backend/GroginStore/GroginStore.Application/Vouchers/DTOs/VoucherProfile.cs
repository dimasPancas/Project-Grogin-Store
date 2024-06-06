using AutoMapper;
using GroginStore.Application.Vouchers.Command.CreateVoucher;
using GroginStore.Application.Vouchers.Command.UpdateVoucher;
using GroginStore.Application.Vouchers.Command.UserClaimVoucher;
using GroginStore.Domain.Entities;

namespace GroginStore.Application.Vouchers.DTOs;

public class VoucherProfile : Profile
{
    public VoucherProfile()
    {
        CreateMap<CreateVoucerCommand, Voucher>();
        CreateMap<UpdateVoucherCommand, Voucher>();
        CreateMap<UserClaimVoucherCommand, UserVoucher>();

        //query
        CreateMap<Voucher, VoucherListAdminDto>();
        CreateMap<Voucher, VouhcerListCustDto>();
        CreateMap<Voucher, VoucherDetailByIdAdminDto>();
        CreateMap<Voucher, VoucherDetailByIdCustDto>();
    }
}
