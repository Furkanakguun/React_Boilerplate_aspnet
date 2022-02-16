using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Timing;


namespace StudentInformation.Core.Entities
{
    public class Course : Entity , IAudited
    {
       public const int MaxLength = 200;
       public const int MaxCapacity = 100;
       [Required]
       [MaxLength(Course.MaxLength)]
        public string Name { get; set; }
        [Required]
        [MaxLength(Course.MaxCapacity)]
        public int Capacity { get; set; }
        public string DepartmentName { get; set; }
        public int DepartmentId { get; set; }   
        public Department Department { get; set; }
        public long? CreatorUserId{get; set;}
        public DateTime CreationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }

    }
}