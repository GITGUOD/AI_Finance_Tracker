import {useState} from "react";
import axios from "axios";
import './TransactionForm.css';
import { Transaction } from "../../App";
import { useAuth } from "../Context/AuthContext";

//Our attributes
interface Props {
    type: 'expense' | 'income',
    amount: string,
    category: string,
    note: string
    onAddTransaction: (tx: Transaction) => void;

}

//Main component
{/* retrieves type, amount, category, note and the method onAddTransaction which is then initieted in app.tsx*/}
function TransactionForm({ type, amount, category, note, onAddTransaction } : Props) {
    const { token } = useAuth();

//Learnings
    //React hook
    // Here's how it works:
    //  - For instance:
    //      const [namn, setNamn] = useState("Lucas");
    // namn är själva värdet
    // setNamn är en funktion du anropar för att ändra det
    // "Lucas" är startvärdet

    // Eller t.ex
    /*const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: ""
        });
        Och sen ändra en del:

    tsx
    Kopiera
    Redigera
        setFormData(prev => ({
        ...prev,
        email: "ny@email.com"
        })); 
    
    prev är det gamla objektet

        ...prev kopierar alla gamla fält

    sen skriver vi över bara det vi vill ändra (t.ex. email)    */

    //Okej i vårt fall:
    // Vi definierar formData och setFormData som ska ändra formData
    const [formData, setFormData] = useState<{
    //Våra default värden, dvs vad vi berättar med typescript hur objektet ska se ut
    type: 'income' | 'expense';
    amount: string;
    category: string;
    note: string;
    }>({
    //Detta är våra initial värden som de ska starta med.
    type,
    amount,
    category,
    note
    });

    //Subcomponent, When user types something , event accepterar både input och select element
    function handleChange(event : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        });
    }

    //When submitting or saving
    async function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); //Stop page from refreshing

    try {
        //sending a post request to the backend
        await axios.post("http://localhost:5000/api/transactions", {
            ...formData,
            amount: parseFloat(formData.amount) //Converting String to number
        }, {
  headers: { Authorization: `Bearer ${token}` }
});

        const newTransaction: Transaction = {
            id: Date.now().toString(),
            type: formData.type,
            amount: parseFloat(formData.amount),
            category: formData.category,
            note: formData.note,
            date: new Date().toISOString(),
        };

        onAddTransaction(newTransaction);

        alert("Transaction saved!");

        //Reset
        setFormData({
            type: 'expense',
            amount: '',
            category: '',
            note: ''
        });

    } catch (error) {
        alert(" could not save transaction.");
        console.error(error);
    }
    }

    return <>
        <div className="transaction-form">
        <h2>Add a transaction</h2>
        <form onSubmit = {handleSubmit}>
        <label>
            Type:
            <select name="type" value = {formData.type} onChange= {handleChange}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
        </label>

        <label>
            amount:
            <input name = "amount" value = {formData.amount} onChange = {handleChange} required />
        </label>

        <label>
            category:
            <input name="category" value={formData.category} onChange = {handleChange} />
        </label>

        <label>
            note:
            <input name="note" className = "note-input" value = {formData.note} onChange = {handleChange} />
        </label>

        <button type ="submit"> Save</button>
        </form>
        </div>
    </>
    
}

export default TransactionForm;