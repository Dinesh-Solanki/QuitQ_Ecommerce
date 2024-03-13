using System;
using System.Collections.Generic;

namespace CaseStudy.Models
{
    public partial class Payment
    {
        public int PaymentId { get; set; }
        public int OrderId { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentStatus { get; set; } = null!;

        public virtual Order? Order { get; set; } = null!;
    }
}
