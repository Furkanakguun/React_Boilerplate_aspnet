using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace StudentInformation.EntityFrameworkCore
{
    public static class StudentInformationDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<StudentInformationDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<StudentInformationDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
