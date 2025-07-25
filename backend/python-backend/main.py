from flask import Flask, request, jsonify
from flask_cors import CORS
from gpt4all import GPT4All
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, resources={r"/chatbot": {"origins": "http://localhost:3000"}})  # tillåt bara frontend på 5000

model = GPT4All("mistral-7b-instruct-v0.1.Q4_0.gguf")  # chatmodellen, avkommentera detta och installera den vid användning, går ej att pusha eftersom den är för stor.

client = MongoClient("mongodb://localhost:27017/")
db = client["finance-assistant"]

transactions_collection = db["transactions"]

def check_transaction_query(message: str):
    keywords = ["show", "transactions", "from", "between"]
    return any(word in message.lower() for word in keywords)


@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.json
    input_message = data.get("message")
    print("User message:", input_message)

    try:

        if check_transaction_query(input_message):
            # Enkelt exempel – visa senaste 5 transaktionerna
            transactions = list(transactions_collection.find().sort("date", -1).limit(5))
            response = "\n".join([f"{t['date']}: {t['amount']} SEK - {t['category']}" for t in transactions])
        else:

            response = model.generate(input_message)
            print("Model response:", response)

        if not response:
            response = "Modellen svarade tomt, försök igen."

    except Exception as e:
        print("Fel vid modellkörning:", e)
        response = "Ett fel uppstod vid bearbetning av ditt meddelande."

    return jsonify({"response": response})




print("Starting server...")
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
