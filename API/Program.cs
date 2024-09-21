using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddAppServices(builder.Configuration); //=== Added an extension method
builder.Services.AddIdentityServices(builder.Configuration); //=== Added an extension method

var app = builder.Build();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200","https://loacalhost:4200")); //=== Cross Domain Setting

app.UseAuthentication();    //=== Keep Authentication on the top
app.UseAuthorization();

app.MapControllers();

app.Run();
