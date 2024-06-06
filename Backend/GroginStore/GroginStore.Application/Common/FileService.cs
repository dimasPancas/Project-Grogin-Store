using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace GroginStore.Application.Common
{
    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile imageFile, string[] allowedExtension);
        void DeleteFile(string fileNameWithExtension);
    }

    public class FileService(IWebHostEnvironment environment) : IFileService
    {
        public void DeleteFile(string fileNameWithExtension)
        {
            if (string.IsNullOrEmpty(fileNameWithExtension)) throw new ArgumentNullException(nameof(fileNameWithExtension));

            var contentPath = environment.ContentRootPath;
            var path = Path.Combine(contentPath, "Uploads", fileNameWithExtension);

            if (!File.Exists(path)) throw new FileNotFoundException("Invalid File Path");
            File.Delete(path);
        }

        public async Task<string> SaveFileAsync(IFormFile imageFile, string[] allowedExtension)
        {
            if (imageFile == null) throw new ArgumentNullException(nameof(imageFile));

            var contentPath = environment.ContentRootPath;
            var path = Path.Combine(environment.ContentRootPath, "Uploads");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            //cek the extensio file
            var ext = Path.GetExtension(imageFile.FileName);
            if (!allowedExtension.Contains(ext)) throw new ArgumentException($"Only {string.Join(",", allowedExtension)} are allowed.");

            //generate a unique filename
            var fileName = $"{Guid.NewGuid().ToString("N")}{ext}";
            var fileNameWithPath = Path.Combine(path, fileName);

            using var stream = new FileStream(fileNameWithPath, FileMode.Create);

            await imageFile.CopyToAsync(stream);
            return fileName;
        }
    }
}
