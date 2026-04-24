interface IDiscountCoupon {
    id: number;
    code: string;
    value: number;
}

export class DiscountCouponDoc implements IDiscountCoupon {
    public id: number;
    public code: string;
    public value: number;

    constructor(discountCoupon: IDiscountCoupon) {
        this.id = discountCoupon.id;
        this.code = discountCoupon.code;
        this.value = discountCoupon.value;
    }
}