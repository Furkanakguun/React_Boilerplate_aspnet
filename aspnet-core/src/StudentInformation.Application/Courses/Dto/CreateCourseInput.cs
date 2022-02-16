using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using StudentInformation.Core.Entities;

namespace StudentInformation.Application.Courses.Dto
{
    [AutoMapTo(typeof(Course))]
    public class CreateCourseInput  
    {
       
       
        public string Name { get; set; }
        public int Capacity { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
    }
}