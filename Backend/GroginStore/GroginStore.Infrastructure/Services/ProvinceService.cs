using GroginStore.Domain.Common;
using GroginStore.Domain.IServices;
using Newtonsoft.Json;

namespace GroginStore.Infrastructure.Services;

public class ProvinceService : IProvinceService
{
    private readonly HttpClient httpClient;

    public ProvinceService(HttpClient httpClient)
    {
        this.httpClient = httpClient;
    }

    public async Task<IEnumerable<Provinces>> GetAllProvinces()
    {
        var response = await httpClient.GetAsync("https://sipedas.pertanian.go.id/api/wilayah/list_wilayah?thn=2024&lvl=10&lv2=11");

        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();

            // Mengubah objek JSON menjadi dictionary untuk kemudian diubah menjadi IEnumerable<Provinces>
            var provincesDict = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

            var provincesList = provincesDict.Select(kv => new Provinces
            {
                Id = kv.Key,
                Name = kv.Value
            });

            return provincesList;
        }
        else
        {
            // Handle error jika permintaan tidak berhasil
            throw new HttpRequestException($"Failed to get provinces from API. Status code: {response.StatusCode}");
        }
    }

}
