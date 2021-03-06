using AudioSurveyApi.Models;
using AudioSurveyApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;

using MongoDB.Bson;
using Newtonsoft.Json;
namespace AudioSurveyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserServices _userService;

        public UsersController(UserServices userService)
        {
            _userService = userService;
        }

        [HttpGet]

        public ActionResult<List<User>> Get() =>
            _userService.Get();

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public ActionResult<User> Get(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            user.Password = "stay secret";

            return user;
        }

        [HttpPost("auth", Name = "GetUserAuth")]
        public ActionResult<String> UserAuth(User user)
        {
            var userId = _userService.GetUserAuthStatus(user);
            if (userId == null)
            {
                return NotFound();
            }
            return userId;
        }

        [HttpGet("authToken/{id:length(24)}", Name = "GetUserAuthToken")]
        public ActionResult<String> UserAuthToken(string id)
        {
            string authToken = "";
            authToken = _userService.GetUserAuthToken(id);
            return authToken;
        }

        [HttpPost]
        public ActionResult<User> Create(User user)
        {

            _userService.Create(user);
            return CreatedAtRoute("GetUser", new { id = user.Id }, user);
        }

        [HttpPut("{id:length(24)}/surveyUpdate")]
        public IActionResult UpdateUserSurvey(string id, Survey surveyIn)
        {

            var user = _userService.Get(id);
            if (user == null)
            {
                return NotFound();
            }
            _userService.UpdateUserSurvey(id, surveyIn);

            return NoContent();
        }


        [HttpPut("{id:length(24)}/surveyResultUpdate")]
        public IActionResult UpdateSurvey(string id, SurveyResult surveyResultIn)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.UpdateSurveyResult(id, surveyResultIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.Remove(user.Id);

            return NoContent();
        }
    }
}