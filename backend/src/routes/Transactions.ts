import express, {Request, Response} from 'express';
import { Transaction } from '../models/Transaction';
import { AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

//get transactions

router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  const userID = req.userID;


  // Hämta endast transaktioner för just denna userID
  const transactions = await Transaction.find({ userID });
    console.log(`Found ${transactions.length} transactions for userID ${userID}`);

  const transformed = transactions.map(tx => ({
    id: tx._id.toString(),
    type: tx.type,
    amount: tx.amount,
    category: tx.category,
    note: tx.note,
    date: tx.date,
  }));

  res.json(transformed);
});


// Create a new transaction
router.post('/', async (req: AuthenticatedRequest, res: Response) => {
    // req.body är ett objekt i Express som innehåller den data som skickas med i kroppen av en HTTP-förfrågan – oftast vid POST, PUT eller PATCH
    console.log('📥 Request body:', req.body); // Se vad servern faktiskt får!
    try {

        const userID = req.userID;

        const transaction = new Transaction({
        ...req.body,
        userID
        });

        console.log('Saving transaction with userID:', userID);
        console.log('Full payload:', { ...req.body, userID });


        await transaction.save();
        res.status(201).json({
            id: transaction._id.toString(),  
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