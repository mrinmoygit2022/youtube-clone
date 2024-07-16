import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    // res.status(200).json({
    //     message: "Data received from 'user.controller.js' file"
    // })
    
    // get user details from frontend
    const {username, email, fullName, password} = req.body
    console.log(`email: ${email}`);

    // validation - net empty
    // if(fullName === "") {
    //     throw new ApiError(400, "fullname is required")
    // }
    if (
        [username, email, fullName, password].some((field)=> field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required.")
    }

    // check if user already exists: username, email
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists.")
    }
    
    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required.")
    }
    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover Image file is required.")
    }

    // upload them to cloudinary, avartar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required.")
    }

    // create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    // check for user creation
    if(!createdUser){
        throw new ApiError(500, "Something went worng while registering the user")
    }
    // return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully.")
    )
})

export { 
    registerUser, 
}