using AudioSurveyApi.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
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
            string savedPasswordHash = "";
            Console.WriteLine("Insert " + userIn.Password);


            var builder = Builders<User>.Filter;
            var nameFilter = builder.Eq("Name", userIn.Username);
            var user = _users.Find(nameFilter).FirstOrDefault();
            if (user == null)
            {
                return userId;
            }
            savedPasswordHash = user.Password;
            byte[] hashBytes = Convert.FromBase64String(savedPasswordHash);
            byte[] salt = new byte[128 / 8];
            Array.Copy(hashBytes, 0, salt, 0, 16);
            var pbkdf2 = new Rfc2898DeriveBytes(userIn.Password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);

            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                {
                    return userId;
                }
            }

            if (user.ToJson() != "null")
            {
                userId = user.Id;
            }
            return userId;
        }

        public User Create(User user)
        {
            Console.WriteLine("Insert " + user.Password);
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            var pbkdf2 = new Rfc2898DeriveBytes(user.Password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);

            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);


            user.Password = Convert.ToBase64String(hashBytes);
            Console.WriteLine("Hash: " + user.Password);
            _users.InsertOne(user);
            return user;
        }

        public void UpdateUserSurvey(string id, Survey surveyIn)
        {
            var filter = Builders<User>.Filter.Eq("_id", ObjectId.Parse(id));
            var update = Builders<User>.Update.Push("Surveys", surveyIn);
            _users.UpdateOneAsync(filter, update);
        }

        public void UpdateSurveyResult(string id, SurveyResult surveyResultIn)
        {
            var builder = Builders<User>.Filter;
            var idFilter = builder.Eq("_id", ObjectId.Parse(id));
            var surveyNameFilter = builder.Eq("Surveys.Surveyname", surveyResultIn.SurveyName);
            var combineFilter = builder.And(idFilter, surveyNameFilter);
            var update = Builders<User>.Update.Inc("Surveys.$.interviewed", 1);
            _users.UpdateOne(combineFilter, update);
            var user = _users.Find(combineFilter).FirstOrDefault();

            // O(r*s*q*a*an) very bad 

            for (int r = 0; r < surveyResultIn.Results.Length; r++)
            {
                for (int s = 0; s < user.Surveys.Length; s++)
                {
                    if (user.Surveys[s].Surveyname == surveyResultIn.SurveyName)
                    {
                        for (int q = 0; q < user.Surveys[s].Questions.Length; q++)
                        {
                            for (int a = 0; a < user.Surveys[s].Questions[q].Audios.Length; a++)
                            {
                                if (user.Surveys[s].Questions[q].Audios[a].Name == surveyResultIn.Results[r].AudioName)
                                {
                                    for (int an = 0; an < user.Surveys[s].Questions[q].Audios[a].Answers.Length; an++)
                                    {
                                        if (user.Surveys[s].Questions[q].Audios[a].Answers[an].AnswerText == surveyResultIn.Results[r].Answer)
                                        {
                                            update = Builders<User>.Update.Inc("Surveys." + s + ".Questions." + q + ".Audios." + a + ".Answers." + an + ".Checked", 1);
                                            _users.UpdateOne(combineFilter, update);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }

        public void Remove(User userIn) =>
            _users.DeleteOne(user => user.Id == userIn.Id);

        public void Remove(string id) =>
            _users.DeleteOne(user => user.Id == id);
    }
}