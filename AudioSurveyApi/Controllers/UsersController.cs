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

            return userId;
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
        

        [HttpPut("{id:length(24)}/{surveyname:length(24)}")]
        public IActionResult UpdateSurvey(string id, object surveyIn)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.UpdateSurvey(id, surveyIn);

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