using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Timing;

namespace StudentInformation.Core.Entities
{
   [Table("AppTasks")]
    public class Task : Entity, IHasCreationTime 
    {
        //I derived from ABP's base Entity class, which includes Id property as int by default.
        //We can use the generic version, Entity<TPrimaryKey>, to choice a different PK type
        //IHasCreationTime is a simple interface just defines CreationTime property (it's good to use a standard name for CreationTime).
        public const int MaxTitleLength = 256;
        public const int MaxDescriptionLength = 64 * 1024; //64KB

        [Required]
        [StringLength(MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(MaxDescriptionLength)]
        public string Description { get; set; }

        public DateTime CreationTime { get; set; }

        public TaskState State { get; set; }

        public Task()
        {
            CreationTime = Clock.Now; // Always use Clock.Now instead of DateTime.Now while working with ABP framework
            State = TaskState.Open;
        }

        public Task(string title, string description = null)
            : this()
        {
            Title = title;
            Description = description;
        }
    }
    public enum TaskState : byte
    {
        Open = 0,
        Completed = 1
    }
}