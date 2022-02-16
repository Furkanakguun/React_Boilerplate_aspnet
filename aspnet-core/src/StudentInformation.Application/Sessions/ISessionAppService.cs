using System.Threading.Tasks;
using Abp.Application.Services;
using StudentInformation.Sessions.Dto;

namespace StudentInformation.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
