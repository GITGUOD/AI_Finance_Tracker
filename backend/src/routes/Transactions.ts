import express from 'express';
import { Transaction } from '../models/Transaction';

const router = express.Router();

//get transactions

router.get('/', async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
})

// Create a new transaction
router.post('/', async (req, res) => {
    // req.body är ett objekt i Express som innehåller den data som skickas med i kroppen av en HTTP-förfrågan – oftast vid POST, PUT eller PATCH
    //console.log('📥 Request body:', req.body); // Se vad servern faktiskt får!

    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
        
    } catch (err) {
        res.status(400).json({ error: 'Invalid transaction data'});
    }
});

export default router;