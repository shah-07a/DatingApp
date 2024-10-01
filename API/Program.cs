using API.Data;
using API.Extensions;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddAppServices(builder.Configuration); //=== Added an extension method
builder.Services.AddIdentityServices(builder.Configuration); //=== Added an extension method

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200","https://loacalhost:4200")); //=== Cross Domain Setting

app.UseAuthentication();    //=== Keep Authentication on the top
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
	var context = services.GetRequiredService<DataContext>();
	await context.Database.MigrateAsync();
	await Seed.SeedUser(context);

}
catch (Exception ex)
{
	var logger = services.GetRequiredService<ILogger<Program>>();
	logger.LogError(ex, "An error occured during migration");
}

app.Run();
