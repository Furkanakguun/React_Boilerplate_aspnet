using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using StudentInformation.Core.Entities;

namespace StudentInformation.Application.Students.Dto
{
    [AutoMapFrom(typeof(Student))]
    public class StudentDto :  EntityDto 
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        // [Required]
        // [MaxLength(StudentInformation.Core.Entities.Student.MaxLength)]
        public string Department { get; set; }
    }
}