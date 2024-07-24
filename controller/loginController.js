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
const changeHandler = async (req,res,next)=>{

    const param = req.params.info;
    console.log(param);
    if(param === '') res.status(400).send('Bad Request');

    if(param === 'password'){
        return changePassword(req, res, next);
    }

    if(param === 'name'){
        return changeName(req, res, next);
    }
}
const changePassword = async (req,res,next)=>{
    try{
        const old_password = req.body.password;
        const username = req.body.username;

        const new_password = req.body.new_password;

        const credential_raw = await firebase.getDataByParamWithID(COLLECTION,username,"username","==");
        if(credential_raw.length === 0) throw new Error('Invalid username');
        const credential = credential_raw[0];

        const key = Object.keys(credential)[0];
        
        console.log(key);
        console.log(credential);
        const credential_password = credential[key]["password"];
        console.log(credential_password);
        if(old_password !== credential_password) throw new Error('Invalid password');
        const newPassword = ({password: new_password});
       const updatePass = await firebase.updateData(COLLECTION,newPassword,key);
        if(!updatePass) throw Error('Couldnt Update password');

        res.send('OK');

    }catch(error){
        res.status(403).send(error);
    }
}

const changeName = async (req,res,next)=>{
    try{
        
    }catch(error){
    
    }
}

export default {

    Login,
    changeHandler
}