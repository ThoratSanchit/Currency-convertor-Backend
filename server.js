const express = require('express');
const bodyParser = require('body-parser');
const CC = require('currency-converter-lt');
const cors = require('cors');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.post('/convert', async (req, res) => {
    try {

        const { from, to, amount } = req.body;


        if (!from || !to || !amount) {
            return res.status(400).json({ error: 'Missing parameters in the request body' });
        } else if(!from || !to || isNaN(amount)){
            return res.status(400).json({ error: 'Invalid parameters in the request body' });
        }

        let currencyConverter = new CC({ from, to, amount });
        const response = await  currencyConverter.convert();
        const roundedResponse = typeof response === 'number' ? parseFloat(response.toFixed(2)) : response;
        res.json(roundedResponse);
   
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
