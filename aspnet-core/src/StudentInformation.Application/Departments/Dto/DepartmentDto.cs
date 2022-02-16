using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.Collections.Generic;
using StudentInformation.Core.Entities;

namespace StudentInformation.Application.Departments.Dto
{
    [AutoMapFrom(typeof(Department))]
    public class DepartmentDto :  AuditedEntityDto
    {
        public string Name { get; set; }
   
        public DateTime CreationTime { get; set;}

         public List<Course> Courses {get; set;} = new List<Course>();
    }
}