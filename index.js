
import express from 'express';
import dotenv from 'dotenv';
import firebase from './controller/firebase.js';
import historyRoute from './routes/history.js'
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
firebase.initializeFirebase();
app.get('/', async (req, res) => {
    const data = 'hello';
    
   
    res.send(data);
});

app.use('/history/',historyRoute);


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