import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import LoginOtp from './pages/LoginOtp';  // OTP page
import Cart from './pages/Cart';  // OTP page

// amplify auth
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';


Amplify.configure(awsconfig)
setupIonicReact();

const App: React.FC = () => (
 
  <IonApp>

    <IonReactRouter>

    {/* <Authenticator>

{({ signOut }) => ( */}

        <IonRouterOutlet>

          <Route path="/home" component={Home} exact />
          <Route path="/cart" component={Cart} exact />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          
        </IonRouterOutlet>

      {/* )}
      </Authenticator> */}
    </IonReactRouter>
  </IonApp>
  

);

export default App;
