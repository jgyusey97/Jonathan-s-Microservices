﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace Servicios.api.Gateway
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

            //services.AddControllers();

            services.AddOcelot();

            //Esta es la linea de codigo para realizar la validacion por medio de bearearToken
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("bkwPl}4F2N6L!OuJt&vo8Q)bl<|N_Z"));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
            {

                opt.TokenValidationParameters = new TokenValidationParameters
                {

                    ValidateIssuerSigningKey = true,  //El toke debe de estar validado con la clave que fue creada
                    IssuerSigningKey = key,
                    ValidateAudience = false, //Cualquier cliente puede acceder a los recursos de mi aplicacion
                    ValidateIssuer = false //Validar desde que dominio se esta en enviando el token
                };


            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsRule", rule =>
                {
                    rule.AllowAnyHeader().AllowAnyMethod().WithOrigins("*"); //Cualquier cabecera, cualquier metodo, desde cualquier origen
                });
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public async void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
             
            }

            app.UseRouting();
            app.UseCors("CorsRule");  //Agregamos la nueva regla en los CORS
            app.UseAuthentication(); //Para realizar la autenticacion

            app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            await app.UseOcelot();
        }
    }
}

