import express, { response } from 'express';
import 'dotenv/config';
import logger from './logger.js';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;
const morganFormat = ':method :url :status :response-time ms';

app.use(express.json());

app.use(morgan(morganFormat, {
    stream : {
        write : (message) => {
            const logObject = {
                method : message.split(' ')[0],
                url : message.split(' ')[1],
                status : message.split(' ')[2],
                responseTime : message.split(' ')[3]
            };
            logger.info(JSON.stringify(logObject));
        }
    }
}));

let teaData = [];
let teaId = 1;

// add a new tea
app.post('/teas', (req,res) => {
    const {name,price} = req.body;
    const newTea = {
        id : teaId++,
        name : name,
        price : price
    };

    teaData.push(newTea);
    res.status(201).send(newTea);
})

// listing all the teas
app.get('/teas', (req,res) => {
    res.status(200).send(teaData);
});

// list the tea with specified id
app.get('/teas/:id', (req,res) => {
    const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
    if(!tea) {
        return res.status(404).send('Tea not found');
    }
    res.status(200).send(tea);
});

// update the tea
app.put('/teas/:id', (req,res) => {
    const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
    // tea with that specific id isn't found
    if(!tea) {
        return res.status(404).send('Tea not found');
    }
    const {name,price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
});

// delete the tea
app.delete('/teas/:id', (req,res) => {
    const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
    // tea with that specific id isn't found
    if(!tea) {
        return res.status(404).send('Tea not found');
    }
    const index = teaData.indexOf(tea);
    teaData.splice(index,1);
    res.status(200).send(tea);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});