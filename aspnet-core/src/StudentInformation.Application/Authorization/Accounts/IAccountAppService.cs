using System.Threading.Tasks;
using Abp.Application.Services;
using StudentInformation.Authorization.Accounts.Dto;

namespace StudentInformation.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
