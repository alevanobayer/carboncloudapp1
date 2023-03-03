import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import '@element/themes/velocity';
import { loginRequest } from './authConfig.js';

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
msalInstance.addEventCallback((event) => {

    (event.eventType === EventType.LOGIN_SUCCESS)&&
        localStorage.setItem("jwt", event?.payload?.accessToken);
              
            msalInstance.acquireTokenSilent(loginRequest)
                .then(response => {
                    console.log(response)
                    // get access token from response
                    // response.accessToken
                })
                .catch(err => {
                    // could also check if err instance of InteractionRequiredAuthError if you can import the class.
                    if (err.name === "InteractionRequiredAuthError") {
                        return msalInstance.acquireTokenPopup(loginRequest)
                            .then(response => {
                                console.log(response)
                                // get access token from response
                                // response.accessToken
                            })
                            .catch(err => {
                                console.log("response")
                                // handle error
                            });
                    }
                });
        
})
/**
 * We recommend wrapping most or all of your components in the MsalProvider component. It's best to render the MsalProvider as close to the root as possible.
 */
root.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <App />
        </MsalProvider>
    </React.StrictMode>
);
