using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace API.Data
{
    public class DataContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<AppUsers> Users { get; set; }     
    }
}
