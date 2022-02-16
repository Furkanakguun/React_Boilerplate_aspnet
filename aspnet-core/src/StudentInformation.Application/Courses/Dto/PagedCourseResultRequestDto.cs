using Abp.Application.Services.Dto;

namespace  StudentInformation.Application.Courses.Dto
{
    public class PagedCourseResultRequestDto : PagedAndSortedResultRequestDto
    {
         public string Keyword { get; set; }
         public string Direction { get; set; }
    }
}

