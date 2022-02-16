using Abp.Authorization;
using StudentInformation.Authorization.Roles;
using StudentInformation.Authorization.Users;

namespace StudentInformation.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
