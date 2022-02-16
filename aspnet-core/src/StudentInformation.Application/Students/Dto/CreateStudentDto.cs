using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using StudentInformation.Core.Entities;



namespace StudentInformation.Application.Students.Dto
{
    public class CreateStudentDto
    {
        [Required]
        [MaxLength(StudentInformation.Core.Entities.Student.MaxLength)]
        public string Name { get; set; }
        [Required]
        [MaxLength(StudentInformation.Core.Entities.Student.MaxLength)]
        public string Surname { get; set; }
        [Required]
        [MaxLength(StudentInformation.Core.Entities.Student.MaxLength)]
        public string Department { get; set; }
    }
}