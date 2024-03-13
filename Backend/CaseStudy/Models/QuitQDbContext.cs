using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CaseStudy.Models
{
    public partial class QuitQDbContext : DbContext
    {
        public QuitQDbContext()
        {
        }

        public QuitQDbContext(DbContextOptions<QuitQDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Administrator> Administrators { get; set; } = null!;
        public virtual DbSet<Cart> Carts { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderItem> OrderItems { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<Seller> Sellers { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=DINESH_SOLANKI;Database=QuitQDB;trusted_connection=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Administrator>(entity =>
            {
                entity.HasKey(e => e.AdminId)
                    .HasName("PK__Administ__719FE488E5C08AAC");

                entity.ToTable("Administrator");

                entity.HasIndex(e => e.AdminEmail, "UQ__Administ__6066AA655E819D83")
                    .IsUnique();

                entity.Property(e => e.AdminEmail)
                    .HasMaxLength(255)
                    .HasColumnName("Admin_Email");

                entity.Property(e => e.AdminFullName)
                    .HasMaxLength(100)
                    .HasColumnName("Admin_FullName");

                entity.Property(e => e.AdminPassword)
                    .HasMaxLength(16)
                    .HasColumnName("Admin_Password");

                entity.Property(e => e.AdminPhoneNumber)
                    .HasMaxLength(20)
                    .HasColumnName("Admin_PhoneNumber");
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("Cart");

                entity.Property(e => e.Amount).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("Created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_Cart_Products");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Cart_Users");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasIndex(e => e.CategoryName, "UQ__Categori__B35EB41941B8A556")
                    .IsUnique();

                entity.Property(e => e.CategoryName)
                    .HasMaxLength(100)
                    .HasColumnName("Category_Name");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.Amount).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.OrderDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Order_Date")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ShippingAddress)
                    .HasMaxLength(500)
                    .HasColumnName("Shipping_Address");

                entity.Property(e => e.Status).HasMaxLength(20);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Orders_Users");
            });

            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.ToTable("Order_Items");

                entity.Property(e => e.ItemTotalPrice)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("Item_Total_Price");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK_Order_Items_Orders");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_Order_Items_Products");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.Property(e => e.PaymentDate)
                    .HasColumnType("date")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.PaymentStatus).HasMaxLength(50);

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("Fk_Payments_Orders");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.ProductName)
                    .HasMaxLength(255)
                    .HasColumnName("Product_Name");

                entity.Property(e => e.ProductUrl).HasColumnType("text");

                entity.Property(e => e.QuantityInStock).HasColumnName("Quantity_In_Stock");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_Products_Categories");

                entity.HasOne(d => d.Seller)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.SellerId)
                    .HasConstraintName("FK_Products_Seller");
            });

            modelBuilder.Entity<Seller>(entity =>
            {
                entity.ToTable("Seller");

                entity.HasIndex(e => e.SellerEmail, "UQ__Seller__3726DD50AADA04E5")
                    .IsUnique();

                entity.Property(e => e.SellerAddress)
                    .HasMaxLength(255)
                    .HasColumnName("Seller_Address");

                entity.Property(e => e.SellerEmail)
                    .HasMaxLength(255)
                    .HasColumnName("Seller_Email");

                entity.Property(e => e.SellerFullName)
                    .HasMaxLength(100)
                    .HasColumnName("Seller_FullName");

                entity.Property(e => e.SellerGender)
                    .HasMaxLength(10)
                    .HasColumnName("Seller_Gender");

                entity.Property(e => e.SellerPassword)
                    .HasMaxLength(16)
                    .HasColumnName("Seller_Password");

                entity.Property(e => e.SellerPhoneNumber)
                    .HasMaxLength(20)
                    .HasColumnName("Seller_PhoneNumber");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email, "UQ__Users__A9D10534423BF012")
                    .IsUnique();

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.FullName).HasMaxLength(100);

                entity.Property(e => e.Gender).HasMaxLength(10);

                entity.Property(e => e.Password).HasMaxLength(16);

                entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
