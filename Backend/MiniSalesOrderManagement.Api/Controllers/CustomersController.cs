using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using MiniSalesOrderManagement.Api.Data;

[Route("api/[controller]")]
[ApiController]
public class CustomersController : ControllerBase
{
    private readonly AppDbContext _context;

    public CustomersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreateCustomer([FromBody] Customer customer)
    {
        _context.Customers.Add(customer);
        _context.SaveChanges();
        return Ok(customer);
    }

    [HttpGet]
    public IActionResult GetCustomers()
    {
        return Ok(_context.Customers.ToList());
    }
}