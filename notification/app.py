from flask import Flask, jsonify
app = Flask(__name__)

@app.get("/health")
def health():
    return jsonify(status="ok")

@app.get("/notify")
def notify():
    return jsonify(message="notification sent", version="v1")
