import { Mapper } from "../../common/repository/mapper.common";
import { DiscountCoupon } from "../../entities/discount-coupon.entity";
import { DiscountCouponDoc } from "../../database/docs/discount-coupon.doc";

export class DiscountCouponMapper extends Mapper<DiscountCoupon, DiscountCouponDoc>{
    constructor(){
        super();
    }

    entityPersistence(discountCoupon: DiscountCoupon): DiscountCouponDoc{
        return new DiscountCouponDoc({
            id: Number(discountCoupon.id.value),
            code: String(discountCoupon.code),
            value: Number(discountCoupon.value),
        });
    }

    persistenceToEntity(persistence: DiscountCouponDoc): DiscountCoupon {
        return new DiscountCoupon({
            id: persistence.id,
            code: persistence.code,
            value: persistence.value,
        });
    }
}