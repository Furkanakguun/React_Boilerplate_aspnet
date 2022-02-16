using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using StudentInformation.Core.Entities;

namespace StudentInformation.Application.Courses.Dto
{
    [AutoMapTo(typeof(Course))]
    public class UpdateCourseInput : CreateCourseInput, IEntityDto 
    {
         [Range(1, int.MaxValue)]
        public int Id { get; set; }
    }
}