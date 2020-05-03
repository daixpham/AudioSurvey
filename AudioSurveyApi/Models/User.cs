using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections;
namespace AudioSurveyApi.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string Username { get; set; }
        public string Password { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string[] Surveys { get; set; }
    }
}