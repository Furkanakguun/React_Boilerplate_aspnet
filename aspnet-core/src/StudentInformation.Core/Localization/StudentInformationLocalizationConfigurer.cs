using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace StudentInformation.Localization
{
    public static class StudentInformationLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(StudentInformationConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(StudentInformationLocalizationConfigurer).GetAssembly(),
                        "StudentInformation.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
