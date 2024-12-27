import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

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