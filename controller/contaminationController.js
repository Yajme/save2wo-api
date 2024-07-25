import firebase from './firebase.js';
import cache from 'memory-cache';
const COLLECTION = 'contamination';
const one_hour = 3600000 *1.5;
const cacheData= (data,key)=>{
    try{
        cache.put(key,data,one_hour);
    }catch(error){
        console.error(error);
    }
};

const getAll = async (req,res,next)=>{
    try{
        const key = 'all_contamination';
        let data = cache.get(key);
        if(!data){
            cacheData( data = await firebase.getData(COLLECTION),key);
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
        const data = await firebase.getDataByParam(COLLECTION,cage,"cage","==");
        res.send(data);
    }catch(error){
        console.log(error);
        next(error);
    }
}

const getByContaminationLevel = async (req,res,next)=>{
    try{
        const contamination = req.params.level;
        const data = await firebase.getDataByParam(COLLECTION,contamination,"contamination","==");
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

    const getLatestRecordLimit = async(req,res,next)=>
        {
            try{
            const date = new Date();
            const limit = req.params.limit;
            const data = await firebase.getFilteredData(COLLECTION,date,"timestamp","<=",parseFloat(limit),"asc");
            res.send(data);
            }catch(error){
                console.log(error);
                next(error);
            }
        }
/**
 * try{

    }catch(error){
        console.log(error);
        next(error);
    }
 */


export default{
    getAll,
    getByCage,
    getByContaminationLevel,
    getByDateRange,
    getAfterDate,
    getBeforeDate,
    getLatestRecordLimit
};