using CaseStudy.Controllers;
using CaseStudy.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaseStudyTesting
{
    public class UsersControllerTest
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
        public async Task PostUserTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var userController = new UsersController(context);
                var newUser = new User()
                {
                    FullName = "Userr Test",
                    Email = "userteest@gmail.com",
                    PhoneNumber = "953505126",
                    Password = "Userteest@123",
                    Gender = "Malee",
                    Address = "Userr Test Address"
                };
                await userController.PostUser(newUser);
                var addedUser = context.Users.FirstOrDefault(u => u.Email == newUser.Email);
                Assert.IsNotNull(addedUser);
                Assert.AreEqual(newUser.Email, addedUser.Email);
                Assert.AreEqual(newUser.Password, addedUser.Password);
            }
        }

        [Test]
        public async Task GetUserTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var userController = new UsersController(context);
                var user1 = context.Users.FirstOrDefault();
                Assert.IsNotNull(user1);
                Assert.AreEqual(user1.UserId, 10005);
                Assert.AreEqual(user1.Password, "Usertest@123");
            }
        }

        [Test]
        public async Task PutUserTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var userController = new UsersController(context);
                var updatedUser = new User()
                {
                    UserId = 6,
                    FullName = "User Test",
                    Email = "usertest@gmail.com",
                    PhoneNumber = "9535905126",
                    Password = "Usertest@123",
                    Gender = "Male",
                    Address = "User Test Address"
                };
                await userController.PutUser(6, updatedUser);
                var addedUser = context.Users.FirstOrDefault(u => u.Email == updatedUser.Email);
                Assert.IsNotNull(addedUser);
                Assert.AreEqual(updatedUser.Email, addedUser.Email);
                Assert.AreEqual(updatedUser.Password, addedUser.Password);
            }
        }






    }
}
