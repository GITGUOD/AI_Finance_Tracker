import mongoose from 'mongoose';

//modell för att spara och hämta transaktioner (t.ex. inkomster och utgifter) i en MongoDB-databas, dvs vår blueprint
const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    catagory: String,
    note: String,
    date: {
        type: Date,
        default: Date.now,
    },
});
//Här skapar du en modell med namnet Transaction, baserad på transactionSchema.
//Med denna modell kan du lägga till, läsa, uppdatera och ta bort transaktioner i databasen.

//Exempel, skapa en ny transaktion med typen inkomst av 1000:
    //const t = new Transaction({ type: 'income', amount: 1000 });
// Sparar därefter till MongoDB
    //await t.save(); // sparar till MongoDB
export const Transaction = mongoose.model('Transaction', transactionSchema);