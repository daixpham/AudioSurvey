using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AudioSurveyApi.Models
{
    public class SurveyResult
    {


        public string SurveyName { get; set; }

        public Result[] Results  { get; set; }


    }
}