import { File } from "../database/models/File";
import { User } from "../database/models/User";
import { connectToDatabase } from "../database/utils";

export const createOrder = async ({ customer_email, client_reference_id }) => {
  try {
    await connectToDatabase();
    console.log(customer_email, client_reference_id);
    const user = await User.findOne({ email: customer_email });
    console.log(user);
    await User.findByIdAndUpdate(user._id, {
      $push: { ownedFiles: client_reference_id },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
