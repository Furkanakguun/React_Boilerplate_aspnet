using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using StudentInformation.Core.Entities;

namespace StudentInformation.Application.Departments.Dto
{
    [AutoMapFrom(typeof(Department))]
    public class GetAllDepartmentInput :  EntityDto 
    {
        public string Name { get; set; }
    }
}