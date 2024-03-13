using System;
using System.Collections.Generic;

namespace CaseStudy.Models
{
    public partial class Seller
    {
        public Seller()
        {
            Products = new HashSet<Product>();
        }

        public int SellerId { get; set; }
        public string SellerEmail { get; set; } = null!;
        public string SellerFullName { get; set; } = null!;
        public string SellerPhoneNumber { get; set; } = null!;
        public string SellerAddress { get; set; } = null!;
        public string SellerPassword { get; set; } = null!;
        public string? SellerGender { get; set; }

        public virtual ICollection<Product>? Products { get; set; }
    }
}
