using Microsoft.AspNet.Identity.Owin;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using AspMVC.NG.Routing.Models;
using System.Linq;

namespace AspMVC.NG.Routing.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        // call a login page
        [AllowAnonymous]
        public ActionResult LoginPage()
        {
            return View();
        }

        // call a register page
        [AllowAnonymous]
        public ActionResult RegisterPage()
        {
            return View();
        }

        // process registration 
        [AllowAnonymous]
        public string RegisterUser(string uta_id
                                , string email
                                , string password
                                , string first_name
                                , string last_name)
        {
            user userTable = new user();
            userTable.uta_id = uta_id.Substring(1, uta_id.Length - 2);
            userTable.email = email.Substring(1, email.Length - 2);
            userTable.password = password.Substring(1, password.Length - 2);
            userTable.first_name = first_name.Substring(1, first_name.Length - 2);
            userTable.last_name = last_name.Substring(1, last_name.Length - 2);
            userTable.role = "Member";
            userTable.status = "Pending";
            userTable.last_activity = System.DateTime.Now;
            try
            {
                using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
                {
                    var userData = dataContext.users.Where(u => u.uta_id == userTable.uta_id).ToList();

                    if (userData.Count > 0)
                    {
                        return "Duplicated";
                    }
                    else
                    {
                        dataContext.users.Add(userTable);
                        dataContext.SaveChanges();
                        return "Registered";
                    }
                        
                }
            }
            catch (DbEntityValidationException ex)
            {
                foreach (var validationErrors in ex.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Trace.TraceInformation("Property: {0} Error: {1}",
                                                validationError.PropertyName,
                                                validationError.ErrorMessage);
                    }
                }
                return ex.Message;
            }
            
        }

        // process login
        [AllowAnonymous]
        public JsonResult Login(string email , string password)
        {
            user userTable = new user();
            userTable.email = email.Substring(1, email.Length - 2);
            userTable.password = password.Substring(1, password.Length - 2);
            try
            {                
                using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
                {
                    var userData = dataContext.users.Where(u => u.email == userTable.email && u.password == userTable.password).ToList();
                    if (userData.Count > 0)
                    {
                        userData[0].last_activity = System.DateTime.Now;
                        dataContext.SaveChanges();
                        return Json(userData, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (DbEntityValidationException ex)
            {
                foreach (var validationErrors in ex.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Trace.TraceInformation("Property: {0} Error: {1}",
                                                validationError.PropertyName,
                                                validationError.ErrorMessage);
                    }
                }
                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }


    }
}