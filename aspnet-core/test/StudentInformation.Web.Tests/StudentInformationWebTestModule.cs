using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using StudentInformation.EntityFrameworkCore;
using StudentInformation.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace StudentInformation.Web.Tests
{
    [DependsOn(
        typeof(StudentInformationWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class StudentInformationWebTestModule : AbpModule
    {
        public StudentInformationWebTestModule(StudentInformationEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(StudentInformationWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(StudentInformationWebMvcModule).Assembly);
        }
    }
}