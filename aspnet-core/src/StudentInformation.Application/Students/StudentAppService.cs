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
    //Repositories, in practice, are used to perform database operations for domain objects
    //(Entity and Value types). Generally, a separate repository is used for each Entity (or Aggregate Root).
    //You can directly inject IRepository<TEntity> (or IRepository<TEntity, TPrimaryKey>). 
    public class StudentAppService : StudentInformationAppServiceBase , IStudentAppService 
    {
        private readonly IRepository<Student> _studentRepository;

        public StudentAppService(IRepository<Student> studentRepository){
            
            _studentRepository = studentRepository;
        }

        public async Task<ListResultDto<StudentDto>> GetAll(){

            var data = await _studentRepository.GetAll().ToListAsync();

            return new ListResultDto<StudentDto>(
                ObjectMapper.Map<List<StudentDto>>(data)
                
            );
        }
        public void CreateStudent(CreateStudentDto input)
        {        
            var student = new Student { Name = input.Name, Surname = input.Surname , Department = input.Department };
            _studentRepository.Insert(student);
           
        }
        [UnitOfWork]
        public Student UpdateStudent(UpdateStudentDto input){
            
            Student studentToUpdate = _studentRepository.Get(input.Id);
            studentToUpdate.Name = input.Name;
            studentToUpdate.Surname = input.Surname;
            studentToUpdate.Department = input.Department;
            //var updatedStudent = new Student { Name = input.Name , Surname = input.Surname , Department = input.Department ,CreatorUserId = studentToUpdate.CreatorUserId , CreationTime = studentToUpdate.CreationTime};
            //_studentRepository.Update(studentToUpdate);
             return studentToUpdate;

        }

        public Student Get(StudentDto input)
        {
            return _studentRepository.FirstOrDefault(m => m.Id == input.Id);
        }

        public void Delete(StudentDto input){
             Student studentToDelete = _studentRepository.FirstOrDefault(m => m.Id == input.Id);
            _studentRepository.Delete(studentToDelete);
        }
        
    }
}