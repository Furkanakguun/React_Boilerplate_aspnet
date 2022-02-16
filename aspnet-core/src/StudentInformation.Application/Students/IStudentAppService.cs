using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using StudentInformation.Application.Students.Dto;
using StudentInformation.Core.Entities;

namespace StudentInformation.Application.Students
{
    public interface IStudentAppService : IApplicationService //IApplicationService provides api in the swagger because ofthis we dont need controller
    {
        Task<ListResultDto<StudentDto>> GetAll();
        
        void CreateStudent(CreateStudentDto input);

        Student UpdateStudent(UpdateStudentDto input);
        
    }
}