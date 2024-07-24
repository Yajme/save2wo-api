import firebase from './firebase.js';

const COLLECTION = "fish_kill_history";
const getAll = async (req,res,next)=>{
    try{
        const data = await firebase.getData(COLLECTION);
        res.send(data);
    }catch(error){
        console.log(error);
        next(error);
    }
    
}

const getByCage = async (req,res,next)=>{
    try{
        const cage = parseFloat(req.params.cagenumber);
        const data = await firebase.getDataByParam(COLLECTION,cage,"cage","==");
        res.send(data);
    }catch(error){
        console.log(error);
        next(error);
    }
}

const getByDateRange = async (req,res,next) =>{
    try{
        const fromDate = req.params.fromDate;
        const toDate = req.params.toDate;
        const data = await firebase.getDataByRange(COLLECTION,"timestamp",fromDate,toDate);
        res.send(data);
    }catch(error){
        next(error);
    }
}

const getAfterDate = async (req,res,next)=>{
    try{
        const date = new Date(req.params.date);
        const data = await firebase.getDataByParam(COLLECTION,date,"timestamp",">=");
        res.send(data);
    }catch(error){
        console.log(error);
        next(error);
    }
}
const getBeforeDate = async (req,res,next)=>{
    try{
        const date = new Date(req.params.date);
        const data = await firebase.getDataByParam(COLLECTION,date,"timestamp","<=");
        res.send(data);
    }catch(error){
        console.log(error);
        next(error);
    }
}

const getLatestFishKill = async (req,res,next)=>{
    try{
        const data = await firebase.getFilteredData(COLLECTION,new Date(),"timestamp","<=",parseFloat(1),"asc");
        res.send(data);
    }catch(error){
        console.log(error);
        next(error);
    }
}

const getTotalFishKill = async (req,res,next)=>{
    try{
        const currentDate = new Date();
        const dateFirstDay = new Date().setDate(1);
        const query = [
            {
            key: "timestamp",
            param: new Date(dateFirstDay),
            logic: ">="
            },
            {
                key:"timestamp",
                param: currentDate,
                logic:"<="
            }

        ];
        const data = await firebase.getSum(COLLECTION,query,"dead_fish");
        const parsedData = [
            {
                contamination:"",
                dead_fish: data.total,
                cage : 0,
                timestamp : {
                    seconds : new Date().setDate(1),
                    nanoseconds : 0
                },
                water_quality : {
                    NO2 : 0.00001,
                    Temperature : 0,
                    pH : 0.0001,
                    DO : 0
                }
            }
        ]

        res.send(parsedData);
    }catch(error){
        console.log(error);
        next(error);
    }
}
export default {
    getAll,
    getByCage,
    getByDateRange,
    getAfterDate,
    getBeforeDate,
    getLatestFishKill,
    getTotalFishKill
};