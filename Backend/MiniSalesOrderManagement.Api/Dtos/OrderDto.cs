using System.Collections.Generic;

namespace MiniSalesOrderManagement.Api.Dtos
{
    public class OrderDto
    {
        public int CustomerId { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
    }
}
