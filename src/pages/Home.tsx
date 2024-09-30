import React, { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonButton, IonText,
  IonGrid, IonRow, IonCol, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonCardContent,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/react';
import { cameraOutline, cart } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useHistory } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import './Home.css';
import Nav from './Nav';

// amplify auth
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'




const Home: React.FC = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]); // Cart items state
  const history = useHistory();

  // Dummy product data
  const products = [
    { id: 1, name: 'Product 1', code: 'P001', img: 'https://images.unsplash.com/photo-1485218126466-34e6392ec754?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, name: 'Product 2', code: 'P002', img: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', code: 'P003', img: 'https://images.unsplash.com/photo-1485218126466-34e6392ec754?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, name: 'Product 4', code: 'P004', img: 'https://via.placeholder.com/150' }
  ];

  // Open the camera
  const openScanner = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera
        });

        if (image.webPath) {
          setCapturedImage(image.webPath);
        }
      } catch (error) {
        console.error('Error opening camera:', error);
      }
    } else {
      const useWebCam = window.confirm("Do you want to open the webcam? Click 'Cancel' to upload an image instead.");
      if (useWebCam) {
        openWebCam();
      } else {
        uploadFile();
      }
    }
  };

  // Open webcam for web
  const openWebCam = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          const videoElement = document.createElement('video');
          videoElement.srcObject = stream;
          videoElement.autoplay = true;
          document.body.appendChild(videoElement);
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
        });
    } else {
      alert('Webcam not supported in this browser.');
    }
  };

  // Upload a file from the file input for web
  const uploadFile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageSrc = e.target?.result as string;
          setCapturedImage(imageSrc);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  // Add a product to the cart
  const addToCart = (product: any) => {
    console.log("Adding product to cart:", product); // Debugging line
    setCartItems((prevItems) => [...prevItems, product]);
  };

  Amplify.configure(awsconfig)

  return (
    <Authenticator>

      {({ signOut }) => (

        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Recent Orders</IonTitle>
              <IonButton color="light" onClick={signOut}>Sign out</IonButton>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <div className="recent-orders">
              <IonGrid>
                <IonRow className="scroll-container">
                  {/* Product List */}
                  {products.map((product) => (
                    <IonCol size="6" key={product.id}>
                      <IonCard className="cardHome" color="light">
                        <div className='imgContainer'>
                          <img alt={product.name} src={product.img} />
                        </div>
                        <IonCardHeader className='cardText'>
                          <IonCardSubtitle className='order-item-text1'>{product.code}</IonCardSubtitle>
                          <IonCardTitle className='order-item-text2'>{product.name}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <IonButton
                            onClick={() => addToCart(product)}
                            className="order-item-btn"
                            color="medium">
                            <IonIcon slot="start" icon={cart} />
                            Add to Cart
                          </IonButton>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </div>



          </IonContent>
          {/* Camera Section */}
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton color="dark" onClick={openScanner}>
              <IonIcon icon={cameraOutline} />
            </IonFabButton>
          </IonFab>

          {/* Pass cartItems as a prop to Nav */}
          <Nav cartItems={cartItems} />
        </IonPage>

      )}
    </Authenticator>
  );
};

export default Home;
