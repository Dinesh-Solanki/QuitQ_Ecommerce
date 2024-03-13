using CaseStudy.Controllers;
using CaseStudy.Models;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CaseStudyTesting
{
    public class Tests
    {

        private IConfiguration _config;
        private DbContextOptions<QuitQDbContext> _options;
        [SetUp]
        public void Setup()
        {
            _config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            _options = new DbContextOptionsBuilder<QuitQDbContext>()
                .UseSqlServer(_config.GetConnectionString("Constr"))
                .Options;
        }

        [Test]
        public async Task PostAdministratorTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var adminController = new AdministratorsController(context);
                var newAdmin = new Administrator()
                {
                    AdminFullName = "Admin Test",
                    AdminEmail = "admintest@gmail.com",
                    AdminPhoneNumber = "9535905126",
                    AdminPassword = "Admintest@123",
                };
                await adminController.PostAdministrator(newAdmin);
                var addedAdmin = context.Administrators.FirstOrDefault(a => a.AdminId == 1003);
                Assert.IsNotNull(addedAdmin);
                Assert.AreEqual(newAdmin.AdminEmail, addedAdmin.AdminEmail);
                Assert.AreEqual(newAdmin.AdminPassword, addedAdmin.AdminPassword);
            }
        }

        [Test]
        public async Task GetAdministratorByIdTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var adminController = new AdministratorsController(context);
                var admin1 = context.Administrators.FirstOrDefault(a => a.AdminId == 1000);
                Assert.IsNotNull(admin1);
                Assert.AreEqual(admin1.AdminFullName, "Admin 1");
                Assert.AreEqual(admin1.AdminPassword, "Admin1@123");
            }
        }

        [Test]
        public async Task GetAdministratorTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var adminController = new AdministratorsController(context);
                var admin1 = context.Administrators.FirstOrDefault();
                Assert.IsNotNull(admin1);
                Assert.AreEqual(admin1.AdminFullName, "Admin 1");
                Assert.AreEqual(admin1.AdminPassword, "Admin1@123");
            }
        }

        [Test]
        public async Task PutAdministratorTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var adminController = new AdministratorsController(context);
                var updatedAdmin = new Administrator()
                {
                    AdminId = 1002,
                    AdminFullName = "Admin Test",
                    AdminEmail = "admintest@gmail.com",
                    AdminPhoneNumber = "9535905126",
                    AdminPassword = "UpAdmintest@123"
                };
                await adminController.PutAdministrator(5, updatedAdmin);
                var addedAdmin = context.Administrators.FirstOrDefault(a => a.AdminId == updatedAdmin.AdminId);
                Assert.IsNotNull(addedAdmin);
                Assert.AreEqual(updatedAdmin.AdminEmail, addedAdmin.AdminEmail);
                Assert.AreEqual(updatedAdmin.AdminPassword, addedAdmin.AdminPassword);
            }
        }

        [Test]
        public async Task DeleteAdministratorTest()
        {

            using (var context = new QuitQDbContext(_options))
            {
                var adminController = new AdministratorsController(context);

                var adminId = 1002;

                await adminController.DeleteAdministrator(adminId);

                var deletedAdmin = await context.Administrators.FindAsync(adminId);

                Assert.IsNull(deletedAdmin);
            }
        }
    }
}