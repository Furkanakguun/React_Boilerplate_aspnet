using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using StudentInformation.Application.Students.Dto;
using StudentInformation.Core.Entities;



namespace StudentInformation.Application.Students
{
    public interface IStudentAppAsyncService : IAsyncCrudAppService<StudentDto>
    {
       
    }
}