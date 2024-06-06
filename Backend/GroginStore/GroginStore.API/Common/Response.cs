namespace GroginStore.API.Common;

public class Response
{
    public int Status { get; set; }
    public string Message { get; set; } = default!;
    public object? Data { get; set; }
}
