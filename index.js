
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import firebase from './controller/firebase.js';
import historyRoute from './routes/history.js';
import contaminationRoute from './routes/contamination.js';
import thresholdRoute from './routes/threshold.js';
import loginRoute from './routes/login.js';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
firebase.initializeFirebase();
app.get('/', async (req, res) => {
    const data = 'hello';
    
   
    res.send(data);
});

app.use('/history/',historyRoute);
app.use('/contamination', contaminationRoute);
app.use('/threshold',thresholdRoute);
app.use('/login',loginRoute);

app.post('/post-test',(req,res)=>{

    console.log(req.body);

    res.send(req.body);
})

app.get('*', (req, res, next) => {
    const requestedURL = req.url;
    const error = new Error('Wrong URL ' + requestedURL + " is not existent");
    error.status = 404; // You can set the status to 404 or any other appropriate status code.
    
    next(error); // Pass the error to the error-handling middleware.
});
app.use((err, req, res, next) => {  
    res.status(err.status || 500).send(err.message);
});
app.listen(port, () => {
   
    console.log(`Server listening at http://localhost:${port}`);
});