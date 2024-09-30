import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { cartOutline, homeOutline } from 'ionicons/icons';
import './Cart.css';

const Cart: React.FC = () => {
  const history = useHistory();
  const location = useLocation<any>();
  const cartItems = location.state?.cartItems || [];

  const goToHomePage = () => {
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <IonList>
            {cartItems.map((item: any, index: number) => (
              <IonItem key={index}>
                <IonLabel>
                  <h2>{item.name}</h2>
                  <p>{item.code}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
        <IonButton color="light" onClick={goToHomePage}>
          <IonIcon icon={homeOutline} />
          Continue Shopping
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
