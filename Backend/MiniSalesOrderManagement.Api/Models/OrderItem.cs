using System.Text.Json.Serialization;

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
     [JsonIgnore] 
    public Order Order { get; set; } // This is missing
}