using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AudioSurveyApi.Models
{
    public class Survey
    {


        public string Surveyname { get; set; }
        public int interviewed { get; set; }
        public Question[] Questions { get; set; }


    }
}