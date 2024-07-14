import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

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
    // check for images, check for avatar
    // upload them to cloudinary, avartar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response
})

export { 
    registerUser, 
}