import os, random, time
from flask import Flask, jsonify
app = Flask(__name__)
VERSION = os.environ.get("APP_VERSION", "v1")

@app.get("/health")
def health():
    return jsonify(status="ok")

@app.get("/notify")
def notify():
    return jsonify(message="notification sent", version=VERSION)

@app.get("/flaky")
def flaky():
    if random.random() < 0.5:
        return jsonify(error="unstable", version=VERSION), 503
    return jsonify(message="ok", version=VERSION)

@app.get("/slow")
def slow():
    time.sleep(3)
    return jsonify(message="slow ok", version=VERSION)
