import RoomObject from "../../models/roomModel.js";
import asyncHandler from "express-async-handler";


export const createRoom = asyncHandler(async(req,res)=>{
    const {movieId, ownerId} = req.body;

    const room = await RoomObject.create({
        isPrivate: true,
        movieId:movieId,
        ownerId: ownerId
    })
    res.json({room});
});

