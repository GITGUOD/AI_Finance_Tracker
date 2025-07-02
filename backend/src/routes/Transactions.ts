import express from 'express';
import { Transaction } from '../models/Transaction';

const router = express.Router();

//get transactions

router.get('/', async (req, res) => {
    const transactions = await Transaction.find();
    console.log('GET /api/transactions route triggered');

    const transformed = transactions.map(tx => ({
        id: tx._id.toString(),
        type: tx.type,
        amount: tx.amount,
        category: tx.category,
        note: tx.note,
        date: tx.date,
    }));
    res.json(transformed);

})

// Create a new transaction
router.post('/', async (req, res) => {
    // req.body är ett objekt i Express som innehåller den data som skickas med i kroppen av en HTTP-förfrågan – oftast vid POST, PUT eller PATCH
    console.log('📥 Request body:', req.body); // Se vad servern faktiskt får!

    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json({
            id: transaction._id.toString(),  // 🔑 viktigt!
            type: transaction.type,
            amount: transaction.amount,
            category: transaction.category,
            note: transaction.note,
            date: transaction.date,
        });
        
    } catch (err) {
        res.status(400).json({ error: 'Invalid transaction data'});
    }
});

export default router;