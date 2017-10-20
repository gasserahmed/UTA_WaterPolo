using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AspMVC.NG.Routing.Controllers
{
    public class BookController : Controller
    {
        // GET: Book
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Book()
        {
            return View();
        }
        public ActionResult Chapter()
        {
            return View();
        }
        public ActionResult test()
        {
            return View();
        }
    }
}