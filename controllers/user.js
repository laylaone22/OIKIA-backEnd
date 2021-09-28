import User from "../model/user.js";

export const getUsers=async(req, res, next)=>{
    const users=await User.find({})
    res.status(200).send(users)
}

export const addUser=async(req, res, next)=>{

    const newUser =new User(req.body);
    await newUser.save();
    res.status(200).send(" user added")
}