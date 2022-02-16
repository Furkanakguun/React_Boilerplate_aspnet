using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using StudentInformation.Core.Entities;



namespace StudentInformation.Application.Students.Dto
{
    public class UpdateStudentDto
    {
        public int Id { get; set; }

        public string Name { get; set; }      

        public string Surname { get; set; }

        public string Department { get; set; }

    }
}