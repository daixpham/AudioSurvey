using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AudioSurveyApi.Models
{
    public class Survey
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string Surveyname { get; set; }

        public string Question { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string Owner { get; set; }
    }
}