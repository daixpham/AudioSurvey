namespace AudioSurveyApi.Models
{
    public class AudioSurveyDatabaseSettings : IAudioSurveyDatabaseSettings
    {
        public string UsersCollectionName { get; set; }
        public string SurveysCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IAudioSurveyDatabaseSettings
    {
        string UsersCollectionName { get; set; }
        string SurveysCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}