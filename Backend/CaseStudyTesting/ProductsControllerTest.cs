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
    internal class ProductsControllerTest
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
        public async Task PostProductTest()
        {
            using (var context = new QuitQDbContext(_options))
            {

                var productController = new ProductsController(context);


                var newProduct = new Product()
                {
                    ProductName = "Test Product",
                    Description = "Test Product Description",
                    Price = 100,
                    QuantityInStock = 10,
                    CategoryId = 1,
                    SellerId = 100
                };

                await productController.PostProduct(newProduct);

                var addedProduct = context.Products.FirstOrDefault(p => p.ProductName == newProduct.ProductName);

                Assert.IsNotNull(addedProduct);
                Assert.AreEqual(newProduct.ProductName, addedProduct.ProductName);
            }
        }

        //TESTING PUT METHOD
        [Test]
        public async Task PutProductTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var productController = new ProductsController(context);
                var productId = 5;
                var product = await context.Products.FindAsync(productId);
                product.ProductName = "Test Product";
                product.Description = "Test Product Description";
                await productController.PutProduct(productId, product);
                var updatedProduct = await context.Products.FindAsync(productId);
                Assert.IsNotNull(updatedProduct);
                Assert.AreEqual(product.ProductName, updatedProduct.ProductName);
                Assert.AreEqual(product.Description, updatedProduct.Description);


            }
        }

        //TESTING DELETE METHOD
        [Test]
        public async Task DeleteProductTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var productController = new ProductsController(context);

                var productId = 5;
                await productController.DeleteProduct(productId);
                var deletedProduct = await context.Products.FindAsync(productId);
                Assert.IsNull(deletedProduct);
            }
        }

        [Test]
        public async Task GetProductTest()
        {
            using (var context = new QuitQDbContext(_options))
            {
                var productController = new ProductsController(context);

                var productId = 5;

                var result = await productController.GetProduct(productId);

                Assert.IsNotNull(result);
                Assert.AreEqual(productId, result.Value.ProductId);
            }
        }
    }
}
