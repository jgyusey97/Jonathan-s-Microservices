using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Servicios.api.Seguridad.Core.Application;
using Servicios.api.Seguridad.Core.Entities;
using Servicios.api.Seguridad.Core.Persistence;

namespace Servicios.api.Seguridad
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
            services.AddDbContext<SeguridadContexto>(opt =>
            {
                opt.UseSqlServer(Configuration.GetConnectionString("ConexionDB"));  //Inyectamos la cadena de conexion
            }) ;


            var builder = services.AddIdentityCore<Usuario>();  //Se encarga de seguridad

            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);  //Persistencia de la base de datos

            identityBuilder.AddEntityFrameworkStores<SeguridadContexto>();
            identityBuilder.AddSignInManager<SignInManager<Usuario>>();

            //Cada vez que se registra un usuario se debe de registrar la fecha y hora

            services.TryAddSingleton<ISystemClock, SystemClock>();

            services.AddMediatR(typeof(Register.UsuarioRegisterCommand).Assembly);  //Buscara las instancias de las clases CQRS patron


            services.AddAutoMapper(typeof(Register.UsuarioRegisterHandler));  //Estamos realizando la inyeccion del automapper en la clase

            services.AddControllers().AddFluentValidation(x => x.RegisterValidatorsFromAssemblyContaining<Register>()) ;  //Utilizamos la FluentValidation en el register

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
           

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

