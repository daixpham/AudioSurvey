using AudioSurveyApi.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using System;
using MongoDB.Bson.Serialization;
using Newtonsoft.Json;
using System.Threading.Tasks;
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
            return result;
        }

        public Boolean GetUserAuth(User user)
        {
            Boolean result = false;
            var builder = Builders<User>.Filter;
            var filter = builder.Eq("Password", user.Password);
            var getUser =  _users.Find(filter).FirstOrDefault();
            if(getUser.ToJson() != null){
                result = true;
            }
            Console.WriteLine("result " + result.ToJson());
            return result;
        }

        public User Create(User user)
        {
            Console.WriteLine("Insert " + user.ToJson());
            _users.InsertOne(user);
            return user;
        }

        public void UpdateUserSurvey(string id, Survey surveyIn)
        {
            var filter = Builders<User>.Filter.Eq("_id", ObjectId.Parse(id));
            var update = Builders<User>.Update.Push("Surveys", surveyIn);
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