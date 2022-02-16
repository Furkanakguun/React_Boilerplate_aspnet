using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using StudentInformation.MultiTenancy;

namespace StudentInformation.Sessions.Dto
{
    [AutoMapFrom(typeof(Tenant))]
    public class TenantLoginInfoDto : EntityDto
    {
        public string TenancyName { get; set; }

        public string Name { get; set; }
    }
}
