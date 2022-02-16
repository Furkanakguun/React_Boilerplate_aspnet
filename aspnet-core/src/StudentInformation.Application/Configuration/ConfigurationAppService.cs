using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using StudentInformation.Configuration.Dto;

namespace StudentInformation.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : StudentInformationAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
