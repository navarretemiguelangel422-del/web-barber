import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, cutOutline, calendarOutline } from 'ionicons/icons';

import { Inicio } from './pages/Inicio';
import { ServiciosProductos } from './pages/ServiciosProductos';
import { AgendarCita } from './pages/AgendarCita';

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

/* Theme variables */
import './theme/variables.css';

setupIonicReact({
  mode: 'md'
});

export const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/servicios" element={<ServiciosProductos />} />
            <Route path="/agendar" element={<AgendarCita />} />
            <Route path="/" element={<Navigate to="/inicio" replace />} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="inicio" href="/inicio">
              <IonIcon icon={homeOutline} />
              <IonLabel>Inicio</IonLabel>
            </IonTabButton>

            <IonTabButton tab="servicios" href="/servicios">
              <IonIcon icon={cutOutline} />
              <IonLabel>Servicios</IonLabel>
            </IonTabButton>

            <IonTabButton tab="agendar" href="/agendar">
              <IonIcon icon={calendarOutline} />
              <IonLabel>Agendar</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
