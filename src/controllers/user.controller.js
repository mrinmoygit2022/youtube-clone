import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "Data received from 'user.controller.js' file"
    })
})

export { 
    registerUser, 
}