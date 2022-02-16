using Abp.Application.Services.Dto;
using System;
using StudentInformation.Core.Entities;

namespace StudentInformation.Application.Tasks.Dto
{
    public class GetAllTasksInput
{
    public TaskState? State { get; set; }
}
}