using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AudioSurveyApi.Models
{
    public class Answer
    {
        

        public string AnswerText { get; set; }

        public int Checked { get; set; }

      
    }
}