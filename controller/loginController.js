import firebase from "./firebase.js";
const COLLECTION = 'users';
const Login = async (req,res,next) =>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const credential = await firebase.getDataByParam(COLLECTION,username,"username","==");
        if(credential.length === 0) throw new Error('Invalid username');
        const credential_password = credential[0]["password"];
        if(password !== credential_password) throw new Error('Invalid password');

        const response ={   
            status : "authorized",
            time : new Date(),
            admin : true,
            firstName : credential[0]["firstName"],
            lastName : credential[0]["lastName"],
            profile_picture : credential[0]["profile_picture"]
        }
        res.send(response);
        
    }catch(error){
        console.log(error);
        res.status(401).send(error.message);
    }
}



export default {

    Login
}