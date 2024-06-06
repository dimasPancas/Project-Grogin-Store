namespace GroginStore.Application.Categories.DTOs;

public class AdminCategoryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public bool IsActive { get; set; }
    public DateTime? UpdatedDate { get; set; }
}
