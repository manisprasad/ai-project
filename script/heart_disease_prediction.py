from flask import Flask, request, jsonify  # Import necessary Flask modules
from flask_cors import CORS  # Import CORS for handling cross-origin requests
import pandas as pd  # For data manipulation
import numpy as np  # For numerical operations
from sklearn.linear_model import LogisticRegression  # Logistic Regression model
from sklearn.neighbors import KNeighborsClassifier  # K-Nearest Neighbors model
from sklearn.ensemble import RandomForestClassifier  # Random Forest model
from sklearn.model_selection import train_test_split  # For splitting data
from sklearn.metrics import accuracy_score  # For evaluating model accuracy

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS for all routes to handle cross-origin requests
CORS(app)

# Load dataset and preprocess
df = pd.read_csv('./heart.csv')  # Load the heart disease dataset
X = df.drop('target', axis=1)  # Features (independent variables)
y = df['target']  # Target (dependent variable)

# Split the dataset into training and testing sets (80-20 split)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Initialize models for training
models = {
    "Logistic Regression": LogisticRegression(),  # Logistic Regression model
    "KNN": KNeighborsClassifier(),  # K-Nearest Neighbors model
    "Random Forest Classifier": RandomForestClassifier()  # Random Forest model
}

# Train models and calculate accuracy for each
model_accuracies = {}  # Dictionary to store model accuracies
for name, model in models.items():
    model.fit(X_train, y_train)  # Train the model
    y_pred = model.predict(X_test)  # Predict on the test set
    accuracy = accuracy_score(y_test, y_pred)  # Calculate accuracy
    model_accuracies[name] = accuracy  # Store the accuracy

@app.route('/predict', methods=['POST'])
def predict():
    """
    Endpoint to predict the target value using Random Forest Classifier.

    Request Body:
        JSON object containing input features.

    Response:
        JSON object containing the prediction and model accuracy.
    """
    # Parse input data from the POST request
    data = request.get_json()
    input_data = pd.DataFrame([data])  # Convert input data to DataFrame format

    # Use the Random Forest Classifier for prediction
    model_name = "Random Forest Classifier"
    prediction = models[model_name].predict(input_data)  # Make prediction
    accuracy = model_accuracies[model_name]  # Retrieve model accuracy

    # Debugging logs (optional, can be removed in production)
    print(prediction)  # Print the prediction
    print(accuracy)  # Print the accuracy

    # Return the prediction and accuracy as a JSON response
    return jsonify({
        'prediction': int(prediction[0]),  # Convert prediction to int for JSON
        'accuracy': accuracy  # Include the model's accuracy
    })

if __name__ == '__main__':
    # Run the Flask app in debug mode for easier development and testing
    app.run(debug=True)
