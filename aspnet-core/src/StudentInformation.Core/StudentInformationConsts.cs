using StudentInformation.Debugging;

namespace StudentInformation
{
    public class StudentInformationConsts
    {
        public const string LocalizationSourceName = "StudentInformation";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "4ccceeec236e4ff68eb27fd2400afbb7";
    }
}
