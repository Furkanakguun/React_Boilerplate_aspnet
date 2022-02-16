using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Timing;


namespace StudentInformation.Core.Entities
{
    public class Student : Entity , IAudited
    {
       public const int MaxLength = 200;
       [Required]
       [MaxLength(Student.MaxLength)]
        public string Name { get; set; }
        [Required]
        [MaxLength(Student.MaxLength)]
        public string Surname { get; set; }
        public string Department { get; set; }
        public long? CreatorUserId{get; set;}   
        public DateTime CreationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }

        //  public Student(String name, String surname)
        // {
        //     this.Name = name;
        //     this.Surname = surname;

        // }

    }
}