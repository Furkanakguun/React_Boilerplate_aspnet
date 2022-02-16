using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using StudentInformation.Application.Courses.Dto;
using Microsoft.EntityFrameworkCore;
using StudentInformation.Core.Entities;
using Abp.Domain.Repositories;
using StudentInformation.Application.Courses;
using System.Linq;
using System.Collections.Generic;
using Abp.Domain.Uow;
using Abp.Collections.Extensions;

namespace StudentInformation.Application.Courses
{
    public class CourseAppService : StudentInformationCrudAppServiceBase<Course, CourseDto, int, GetCoursesInput, CreateCourseDto, UpdateCourseInput>, ICourseAppService
    {

        public CourseAppService(IRepository<Course> repository)
        : base(repository)
        {

        }

        public async Task<CourseDto> CreateAndGetObj(CreateCourseDto input)
        {
            var record = await base.CreateAsync(input);
            return record;
        }

        public Task<List<CourseDto>> GetByName()
        {
            throw new System.NotImplementedException();
        }

        public PagedResultDto<CourseDto> GetAllList(PagedCourseResultRequestDto input)
        {
            var query = base.Repository.GetAll()
            .Include(w=> w.Department)
            .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword), c => (c.Name.ToLower().Contains(input.Keyword.ToLower())));

            var itemCount = query.Count();
            query = query.AsQueryable().OrderBy(input.Sorting, input.Direction).Skip(input.SkipCount).Take(input.MaxResultCount);
            var items = query.ToList();

            return new PagedResultDto<CourseDto>
            {
                TotalCount = itemCount,
                Items = ObjectMapper.Map<List<CourseDto>>(items)
            };
        }


        public async Task<ListResultDto<CourseDto>> GetList(PagedCourseResultRequestDto input)
        {
            var list = base.Repository.GetAll().Include(c => c.Department)
            .WhereIf(!string.IsNullOrWhiteSpace(input.Keyword), c => (c.Name.ToLower().Contains(input.Keyword.ToLower())) || (c.Department.Name.ToLower().Contains(input.Keyword.ToLower())));
            //list = list.Select(s => s.Id && s.Name && s.Capacity && s.DepartmentId && s.DepartmentName)
            var courseDtoList = list.Select(course => new CourseDto { Id = course.Id, Name = course.Name, Capacity = course.Capacity, DepartmentId = course.DepartmentId, DepartmentName = course.Department.Name });
            // var res = list.OrderBy(x => x.Name);
            // var mapList = new List<CourseDto>(ObjectMapper.Map<List<CourseDto>>(res));
            // return mapList ;
            
            return new ListResultDto<CourseDto>(    

               ObjectMapper.Map<List<CourseDto>>(courseDtoList)

           );
        }

        public Department GetObj(int Id)
        {
            throw new System.NotImplementedException();
        }



    }
}