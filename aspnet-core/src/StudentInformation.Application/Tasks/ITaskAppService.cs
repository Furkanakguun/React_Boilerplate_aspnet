using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using StudentInformation.Application.Tasks.Dto;
using Microsoft.EntityFrameworkCore;
using Abp.Application.Services;

namespace StudentInformation.Application.Tasks
{
    public interface ITaskAppService : IApplicationService
{
    Task<ListResultDto<TaskListDto>> GetAll();
}
}