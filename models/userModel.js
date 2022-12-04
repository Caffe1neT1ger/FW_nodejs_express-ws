import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { ObjectId } = mongoose.Schema;
const userSchema = mongoose.Schema(
  {
    userName: String,
    password: {
      type: String,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    rooms: [
      {
        type: ObjectId,
        ref:"RoomObject",
   
      },
    ],
  },
  {
    minimize: false,
    timestamps: true,
  }
);
// Создание пользовательского метода по смене пароля
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.updateUserName = async function (enteredUserName) {
  const filter = { email: this.email };
  const update = { name: enteredUserName };
  User.findByIdAndUpdate(filter, update, { new: true });
};
// Выполняется перед каждым вызовом пользовательских методов
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("USER", userSchema);

export default User;
