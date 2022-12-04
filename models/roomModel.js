import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const roomModel = mongoose.Schema(
    {
        isPrivate:{
            type:Boolean,
            required: true,
        },
        movieId:{
            type:ObjectId,
            ref:"Movie",
        },
        ownerId:{
            type: ObjectId,
            ref:"User"
        },
    },
    {
        minimize: false,
        timestamps: true,
    },
)

const RoomObject = mongoose.model('RoomObject', roomModel);
export default RoomObject;