using System;
using System.Collections.Generic;

namespace CaseStudy.Models
{
    public partial class Cart
    {
        public int CartId { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual Product? Product { get; set; } = null!;
        public virtual User? User { get; set; } = null!;
    }
}
