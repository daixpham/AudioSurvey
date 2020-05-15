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

        public String GetUserAuthStatus(User userIn)
        {
            string userId = "";
            var builder = Builders<User>.Filter;
            var nameFilter = builder.Eq("Name", userIn.Username);
            var passwordFilter = builder.Eq("Password", userIn.Password);
            var combineFilter = builder.And(nameFilter, passwordFilter);
            var user = _users.Find(combineFilter).FirstOrDefault();
            if (user.ToJson() != "null")
            {
                userId = user.Id;
            }
            Console.WriteLine("result " + userId);
            return userId;
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

        public void UpdateSurvey(string id, SurveyResult surveyResultIn)
        {
            var builder = Builders<User>.Filter;
            var idFilter = builder.Eq("_id", ObjectId.Parse(id));
            var surveyNameFilter = builder.Eq("Surveys.Surveyname", surveyResultIn.SurveyName);
            var combineFilter = builder.And(idFilter, surveyNameFilter);
            var update = Builders<User>.Update.Inc("Surveys.interviewed", 1);
            _users.UpdateOneAsync(combineFilter, update);
            
            
        }

        public void Remove(User userIn) =>
            _users.DeleteOne(user => user.Id == userIn.Id);

        public void Remove(string id) =>
            _users.DeleteOne(user => user.Id == id);
    }
}