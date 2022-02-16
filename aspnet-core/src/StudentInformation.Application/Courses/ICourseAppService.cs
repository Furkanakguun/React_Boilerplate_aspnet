using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using StudentInformation.Application.Courses.Dto;
using StudentInformation.Core.Entities;



namespace StudentInformation.Application.Courses
{
    public interface ICourseAppService : IAsyncCrudAppService<CourseDto,int,GetCoursesInput,CreateCourseDto,UpdateCourseInput>
    {
       PagedResultDto<CourseDto> GetAllList(PagedCourseResultRequestDto input);
    }
}