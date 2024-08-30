const {user}=require("../models/user")
const {Recipe}=require("../models/recipe")

const {setUser}=require("../services/authentication")

async function handleCreateUser(req,res){
    const {name,email,password}=req.body;
    try {
        // Check if the email already exists
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            // If email exists, return JSON response to trigger client-side alert
            return res.json({ alert: 'Email already exists.' });
        }

        // If email doesn't exist, create the user
        const newUser = await user.create({ name, email, password });
        console.log("User Created:", newUser);

        // Redirect to login page or any other success page
        return res.render('login');
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: 'Server error.' });
    }
}

async function handleGetuser(req,res){
    const result= await user.find({});
    return res.status(200).json(result)

}

async function handleGetByuserId(req,res){
    const id=req.params.id;
    

    const result= await user.findById(id);
        if(!result){
            console.log("User Not Found by id");
            return res.status(404).json({msg:"user not found"})
        }
    
     res.status(200).json(result)

}

async function handleDeleteUser(req,res){
    const id=req.params.id;
    
    console.log(id);
    const result= await user.findByIdAndDelete(id);
        if(!result){
            console.log("User Not Found by delete");
            return res.status(404).json({msg:"user not found"})
        }
    
     res.status(200).json({result,msg:"User deleted"})

}

async function handleUpdateUser(req,res){
    const id=req.params.id;
    const updateData=req.body;
    

    const result= await user.findByIdAndUpdate(id,updateData);
        if(!result){
            console.log("User Not Found by update");
            return res.status(404).json({msg:"user not found"})
        }
    
     res.status(200).json({result,msg:"User updated"})

}
async function handleLogin(req,res) {

    const{email,password}=req.body
    const userlogin=await user.findOne({email,password});
    console.log("user found",userlogin)
    if(!userlogin){
         return res.render("login",{
        error:"username or password incorrect"
        });
    }
// const seesionId=uuid();
const token=setUser(userlogin)
res.cookie('uid',token)
console.log("user found",token)
try {
    const recipes = await Recipe.find({});
    return res.render("home", { recipes });
} catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ error: "Server error" });
}
return res.render("home")
}
module.exports={handleCreateUser,handleGetuser,handleGetByuserId,handleDeleteUser,handleUpdateUser,handleLogin}