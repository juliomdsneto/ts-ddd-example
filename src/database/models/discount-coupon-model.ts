import { Model } from "../base/model.base";
import { DiscountCouponDoc } from "../docs/discount-coupon.doc";

export class DiscountCoupontModel extends Model<DiscountCouponDoc>{
    constructor(){
        super("discount_coupons");
    }
}