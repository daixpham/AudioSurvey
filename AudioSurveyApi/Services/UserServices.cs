using AudioSurveyApi.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using System;
using MongoDB.Bson.Serialization;
using Newtonsoft.Json;
namespace AudioSurveyApi.Services
{
    public class UserServices
    {
        private readonly IMongoCollection<User> _users;

        public UserServices(IAudioSurveyDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }

        public List<User> Get() =>
            _users.Find(user => true).ToList();

        public User Get(string id)
        {
           
            var result = _users.Find<User>(user => user.Id == id).FirstOrDefault();
            var test = BsonSerializer.Deserialize<BsonDocument>(result.ToJson());
            Console.WriteLine("YOO"+test);
           // https://stackoverflow.com/questions/9478613/how-to-deserialize-a-bsondocument-object-back-to-class/9479341
            return (User)test;
        }

        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }

        public void UpdateUserSurvey(string id, object surveyIn)
        {
            // var jsonWriterSettings = new JsonWriterSettings { OutputMode = JsonOutputMode.Strict };
            // JObject json = JObject.Parse(postBsonDoc.ToJson<MongoDB.Bson.BsonDocument>(jsonWriterSettings));
            //var survey = surveyIn.ToString();
            var survey = BsonDocument.Parse(surveyIn.ToString());
            // var survey = JsonConvert.DeserializeObject<BsonDocument>(surveyIn);
            //Console.WriteLine("User Id " + id);
            //Console.WriteLine("UserSurvey " + surveyIn);
            Console.WriteLine(survey);
            var filter = Builders<User>.Filter.Eq("_id", ObjectId.Parse(id));
            var update = Builders<User>.Update.Push("Surveys", survey);
            _users.UpdateOneAsync(filter, update);
        }
        public void Update(string id, User userIn) =>
            _users.ReplaceOne(user => user.Id == id, userIn);

        public void Remove(User userIn) =>
            _users.DeleteOne(user => user.Id == userIn.Id);

        public void Remove(string id) =>
            _users.DeleteOne(user => user.Id == id);
    }
}