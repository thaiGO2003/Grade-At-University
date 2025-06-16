using Microsoft.AspNetCore.Mvc;
using MiniSalesOrderManagement.Api.Data;
using Microsoft.EntityFrameworkCore;
using MiniSalesOrderManagement.Api.Dtos;

[Route("api/[controller]")]
[ApiController]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreateOrder([FromBody] OrderDto orderDto)
    {
        if (orderDto == null || orderDto.OrderItems == null || orderDto.OrderItems.Count == 0)
        {
            return BadRequest("Order and order items are required.");
        }

        var order = new Order
        {
            CustomerId = orderDto.CustomerId,
            OrderDate = DateTime.Now,
            OrderItems = orderDto.OrderItems.Select(itemDto => new OrderItem
            {
                ProductName = itemDto.ProductName,
                Quantity = itemDto.Quantity,
                UnitPrice = itemDto.UnitPrice
            }).ToList()
        };
        order.TotalAmount = order.OrderItems.Sum(item => item.Quantity * item.UnitPrice);
        _context.Orders.Add(order);
        _context.SaveChanges();
        // Ensure customer is included in response
        var createdOrder = _context.Orders.Include(o => o.Customer).Include(o => o.OrderItems).FirstOrDefault(o => o.Id == order.Id);
        return Ok(createdOrder);
    }

    [HttpGet]
    public IActionResult GetOrders()
    {
        return Ok(_context.Orders.Include(o => o.OrderItems).Include(o => o.Customer).ToList());
    }
}