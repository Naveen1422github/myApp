import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonInput, IonButton, IonText, IonItem } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");  // Initialize state
  const [errorMessage, setErrorMessage] = useState<string>("");  // State for error message
  const history = useHistory();  // Hook for navigation

  // New validation function for phone number
  const validatePhoneNumber = (phone: string): boolean => {
    // Check if phone number is exactly 10 digits and all characters are numbers
    return phone.length === 10 && !isNaN(Number(phone));
  };

  const handleGenerateOtp = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Phone number before validation:", phoneNumber);  // Log phone number before validation

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      // If invalid, clear the input and show error message
      console.log("Invalid phone number, clearing input");
      setPhoneNumber("");  // Clear phone number
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    // Clear any previous error message
    setErrorMessage("");

    // Logic for OTP generation
    console.log("OTP generated for phone number: ", phoneNumber);

    // Navigate to the OTP page
    history.push('/loginotp');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* <IonTitle>Login</IonTitle> */}
        </IonToolbar>
      </IonHeader>
      <div className="container">
        <IonContent className="ion-padding">
          <div className="login-container">
            <IonText className="login-title">Log into your account</IonText>
            <IonItem lines="none">
              <IonInput
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onIonChange={(e) => {
                  console.log("Phone number changed: ", e.detail.value);
                  setPhoneNumber(e.detail.value!);
                }}
                className="phone-input"
              />
            </IonItem>
            {/* Show error message if validation fails */}
            {errorMessage && <IonText color="danger">{errorMessage}</IonText>}
            <IonButton expand="block" onClick={handleGenerateOtp} className="otp-button">
              Generate OTP
            </IonButton>
          </div>
        </IonContent>
      </div>
    </IonPage>
  );
};

export default Login;
