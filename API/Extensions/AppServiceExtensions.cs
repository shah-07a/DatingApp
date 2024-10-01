using API.Data;
using API.DTOs;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class AppServiceExtensions
    {
        //=== An Extension method ===
        public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration config) 
        {
            services.AddControllers();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("APIConnString"));
            });

            services.AddCors(); //=== Cross Domain Setting
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            return services;
        }
    }
}
