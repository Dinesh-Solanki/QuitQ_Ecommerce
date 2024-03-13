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
    public class SellersControllerTest
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
                var selcntr = new SellersController(context);
                var newseller = new Sellers()
                {
                    SellerFullName = "Seller Test",
                    SellerEmail = "sellertest@gmail.com",
                    SellerPhoneNumber = "9535905126",
                    SellerPassword = "Sellertest@123",
                    SellerGender = "Male",
                    SellerAddress = "Seller Test Address"
                };
                await selcntr.PostSeller(newseller);
                var addedSeller = context.Sellers.FirstOrDefault(s => s.SellerEmail == newseller.SellerEmail);
                Assert.IsNotNull(addedSeller);
                Assert.AreEqual(newseller.SellerEmail, addedSeller.SellerEmail);
                Assert.AreEqual(newseller.SellerPassword, addedSeller.SellerPassword);
            }
        }

        [Test]
        public async Task GetSellerByidTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var sellercontroller = new SellersController(context);
                var seller1 = context.Sellers.FirstOrDefault(s => s.SellerId == 1);
                Assert.IsNotNull(seller1);
                Assert.AreEqual(seller1.SellerFullName, "Rahul");
                Assert.AreEqual(seller1.SellerPassword, "Rahul@123");
            }
        }

        [Test]
        public async Task GetSeller()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var sellercontroller = new SellersController(context);
                var seller1 = context.Sellers.FirstOrDefault();
                Assert.IsNotNull(seller1);
                Assert.AreEqual(seller1.SellerFullName, "Rahul");
                Assert.AreEqual(seller1.SellerPassword, "Rahul@123");
            }
        }

        [Test]
        public async Task PutSellerTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var selcntr = new SellersController(context);
                var updatedseller = new Seller()
                {
                    SellerId = 6,
                    SellerFullName = "Seller Test",
                    SellerEmail = "sellertest@gmail.com",
                    SellerPhoneNumber = "9535905126",
                    SellerPassword = "Sellertest@123",
                    SellerGender = "Male",
                    SellerAddress = "Seller Test Address"
                };
                await selcntr.PutSeller(6, updatedseller);
                var addedSeller = context.Sellers.FirstOrDefault(s => s.SellerEmail == updatedseller.SellerEmail);
                Assert.IsNotNull(addedSeller);
                Assert.AreEqual(updatedseller.SellerEmail, addedSeller.SellerEmail);
                Assert.AreEqual(updatedseller.SellerPassword, addedSeller.SellerPassword);
            }
        }
    }
}
