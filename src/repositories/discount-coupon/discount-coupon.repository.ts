import { Repository } from "../../common/repository/repository.common";
import { DiscountCouponDoc } from "../../database/docs/discount-coupon.doc";
import { DiscountCoupon } from "../../entities/discount-coupon.entity";
import { DiscountCouponMapper } from "./discount-coupon.mapper";
import { DiscountCouponModel } from "../../database/models/discount-coupon.model";
 
export class DiscountCouponRepository extends Repository<DiscountCoupon, DiscountCouponDoc>{

    constructor(){
        super(new DiscountCouponMapper(), new DiscountCouponModel());
    }

}