import firebase from './firebase.js';


const getAll = async (req,res)=>{
    try{
        const data = await firebase.getData("fish_kill_history");
        res.send(data);
    }catch(err){
        console.log(err);
    }
    
}

const getByCage = async (req,res)=>{
    try{
        const cage = parseFloat(req.params.cagenumber);
        const data = await firebase.getDataByParam("fish_kill_history",cage,"cage");
        res.send(data);
    }catch(error){
        console.log(error);
    }
}





export default {
    getAll,
    getByCage
};