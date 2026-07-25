from flask import Flask, request, jsonify, send_file
import os
from flask_cors import CORS
from main import analyze_image

app = Flask(__name__)
CORS(app) 

# ====== API ======
@app.route("/detect", methods=["POST"])
def detect():
    if "image" not in request.files:
        return jsonify({"error": "No image part"}), 400
        
    file = request.files["image"]
    path = "input.jpg"
    file.save(path)

    try:
        # Call the real YOLO model logic from main.py
        result = analyze_image(path)
        
        return jsonify({
            "score": int(result["score"]),
            "label": str(result["label"]), # "HIGH", "MEDIUM", "LOW"
            "regions": int(result["regions_detected"]),
            "image": str(result["output_image"])
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Error analyzing image: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001)