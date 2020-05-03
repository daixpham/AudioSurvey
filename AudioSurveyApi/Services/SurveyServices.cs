using AudioSurveyApi.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
namespace AudioSurveyApi.Services
{
    public class SurveysServices
    {
        private readonly IMongoCollection<Survey> _surveys;
        private readonly IMongoCollection<User> _users;

        public SurveysServices(IAudioSurveyDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _surveys = database.GetCollection<Survey>(settings.SurveysCollectionName);
            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }

        public List<Survey> Get() =>
            _surveys.Find(survey => true).ToList();

        public Survey Get(string id) =>
            _surveys.Find<Survey>(survey => survey.Id == id).FirstOrDefault();

        public async Task<Survey> Create(Survey survey)
        {
            await _surveys.InsertOneAsync(survey);
            var filter = Builders<User>.Filter.Eq("_id", ObjectId.Parse(survey.Owner));
            var update = Builders<User>.Update.Push("Surveys", survey.Id);
            await _users.UpdateOneAsync(filter, update);
            return survey;
        }

        public void Update(string id, Survey surveyIn) =>
            _surveys.ReplaceOne(survey => survey.Id == id, surveyIn);

        public void Remove(Survey surveyIn) =>
            _surveys.DeleteOne(survey => survey.Id == surveyIn.Id);

        public void Remove(string id) =>
            _surveys.DeleteOne(survey => survey.Id == id);
    }
}