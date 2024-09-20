using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController(DataContext dataContext) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUsers>>> GetUsers() { //=== It will returns all users.

            var lstUsers = await dataContext.Users.ToListAsync();
            return lstUsers;
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult <AppUsers>> GetUser(int id)
        {
            var user = await dataContext.Users.FindAsync(id);

            if (user == null) return NotFound();

            return user;

        }
    }
}
