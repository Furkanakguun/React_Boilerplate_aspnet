using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using StudentInformation.Application.Departments.Dto;
using Microsoft.EntityFrameworkCore;
using StudentInformation.Core.Entities;
using Abp.Domain.Repositories;
using StudentInformation.Application.Departments;
using System.Linq;
using System.Collections.Generic;
using Abp.Domain.Uow;

namespace StudentInformation.Application.Departments
{
    public class DepartmentAppService : StudentInformationCrudAppServiceBase<Department, DepartmentDto, int, GetDepartmentInput, CreateDepartmentDto, UpdateDepartmentInput>, IDepartmentAppService
    {
  
        public DepartmentAppService(IRepository<Department> repository)
        : base(repository)
        {

        }

       
    
        public async Task<DepartmentDto> CreateAndGetObj(CreateDepartmentDto input)
        {
            var record = await base.CreateAsync(input);
            return record;
        }

        public Task<List<DepartmentDto>> GetByName()
        {
            throw new System.NotImplementedException();
        }

        public List<DepartmentDto> GetList()
        {
             var list = base.Repository.GetAll();
             
            var res = list.OrderBy(x => x.Name);
            return new List<DepartmentDto>(ObjectMapper.Map<List<DepartmentDto>>(res));
        }

        public Department GetObj(int Id)
        {
            throw new System.NotImplementedException();
        }
        
    }
}