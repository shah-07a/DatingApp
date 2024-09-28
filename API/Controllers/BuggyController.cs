using API.Data;
using API.Entities;
using API.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class BuggyController(DataContext dataContext) : ControllerBase
    {
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetAuth()
        {
            return "Secret Text";
        }
        [HttpGet("not-found")]
        public ActionResult<AppUsers> GetNotFound()
        {
            try
            {
                var things = dataContext.Users.Find(-1);

                if (things == null) return NotFound();

                return things;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }            

        }

        [HttpGet("server-error")]
        public ActionResult<AppUsers> GetServerError()
        {            
                var things = dataContext.Users.Find(-1) ?? throw new Exception("A bad thing has happened.");
                return things;           
            
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequesst()
        {
            try
            {
                return BadRequest("A bad request has happened.");
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            

        }
                        
    }
}
