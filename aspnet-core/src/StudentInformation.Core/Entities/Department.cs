using System;
using System.ComponentModel.DataAnnotations;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.Collections.Generic;

namespace StudentInformation.Core.Entities
{
    public class Department : Entity , IAudited
    {
       public const int MaxLength = 200;
       public const int MaxCapacity = 100;
       [Required]
       [MaxLength(Department.MaxLength)]
        public string Name { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
        public long? CreatorUserId{get; set;}   
        public DateTime CreationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }

    }
}