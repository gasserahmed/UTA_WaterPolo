using System.Web.Mvc;
using AspMVC.NG.Routing.Models;
using System.Linq;
using System;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Web;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace AspMVC.NG.Routing.Controllers
{
    public class RoutesController : Controller
    {
        // call an homepage
        public ActionResult Home()
        {
            return View();
        }

        // call an about page
        public ActionResult About()
        {
            return View();
        }
        
        // call an event page
        public ActionResult Events()
        {
            return View();
        }

        // call a gallery page
        public ActionResult Gallery()
        {
            return View();
        }

        // call an admin page
        public ActionResult Admin()
        {
            return View();
        }

        // Add Event 
        [AllowAnonymous]
        public string AddEvent(string description
                                , string location
                                , string startDate
                                , string endDate
                                , string startTime
                                , string endTime
                                , string fee)
        {
            @event eventTable = new @event();
            eventTable.description = description.Substring(1, description.Length - 2);
            eventTable.location = location.Substring(1, location.Length - 2);
            eventTable.start_date = Convert.ToDateTime(startDate.Substring(1, startDate.Length - 2));
            eventTable.end_date = Convert.ToDateTime(endDate.Substring(1, endDate.Length - 2));
            eventTable.start_time = Convert.ToDateTime(startTime.Substring(1, startTime.Length - 2));
            eventTable.end_time = Convert.ToDateTime(endTime.Substring(1, endTime.Length - 2));
            eventTable.fee = Convert.ToDecimal(fee.Substring(1, fee.Length - 2));

            try
            {
                using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
                {
                    dataContext.events.Add(eventTable);
                    dataContext.SaveChanges();
                    return "Success";
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
            //return "";
        }

        // Update Event 
        [AllowAnonymous]
        public string UpdateEvent(string description
                                , string location
                                , string startDate
                                , string endDate
                                , string startTime
                                , string endTime
                                , string fee
                                , string event_id)
        {
            @event eventTable = new @event();
            eventTable.description = description.Substring(1, description.Length - 2);
            eventTable.location = location.Substring(1, location.Length - 2);
            eventTable.start_date = Convert.ToDateTime(startDate.Substring(1, startDate.Length - 2));
            eventTable.end_date = Convert.ToDateTime(endDate.Substring(1, endDate.Length - 2));
            eventTable.start_time = Convert.ToDateTime(startTime.Substring(1, startTime.Length - 2));
            eventTable.end_time = Convert.ToDateTime(endTime.Substring(1, endTime.Length - 2));
            if (fee.Length > 1)
            {
                eventTable.fee = Convert.ToDecimal(fee.Substring(1, fee.Length - 2));
            }
            else
            {
                eventTable.fee = Convert.ToDecimal(fee);
            }
            if(event_id.Length> 1)
            {
                eventTable.event_id = Convert.ToInt32(event_id.Substring(1, event_id.Length - 2));
            }
            else
            {
                eventTable.event_id = Convert.ToInt32(event_id);
            }         
            
            try
            {
                using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
                {
                    var eventData = dataContext.events.Where(e => e.event_id == eventTable.event_id).ToList();
                    if (eventData.Count > 0)
                    {
                        eventData[0].description = description.Substring(1, description.Length - 2);
                        eventData[0].location = location.Substring(1, location.Length - 2);
                        eventData[0].start_date = Convert.ToDateTime(startDate.Substring(1, startDate.Length - 2));
                        eventData[0].end_date = Convert.ToDateTime(endDate.Substring(1, endDate.Length - 2));
                        eventData[0].start_time = Convert.ToDateTime(startTime.Substring(1, startTime.Length - 2));
                        eventData[0].end_time = Convert.ToDateTime(endTime.Substring(1, endTime.Length - 2));
                        eventData[0].fee = eventTable.fee;
                        dataContext.SaveChanges();
                        return eventData[0].event_id.ToString();
                    }
                    else
                    {
                        return "Not Found";
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

        // get all events from database
        [AllowAnonymous]
        public JsonResult GetEvents(string uta_id) {
            try
            {
                using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
                {
                    //var eventData = dataContext.vieweventlists.ToList();
                    if (uta_id != null)
                    {
                        dataContext.getEventList(uta_id.Substring(1, uta_id.Length - 2));
                        var eventData1 = dataContext.event_list.ToList();
                        return Json(eventData1, JsonRequestBehavior.AllowGet);
                    }

                    var eventData = dataContext.events.ToList();
                    return Json(eventData, JsonRequestBehavior.AllowGet);
                }
            }
            catch(Exception ex)
            {
                return null;
            }
                   
    
        }

        // get all users from database
        [AllowAnonymous]
        public JsonResult GetUsers()
        {
            using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
            {
                var userData = dataContext.users.ToList();
                return Json(userData, JsonRequestBehavior.AllowGet);
            }

        }

        // Update Event 
        [AllowAnonymous]
        public string UpdateUser(string first_name
                                , string last_name
                                , string email
                                , string role
                                , string status
                                , string uta_id)
        {
            user userTable = new user();
            userTable.first_name = first_name.Substring(1, first_name.Length - 2);
            userTable.last_name = last_name.Substring(1, last_name.Length - 2);
            userTable.email = email.Substring(1, email.Length - 2);
            userTable.role = role.Substring(1, role.Length - 2);
            userTable.status = status.Substring(1, status.Length - 2);
            userTable.uta_id = uta_id.Substring(1, uta_id.Length - 2);
            
            try
            {
                using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
                {
                    var userData = dataContext.users.Where(e => e.uta_id == userTable.uta_id).ToList();
                    if (userData.Count > 0)
                    {
                        userData[0].first_name = userTable.first_name;
                        userData[0].last_name = userTable.last_name;
                        userData[0].email = userTable.email;
                        userData[0].role = userTable.role;
                        userData[0].status = userTable.status;
                        dataContext.SaveChanges();
                        return userData[0].uta_id.ToString();
                    }
                    else
                    {
                        return "Not Found";
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

        // Delete User Event 
        [AllowAnonymous]
        public string DeleteUser(string uta_id)
        {
            try
            {
                using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
                {
                    user userTable = new user() { uta_id = uta_id.Substring(1, uta_id.Length - 2) };
                    dataContext.users.Attach(userTable);
                    dataContext.users.Remove(userTable);
                    dataContext.SaveChanges();

                    return "success";                    
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

        [AllowAnonymous]
        public JsonResult GetAbout()
        {
            using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
            {
                var aboutData = dataContext.abouts.ToList();
                //var str = aboutData[0].exec_board.Replace(@"\\n", " ");
                //aboutData[0].exec_board = str;
                return Json(aboutData, JsonRequestBehavior.AllowGet);
            }

        }

        // Update About
        [AllowAnonymous]
        public string UpdateAbout(string mission
                                , string exec_board
                                , string practices
                                , string address)
        {
            about aboutTable = new about();
            aboutTable.mission = mission.Substring(1, mission.Length - 2);
            aboutTable.exec_board = exec_board.Substring(1, exec_board.Length - 2);
            aboutTable.practices = practices.Substring(1, practices.Length - 2);
            aboutTable.address = address.Substring(1, address.Length - 2);

            try
            {
                using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
                {
                    var aboutData = dataContext.abouts.ToList();
                    if (aboutData.Count > 0)
                    {
                        aboutData[0].mission = aboutTable.mission;
                        aboutData[0].exec_board = aboutTable.exec_board;
                        aboutData[0].practices = aboutTable.practices;
                        aboutData[0].address = aboutTable.address;
                        dataContext.SaveChanges();
                        return "Success";
                    }
                    else
                    {
                        return "Not Found";
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
            //return "";
        }

        // Add Event 
        [AllowAnonymous]
        public string SignUpEvent(string uta_id
                                , string event_id)
        {

            ticket ticketTable = new ticket();
            ticketTable.uta_id = uta_id.Substring(1, uta_id.Length - 2);
            ticketTable.event_id = Convert.ToInt32(event_id);
            try
            {
                using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
                {
                    dataContext.tickets.Add(ticketTable);
                    dataContext.SaveChanges();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                //foreach (var validationErrors in ex.EntityValidationErrors)
                //{
                //    foreach (var validationError in validationErrors.ValidationErrors)
                //    {
                //        Trace.TraceInformation("Property: {0} Error: {1}",
                //                                validationError.PropertyName,
                //                                validationError.ErrorMessage);
                //    }
                //}
                return ex.Message;
            }
        }

        // Delete User Event 
        [AllowAnonymous]
        public string DeleteEvent(string event_id)
        {
            try
            {
                using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
                {
                    @event eventTable = new @event() { event_id = Convert.ToInt32(event_id) };
                    dataContext.events.Attach(eventTable);
                    dataContext.events.Remove(eventTable);
                    dataContext.SaveChanges();

                    return "success";
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

        // Delete Row Event 
        [AllowAnonymous]
        public string DeleteRowEvent(string event_id)
        {
            try
            {
                using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
                {
                    @event eventTable = new @event() { event_id = Convert.ToInt32(event_id) };
                    dataContext.events.Attach(eventTable);
                    dataContext.events.Remove(eventTable);
                    dataContext.SaveChanges();

                    return "success";
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

        // Sign out Event 
        [AllowAnonymous]
        public string SignOutEvent(string ticket_id)
        {
            try
            {
                using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
                {
                    ticket ticketTable = new ticket() { ticket_id = Convert.ToInt32(ticket_id) };
                    dataContext.tickets.Attach(ticketTable);
                    dataContext.tickets.Remove(ticketTable);
                    dataContext.SaveChanges();

                    return "success";
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

        // show singup button service
        [AllowAnonymous]
        public bool ShowSignUpButton(string ticket_id, string uta_id)
        {
            int ticketID = Convert.ToInt32( ticket_id);
            string utaID = uta_id.Substring(1, uta_id.Length - 2); 
            using (utawaterpoloEntities dataContext = new utawaterpoloEntities())
            {
                var ticketData = dataContext.tickets.Where(e => e.ticket_id == ticketID & e.uta_id == utaID).ToList();
                if (ticketData.Count > 0)
                    return true;
                else
                    return false;
            }

        }
    }    
}