import express, { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import axios from 'axios';

const router = express.Router();

router.post('/chatbot', async (req: AuthenticatedRequest, res: Response) => {
    const message = req.body.message;

    try {
        const flaskResponse = await axios.post('http://localhost:5001/chatbot', {
            message: message
        });

        const answer = flaskResponse.data.response;
        res.json({ answer });
    } catch (error) {
        console.error("Error contacting Flask:", error);
        res.status(500).json({ answer: "Kunde inte hämta svar från AI." });
    }
});

export default router;
