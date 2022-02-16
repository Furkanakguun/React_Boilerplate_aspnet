using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using StudentInformation.Core.Entities;

namespace StudentInformation.Application.Courses.Dto
{
    [AutoMapFrom(typeof(Course))]
    public class CourseDto :  AuditedEntityDto
    {
        public string Name { get; set; }
        public int Capacity { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public Department Department { get; set; }
        
    }
}