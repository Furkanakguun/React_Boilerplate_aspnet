using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using StudentInformation.Authorization;

namespace StudentInformation
{
    [DependsOn(
        typeof(StudentInformationCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class StudentInformationApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<StudentInformationAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(StudentInformationApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
