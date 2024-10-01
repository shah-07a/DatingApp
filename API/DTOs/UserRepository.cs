using API.Data;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.DTOs
{
    public class UserRepository(DataContext dataContext, IMapper mapper) : IUserRepository
    {
        public async Task<MemberDto?> GetMemberAsync(string username)
        {
            return await dataContext.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<MemberDto?> GetMemberAsync(int id)
        {
            return await dataContext.Users
                .Where(x => x.Id == id)
                .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await dataContext.Users
                .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        async Task<AppUsers?> IUserRepository.GetUserByIdAsync(int id)
        {
            return await dataContext.Users.FindAsync(id);
        }

        async Task<AppUsers?> IUserRepository.GetUserByNameAsync(string username)
        {
           return await dataContext.Users
                .Include(x => x.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        async Task<IEnumerable<AppUsers>> IUserRepository.GetUsersAsync()
        {
            return await dataContext.Users
                .Include(x => x.Photos)
                .ToListAsync();
        }

        async Task<bool> IUserRepository.SaveAllAsync(AppUsers user)
        {
            return await dataContext.SaveChangesAsync() > 0;
        }

        void IUserRepository.Update(AppUsers user)
        {
           dataContext.Entry(user).State = EntityState.Modified;
        }
    }
}
