using System.Threading.Tasks;
using StudentInformation.Models.TokenAuth;
using StudentInformation.Web.Controllers;
using Shouldly;
using Xunit;

namespace StudentInformation.Web.Tests.Controllers
{
    public class HomeController_Tests: StudentInformationWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}