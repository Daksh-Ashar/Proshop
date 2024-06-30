import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user and get Token
// route POST /api/users/login
//access Public
const authUser  = asyncHandler(async (req,res,next)=>{
    try{
        const {email, password} = req.body;
        const userdata = await User.findOne({email});
    
        if(userdata && (await userdata.matchPassword(password)))
        {   
            generateToken(res,userdata._id);

            res.json({
                _id: userdata._id,
                name: userdata.name,
                email: userdata.email,
                isAdmin: userdata.isAdmin
            });
        }else{
            res.status(401)
            throw new Error("Invalid Email or Password");
        }
    }catch(e){
        console.log(e)
        next(e)
    }
});


// @desc Register user and get Token
// route POST /api/users
//access Public
const registerUser  = asyncHandler(async (req,res)=>{
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email});

    if(userExists)
    {
        res.status(401).json({
            "status":"Failure",
            "message":"User already exists"
        })
    }

    const user = await User.create({name,email,password});

    if(user)
    {
        generateToken(res,user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(401).json({
            "status":"Failure",
            "message":"Invalid User data"
        })
    }
});

// @desc Logout user and clear Token cookie
// route POST /api/users/logout
//access Private
const logoutUser  = asyncHandler(async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({"status":"Success","message":"User Logged out successfully"})
});

// @desc Get user Profile
// route GET /api/users/profile
//access Private
const getUserProfile  = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id);

    if(user)
    {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(404).json({
            "status":"Failure",
            "message":"User not found"
        })
    }
});

// @desc Update user Profile
// route POST /api/users/profile
//access Private
const updateUserProfile  = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id);

    if(user)
    {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
       
        if(req.body.password)
        {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
        
    }else{
        res.status(401).json({
            "status":"Failure",
            "message":"User not Found"
        })
    }
});

// @desc get Users
// route GET /api/users
//access Private/admin
const getUsers  = asyncHandler(async (req,res)=>{
    const users = await User.find({});
    res.status(200).json(users);
});

// @desc Get User by id
// route GET /api/users/:id
//access Private/admin
const getUserById  = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.params.id).select('-password');
    if(user)
    {
        res.status(200).json(user);
    }else{
        res.status(404);
        throw new Error("User not found")
    }
});

// @desc DELETE User by id
// route DELETE /api/users/:id
//access Private/admin
const deleteUser  = asyncHandler(async (req,res)=>{
    console.log(req.params.id)
    const user = await User.findById(req.params.id).select('-password');
    if(user)
    {
        if(user.isAdmin)
            {
                res.status(400);
                throw new Error("Cannot delete admin user");
            }
            await User.deleteOne({_id:user._id});
            res.status(200).json({message:"User deleted Successfully"});
    }else{
        res.status(404);
        throw new Error("User not found")
    }
});

// @desc Update User by id
// route PUT /api/users/:id
//access Private/admin
const updateUser  = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.params.id).select('-password');
    if(user)
    {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isAdmin = Boolean(req.body.isAdmin);
            const updatedUser = await user.save();
            res.status(200).json({
                _id:updateUser._id,
                name:updateUser.name,
                email:updateUser.email,
                isAdmin:updateUser.isAdmin
            });
    }else{
        res.status(404);
        throw new Error("User not found")
    }
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserById,
    getUserProfile,
    getUsers,
    deleteUser,
    updateUser,
    updateUserProfile
}