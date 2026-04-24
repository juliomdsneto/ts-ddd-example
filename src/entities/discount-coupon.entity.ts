import { Entity } from "../common/entity/entity.common";

export interface IDiscountCoupon{
    id?: number;
    code: string;
    value: number;
}

export class DiscountCoupon extends Entity {
    public code: string;
    public value: number;

    constructor(discountCoupon: IDiscountCoupon){
        super(discountCoupon.id);
        this.code = discountCoupon.code;
        this.value = discountCoupon.value;
    }
}