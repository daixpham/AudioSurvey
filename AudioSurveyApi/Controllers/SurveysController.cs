using AudioSurveyApi.Models;
using AudioSurveyApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
namespace AudioSurveyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveysController : ControllerBase
    {
        private readonly SurveysServices _surveyService;

        public SurveysController(SurveysServices surveyService)
        {
            _surveyService = surveyService;
        }

        [HttpGet]

        public ActionResult<List<Survey>> Get() =>
            _surveyService.Get();

        [HttpGet("{id:length(24)}", Name = "GetSurvey")]
        public ActionResult<Survey> Get(string id)
        {
            var survey = _surveyService.Get(id);

            if (survey == null)
            {
                return NotFound();
            }

            return survey;
        }

        [HttpPost]
        public async Task<ActionResult<Survey>> Create(Survey survey)
        {
            
           await _surveyService.Create(survey);
            
            return CreatedAtRoute("GetSurvey", new { id = survey.Id }, survey);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Survey surveyIn)
        {
            var survey = _surveyService.Get(id);

            if (survey == null)
            {
                return NotFound();
            }

            _surveyService.Update(id, surveyIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var survey = _surveyService.Get(id);

            if (survey == null)
            {
                return NotFound();
            }

            _surveyService.Remove(survey.Id);

            return NoContent();
        }
    }
}