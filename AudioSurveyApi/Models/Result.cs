using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AudioSurveyApi.Models
{
    public class Result
    {


        public string AudioName { get; set; }

        public string Answer { get; set; }


    }
}