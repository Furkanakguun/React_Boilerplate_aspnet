using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using StudentInformation.Authorization.Roles;
using StudentInformation.Authorization.Users;
using StudentInformation.MultiTenancy;
using StudentInformation.Core.Entities;
namespace StudentInformation.EntityFrameworkCore
{
    public class StudentInformationDbContext : AbpZeroDbContext<Tenant, Role, User, StudentInformationDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
         public DbSet<Department> Departments { get; set; }
        public StudentInformationDbContext(DbContextOptions<StudentInformationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Course>()
            .HasOne(u => u.Department)
            .WithMany(a => a.Courses)
            .HasForeignKey(c => c.DepartmentId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
