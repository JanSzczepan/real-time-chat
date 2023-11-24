var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

builder
    .Services
    .AddCors(options =>
    {
        options.AddDefaultPolicy(corsPolicyBuilder =>
        {
            corsPolicyBuilder
                .WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
    });

builder
    .Services
    .AddSingleton<IDictionary<string, UserConnection>>(
        opts => new Dictionary<string, UserConnection>()
    );

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors();

app.UseAuthorization();

app.MapHub<ChatHub>("/chat");

app.MapGet("/", () => "Hello World!");

app.Run();
