using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace StudentInformation.Controllers
{
    public abstract class StudentInformationControllerBase: AbpController
    {
        protected StudentInformationControllerBase()
        {
            LocalizationSourceName = StudentInformationConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
