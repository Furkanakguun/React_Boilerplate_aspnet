using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using StudentInformation.Configuration;

namespace StudentInformation.Web.Host.Startup
{
    [DependsOn(
       typeof(StudentInformationWebCoreModule))]
    public class StudentInformationWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public StudentInformationWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(StudentInformationWebHostModule).GetAssembly());
        }
    }
}
