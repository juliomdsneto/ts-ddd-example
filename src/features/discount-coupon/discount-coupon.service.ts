import { Reference } from "../../common/entity/reference.common";
import { DiscountCouponRepository } from "../../repositories/discount-coupon/discount-coupon.repository";
import { DiscountCoupon } from "../../entities/discount-coupon.entity";
import { Entity } from "../../common/entity/entity.common";
import { IDiscountCoupon } from "../../entities/discount-coupon.entity";

export class DiscountCouponService {
  private discountCouponRepository: DiscountCouponRepository;

  constructor() {
    this.discountCouponRepository = new DiscountCouponRepository();
  }

  async create(discountCouponData: IDiscountCoupon) {
    const discountCoupon = new DiscountCoupon({
      code: discountCouponData.code,
      value: discountCouponData.value,
    });

    return this.discountCouponRepository.save(discountCoupon);
  }

  async deleteCoupon(id: number) {
    const discountCoupon = this.discountCouponRepository.findById(id);

    if (discountCoupon) {
      return this.discountCouponRepository.delete(discountCoupon);
    }
  }

  async updateCoupon(id: number, updateValue: number) {
    const discountCoupon = this.discountCouponRepository.findById(id);

    if (!discountCoupon) {
      throw new Error("Can't find Coupon");
    }

    discountCoupon.value = updateValue;

    const updatedCoupon = this.discountCouponRepository.save(discountCoupon);

    return updatedCoupon;
  }

  async listCoupons(code?: string) {
    if (code) {
      const discountCoupon = this.discountCouponRepository.find({ code });

      if (!discountCoupon || discountCoupon.length === 0) {
        throw new Error("Coupon not found");
      }

      return discountCoupon;
    }

    return this.discountCouponRepository.find({});
  }
}
