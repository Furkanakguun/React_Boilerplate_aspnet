using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using StudentInformation.Authorization.Users;
using StudentInformation.Core.Entities;
using Abp.Domain.Entities.Auditing;

namespace StudentInformation.Application.Tasks.Dto
{
    
    //TaskListDto is used to return a Task data.
    //We defined [AutoMapFrom] attribute to create AutoMapper mapping from Task entity to TaskListDto. This attribute is defined in Abp.AutoMapper nuget package.
    
    [AutoMapFrom(typeof(Task))]
    public class TaskListDto : EntityDto, IHasCreationTime
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreationTime { get; set; }

        public TaskState State { get; set; }
    }
}