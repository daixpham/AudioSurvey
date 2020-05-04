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
        //todo : when call methode get -> return objectType (object) , when call methode Set -> return objectType(BsonDocument)
        public BsonDocument[] Surveys { get; set; }
    }
}