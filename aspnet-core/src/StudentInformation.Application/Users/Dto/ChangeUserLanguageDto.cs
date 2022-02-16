using System.ComponentModel.DataAnnotations;

namespace StudentInformation.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}