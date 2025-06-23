import { response } from "express"

// Route for user login
const loginUser = async (req,res) => {

  res.json({msg:'Register API WORKING'});

}



// Route for user registration
const registerUser = async (req,res) => {

  res.json({msg:'Register API WORKING'});

}



// Route for admin login
const adminLogin = async(req, res) => {

}

export { registerUser, loginUser, adminLogin }