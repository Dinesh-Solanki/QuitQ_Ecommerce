import { Orderitems } from "./orderitems.model";
import { Payments } from "./payments.model";
import { Users } from "./users.model";


export class Order {
    public OrderId: number;
    public UserId: number;
    public OrderDate: Date;
    public ShippingAddress: string;
    public Status?: string;
    public Amount?: number;
    public User?: Users; 
    public OrderItems?: Orderitems[]; 
    public Payments?: Payments[]; 

    showDropdown?: boolean;
  selectedStatus?: string;

}
