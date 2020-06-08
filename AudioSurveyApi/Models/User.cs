using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections;
using System.Collections.Generic;
namespace AudioSurveyApi.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string Username { get; set; }
        [BsonElement("Password")]
        public string Password { get; set; }

        public string authToken { get; set; }
        public Survey[] Surveys { get; set; }
    }
}