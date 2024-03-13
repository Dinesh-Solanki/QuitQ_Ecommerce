import { Order } from "./order.model";
import { Products } from "./products.model";

export class Orderitems {

    public OrderItemId: number;
    public OrderId: number;
    public ProductId: number;
    public Quantity: number;
    public ItemTotalPrice: number;
    public Orders?: Order; 
    public Products?: Products; 

}
