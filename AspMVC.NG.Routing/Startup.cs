using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AspMVC.NG.Routing.Startup))]
namespace AspMVC.NG.Routing
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
