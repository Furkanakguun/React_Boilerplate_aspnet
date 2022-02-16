using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using StudentInformation.Application.Students.Dto;
using Microsoft.EntityFrameworkCore;
using StudentInformation.Core.Entities;
using Abp.Domain.Repositories;
using StudentInformation.Application.Students;
using System.Linq;
using System.Collections.Generic;
using Abp.Domain.Uow;
 

namespace StudentInformation.Application.Students
{
    public class StudentAppAsyncService : AsyncCrudAppService<Student, StudentDto>, IStudentAppAsyncService
    {
  
        public StudentAppAsyncService(IRepository<Student> repository)
        : base(repository)
        {

        }

        
    }
}