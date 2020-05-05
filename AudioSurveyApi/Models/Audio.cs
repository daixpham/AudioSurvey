using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AudioSurveyApi.Models
{
    public class Audio
    {


        public string Name { get; set; }
        public string Url { get; set; }

        public Answer[] Answers { get; set; }


    }
}