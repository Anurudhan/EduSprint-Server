import { constant } from "../../../_lib/common/constant";
import { Otp } from "../models";

export const createOtp = async (
  email: string,
  otp: number | string
): Promise<boolean | null> => {
  try {
    const otpExist = await Otp.findOne({ email });
    let result;

    if (otpExist) {
        result = await Otp.updateOne({ email }, {$set:{ otp, createdAt: Date.now() }});
    } else {
      result = await Otp.create({ email, otp });
    }

    if (!result) {
      throw new Error("Otp creation/update failed!");
    }

    return true;
  } catch (error: constant) {
    console.log(error, "Something Went wrong");
    return false;
  }
};
