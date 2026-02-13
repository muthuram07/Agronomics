import uuid
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static', 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load the YOLOv8 model
try:
    model = YOLO('best.pt')
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "Agronomics AI API"})

@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({"error": "Model not loaded"}), 500

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        try:
            # Save file
            unique_filename = f"{uuid.uuid4().hex}_{secure_filename(file.filename)}"
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
            file.save(filepath)

            # Predict
            results = model.predict(filepath)
            
            # Process results
            prediction = {
                "label": "Unknown",
                "confidence": 0.0,
                "details": []
            }

            if results and len(results) > 0:
                probs = results[0].probs
                if probs is not None:
                    label_index = probs.top1
                    confidence = float(probs.top1conf.item())
                    label = results[0].names[label_index]
                    
                    prediction = {
                        "label": label,
                        "confidence": confidence,
                        "formatted_confidence": f"{confidence:.2%}"
                    }

            return jsonify(prediction)

        except Exception as e:
            print(f"Prediction error: {e}")
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid file type"}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
