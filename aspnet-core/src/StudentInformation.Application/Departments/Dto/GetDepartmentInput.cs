using Abp.Application.Services.Dto;
using StudentInformation.Core.Entities;


namespace StudentInformation.Application.Departments.Dto
{
    public class GetDepartmentInput : PagedAndSortedResultRequestDto
    {
        public string Keyword { get; set; }
    
    }
}