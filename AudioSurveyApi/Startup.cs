using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using AudioSurveyApi.Models;
using Microsoft.Extensions.Options;
using AudioSurveyApi.Services;
using Microsoft.AspNetCore.Mvc.Cors;
namespace AudioSurveyApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowMyOrigin", builder => builder.WithOrigins("http://localhost:3000"));
            });
            // services.AddMvc(options => options.EnableEndpointRouting = false);

            services.Configure<AudioSurveyDatabaseSettings>(
                Configuration.GetSection(nameof(AudioSurveyDatabaseSettings)));

            services.AddSingleton<IAudioSurveyDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<AudioSurveyDatabaseSettings>>().Value);
            services.AddSingleton<UserServices>();
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipelin
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseHttpsRedirection();

            // to allow send Headers to Webservices !important 
            app.UseCors(options => options.WithOrigins("http://localhost:3000").AllowAnyMethod().WithOrigins("http://localhost:3000").AllowAnyHeader());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
