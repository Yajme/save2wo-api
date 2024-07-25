import firebase from './firebase.js';
import cache from 'memory-cache';
const COLLECTION = "fish_kill_history";
const one_hour = 3600000*1.5;
const cacheData= (data,key)=>{
    try{
        cache.put(key,data,one_hour);
    }catch(error){
        console.error(error);
    }
};
const getAll = async (req,res,next)=>{
    try{
        
        const key = 'all_history';
        let data = cache.get(key);
        if(!data){
            data = await firebase.getData(COLLECTION);
            cacheData(data,key);
        }
        res.send(data);
    }catch(error){
        console.log(error);
        next(error);
    }
    
}

const getByCage = async (req,res,next)=>{
    try{
        const cage = parseFloat(req.params.cagenumber);
        const key = `cage_${cage}`;
        let data = cache.get(key);
        if(!data){
            data = await firebase.getDataByParam(COLLECTION,cage,"cage","==");
            cacheData(data,key);
        }
    
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

        const key = `history_${fromDate}_${toDate}`;
        let data = cache.get(key);
        if(!data){
            cacheData(data = await firebase.getDataByRange(COLLECTION,"timestamp",fromDate,toDate),key);
        }

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
        const key = 'history_latest';
        let data = cache.get(key);
        if(!data){
            cacheData(data = await firebase.getFilteredData(COLLECTION,new Date(),"timestamp","<=",parseFloat(1),"asc"),key);
        }
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