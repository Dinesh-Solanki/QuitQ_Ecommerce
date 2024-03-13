import { Order } from "./order.model";

export class Payments {

    public PaymentId: number;
    public OrderId: number;
    public PaymentDate: Date;
    public PaymentStatus: string;
    public Order?: Order; 
}
