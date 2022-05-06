using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Servicios.api.Libreria.Core;
using Servicios.api.Libreria.Core.ContextMongoDB;
using Servicios.api.Libreria.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Servicios.api.Libreria
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


            services.Configure<MongoSettings>(  //Asignamos los valores a nuestras propiedades
                  options=>
                  {
                      options.ConnectionString = Configuration.GetSection("MongoDB:ConnectionString").Value;
                      options.ConnectionString = Configuration.GetSection("MongoDB:Database").Value;

                  }
                );

            services.AddSingleton <MongoSettings>();  //Creamos un Singleton de las configuraciones para la conexión

            services.AddTransient<IAutorContext, AutorContext>();  // AddTransiet es para que cree instancias de cada metodo individual que se va ejecutando (Cada vez que un cliente crea un api , se crea por cada transaccion)
            services.AddTransient<IAutorRepository, AutorRepository>();  //Agregamos nuestro repositorio de la clase autor
            


            services.AddControllers();

            services.AddSwaggerGen(c=> {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Servicios.api.Libreria", Version = "v1" });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseSwagger();
            
        }
    }
}
