using System.Threading.Tasks;
using StudentInformation.Configuration.Dto;

namespace StudentInformation.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
