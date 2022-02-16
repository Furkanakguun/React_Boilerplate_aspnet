using Abp.Application.Services.Dto;
using StudentInformation.Core.Entities;


namespace StudentInformation.Application.Courses.Dto
{
    public class GetCoursesInput : PagedAndSortedResultRequestDto
    {
        public string Keyword { get; set; }
 
    }
}