import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  //Hämtar headern från reqest
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  // Splittar token i två, eftersom headern ser ut så här: "Bearer <token>"
  // Vid splittringen om den ena delen saknas eftervi tittar på [1] första elementet dvs
  // Bearer....
  // Då har vi ingen token
  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Malformed token' });
    return;
  }

  try {
    //Kontrollerar om token är giltig
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    //Går vidare
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
}
