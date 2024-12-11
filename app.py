import uuid
from flask import Flask, request, render_template, jsonify, url_for
import os
from werkzeug.utils import secure_filename
from ultralytics import YOLO

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load the YOLOv8 model (update 'best.pt' with your model's path)
model = YOLO('best.pt')  # Ensure this path is correct

# Function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def reg():
    return render_template('reg.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/pesticide')
def pesticide():
    return render_template('pesticide_details.html')

@app.route('/fertilizers')
def fertilizers():
    return render_template('fertilizers.html')

@app.route('/schemes')
def schemes():
    return render_template('schemes.html')

@app.route('/about')
def about():
    return render_template('about.html')

# Handle the image upload and YOLO prediction
@app.route('/upload', methods=['GET', 'POST'])
def upload_image():
    if request.method == 'POST':
        # Check if the file is in the request
        if 'file' not in request.files:
            return jsonify({"error": "No file part"})

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"})

        if file and allowed_file(file.filename):
            # Save the uploaded file with a unique filename
            unique_filename = f"{uuid.uuid4().hex}_{secure_filename(file.filename)}"
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
            file.save(filepath)

            # Perform YOLO model prediction
            try:
                results = model.predict(filepath)
                if results and len(results) > 0:
                    probs = results[0].probs
                    if probs is not None:
                        label_index = probs.top1
                        confidence = probs.top1conf.item()
                        label = results[0].names[label_index]
                    else:
                        label = "No prediction"
                        confidence = 0.0
                else:
                    label = "No prediction"
                    confidence = 0.0

                # Render result page with prediction
                return render_template(
                    'result.html',
                    label=label,
                    confidence=f"{confidence:.2%}",
                    image_url=url_for('static', filename=f'uploads/{unique_filename}')
                )
            except Exception as e:
                return jsonify({"error": f"Prediction failed: {str(e)}"})

    # If it's a GET request, show the upload form
    return render_template('index.html')

# Starting the app
if __name__ == '__main__':
    app.run(debug=True)
