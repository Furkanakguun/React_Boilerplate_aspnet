using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using StudentInformation.Application.Tasks.Dto;
using Microsoft.EntityFrameworkCore;
using StudentInformation.Core.Entities;
using Abp.AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using StudentInformation.Application.Tasks.Dto;
using Microsoft.EntityFrameworkCore;

namespace StudentInformation.Application.Tasks
{
   public class TaskAppService  //:ITaskAppService
    {
        private readonly IRepository<StudentInformation.Core.Entities.Task> _taskRepository;

        public TaskAppService(IRepository<StudentInformation.Core.Entities.Task> taskRepository)
        {
            _taskRepository = taskRepository;
        }

        // public async Task<ListResultDto<TaskListDto>> GetAll(GetAllTasksInput input)
        // {
        //     var tasks = await _taskRepository
        //         .GetAll()
        //         .WhereIf(input.State.HasValue, t => t.State == input.State.Value)
        //         .OrderByDescending(t => t.CreationTime)
        //         .ToListAsync();

        //     return new ListResultDto<TaskListDto>(
        //         ObjectMapper.Map<List<TaskListDto>>(tasks)
        //     );
        // }
    }
}