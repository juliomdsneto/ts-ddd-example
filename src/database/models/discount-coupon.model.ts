import { Model } from "../base/model.base";
import { DiscountCouponDoc } from "../docs/discount-coupon.doc";

export class DiscountCouponModel extends Model<DiscountCouponDoc>{
    constructor(){
        super("discount_coupons");
    }
}