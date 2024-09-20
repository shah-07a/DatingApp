using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController(DataContext dataContext, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")] //account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await UserExists(registerDto.UserName)) return BadRequest("User name already exists.");
            using var hmac = new HMACSHA512();
            var user = new AppUsers
            {
                UserName = registerDto.UserName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PassworSalt = hmac.Key
            };
            dataContext.Users.Add(user);
            await dataContext.SaveChangesAsync();
            return new UserDto
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }

        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await dataContext.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower());
            
            if (user == null) return Unauthorized("Invalid user name.");

            using var hmac = new HMACSHA512(user.PassworSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for(int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password.");
            }
            return new UserDto
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
            
        }

        private async Task<bool> UserExists(string username)
        {
            return await dataContext.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }
    }
}
