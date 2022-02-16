using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using StudentInformation.Application.Departments.Dto;
using StudentInformation.Core.Entities;



namespace StudentInformation.Application.Departments
{
    public interface IDepartmentAppService : IAsyncCrudAppService<DepartmentDto, int, GetDepartmentInput, CreateDepartmentDto, UpdateDepartmentInput>
    {
       
    }
}