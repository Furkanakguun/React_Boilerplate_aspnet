using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using StudentInformation.Core.Entities;

namespace StudentInformation.Application.Departments.Dto
{
    [AutoMapTo(typeof(Department))]
    public class UpdateDepartmentInput :  EntityDto 
    {
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
    }
}