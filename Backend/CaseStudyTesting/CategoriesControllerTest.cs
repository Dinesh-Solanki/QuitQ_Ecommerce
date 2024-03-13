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
    internal class CategoriesControllerTest
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
        public async Task PostCategoryTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var category = new CategoriesController(context);
                var newcategory = new Category()
                {
                    CategoryName = "Test6"
                };
                await category.PostCategory(newcategory);
                var addedcat = context.Categories.FirstOrDefault(c => c.CategoryName == newcategory.CategoryName);
                Assert.IsNotNull(addedcat);
                Assert.AreEqual(newcategory.CategoryName, addedcat.CategoryName);
                Assert.AreEqual(newcategory.CategoryId, addedcat.CategoryId);
            }
        }

        [Test]
        public async Task GetCategoryByIdTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var category = new CategoriesController(context);
                var cat1 = context.Categories.FirstOrDefault(c => c.CategoryId == 1);
                Assert.IsNotNull(cat1);
                Assert.AreEqual(cat1.CategoryName, "Electronics");
            }
        }

        [Test]
        public async Task GetCategoryTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var category = new CategoriesController(context);
                var cat1 = context.Categories.FirstOrDefault();
                Assert.IsNotNull(cat1);
                Assert.AreEqual(cat1.CategoryName, "Electronics");
            }
        }

        [Test]
        public async Task PutCategoryTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var category = new CategoriesController(context);
                var newcategory = new Category()
                {
                    CategoryId = 4,
                    CategoryName = "Updated Test"
                };
                await category.PutCategory(4, newcategory);
                var addedcat = context.Categories.FirstOrDefault(c => c.CategoryName == newcategory.CategoryName);
                Assert.IsNotNull(addedcat);
                Assert.AreEqual(newcategory.CategoryName, addedcat.CategoryName);
                Assert.AreEqual(newcategory.CategoryId, addedcat.CategoryId);
            }
        }
    }
}
