using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
        [Authorize]
    //===public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController
    //==={
        public class UsersController(IUserRepository userRepository) : BaseApiController
        {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        { //=== It will returns all users.

            var users = await userRepository.GetMembersAsync();
             return Ok(users);

            //=== With mapping === 
          //===  var usersToReturn = mapper.Map<IEnumerable<MemberDto>>(users);
           //=== return Ok(usersToReturn);
        }
        
        [HttpGet("{id:int}")]
        public async Task<ActionResult <MemberDto>> GetUser(int id)
        {
            var user = await userRepository.GetMemberAsync(id);

            if (user == null) return NotFound();
            return user;
            //=== return mapper.Map<MemberDto>(user);

        }
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await userRepository.GetMemberAsync(username);

            if (user == null) return NotFound();

            return user;
        }
    }
}
