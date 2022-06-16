using System.Text;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Servicios.api.Seguridad.Core.Application;
using Servicios.api.Seguridad.Core.Entities;
using Servicios.api.Seguridad.Core.JwtLogic;
using Servicios.api.Seguridad.Core.Persistence;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;

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
            services.AddControllers().AddFluentValidation(x => x.RegisterValidatorsFromAssemblyContaining<Register>());  //Utilizamos la FluentValidation en el register
            services.AddDbContext<SeguridadContexto>(opt =>
            {
                opt.UseSqlServer(Configuration.GetConnectionString("ConexionDB"));  //Inyectamos la cadena de conexion
            });


            var builder = services.AddIdentityCore<Usuario>();  //Se encarga de seguridad

            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);  //Persistencia de la base de datos

            identityBuilder.AddEntityFrameworkStores<SeguridadContexto>();
            identityBuilder.AddSignInManager<SignInManager<Usuario>>();
            services.TryAddSingleton<ISystemClock, SystemClock>();

            //Cada vez que se registra un usuario se debe de registrar la fecha y hora
            services.AddMediatR(typeof(Register.UsuarioRegisterCommand).Assembly);  //Buscara las instancias de las clases CQRS patron
            services.AddAutoMapper(typeof(Register.UsuarioRegisterHandler));  //Estamos realizando la inyeccion del automapper en la clase


            services.AddScoped<IJwtGenerator, JwtGenerator>();  //Para el uso del json web token

            services.AddScoped<IUsuarioSesion, UsuarioSesion>();

     

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("bkwPl}4F2N6L!OuJt&vo8Q)bl<|N_Z"));

            //Validar que la el token JWT contenga la clave que ha sido asignada

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
            {

                opt.TokenValidationParameters = new TokenValidationParameters
                {

                    ValidateIssuerSigningKey = true,  //El toke debe de estar validado con la clave que fue creada
                    IssuerSigningKey =key,
                    ValidateAudience = false, //Cualquier cliente puede acceder a los recursos de mi aplicacion
                    ValidateIssuer= false //Validar desde que dominio se esta en enviando el token
                };
            

            });

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

