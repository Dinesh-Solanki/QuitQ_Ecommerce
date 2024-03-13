using System;
using System.Collections.Generic;

namespace CaseStudy.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderItems = new HashSet<OrderItem>();
            Payments = new HashSet<Payment>();
        }

        public int OrderId { get; set; }
        public int UserId { get; set; }
        public DateTime? OrderDate { get; set; }
        public string ShippingAddress { get; set; } = null!;
        public string? Status { get; set; }
        public decimal? Amount { get; set; }
        public virtual User? User { get; set; } = null!;
        public virtual ICollection<OrderItem>? OrderItems { get; set; }
        public virtual ICollection<Payment>? Payments { get; set; }
    }
}
