using GroginStore.Domain.Common;
using GroginStore.Domain.IServices;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Province.Query
{
    public class GetAllProvinceQueryHandler : IRequestHandler<GetAllProvinceQuery, IEnumerable<Provinces>>
    {
        private readonly ILogger<GetAllProvinceQueryHandler> logger;
        private readonly IProvinceService provinceService;

        public GetAllProvinceQueryHandler(ILogger<GetAllProvinceQueryHandler> logger, IProvinceService provinceService)
        {
            this.logger = logger;
            this.provinceService = provinceService;
        }

        public async Task<IEnumerable<Provinces>> Handle(GetAllProvinceQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation("Getting all provinces in Indonesia");

            var result = await provinceService.GetAllProvinces();
            return result;
        }
    }
}
