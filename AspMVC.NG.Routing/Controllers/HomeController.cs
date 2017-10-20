using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UTAWaterPolo.Controllers
{
    public class HomeController : Controller
    {
        // call a homepage
        public ActionResult Index()
        {
            return View();
        }

        
    }
}