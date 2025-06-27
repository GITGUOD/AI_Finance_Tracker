import {useState} from "react";
import axios from "axios";
import './TransactionForm.css';

//Our attributes
interface Props {
    type: 'expense' | 'income',
    amount: string,
    category: string,
    note: string
}

//Main component
function TransactionForm(types : Props) {
    const [formData, setFormData] = useState(types);

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
        //Sending data to the backend
        await axios.post("http://localhost:5000/api/transactions", {
            ...formData,
            amount: parseFloat(formData.amount) //Converting String to number
        });

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