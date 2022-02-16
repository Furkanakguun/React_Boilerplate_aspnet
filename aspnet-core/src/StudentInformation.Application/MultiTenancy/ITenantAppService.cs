using Abp.Application.Services;
using StudentInformation.MultiTenancy.Dto;

namespace StudentInformation.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

