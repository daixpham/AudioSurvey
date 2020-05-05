using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AudioSurveyApi.Models
{
    public class Question
    {
        

        public string QuestionText { get; set; }

        public Audio[] Audios { get; set; }

      
    }
}