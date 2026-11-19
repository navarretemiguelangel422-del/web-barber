import React from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { logoWhatsapp } from 'ionicons/icons';
import { INFO_BARBERIA } from '../data/initialData';

export const WhatsAppFab: React.FC = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(INFO_BARBERIA.whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <IonFab
      slot="fixed"
      vertical="bottom"
      horizontal="end"
      style={{
        marginBottom: '65px',
        marginRight: '14px',
        zIndex: 999
      }}
    >
      <IonFabButton
        aria-label="Contactar por WhatsApp"
        className="whatsapp-fab-button"
        onClick={handleClick}
        title="Escríbenos por WhatsApp"
      >
        <IonIcon icon={logoWhatsapp} style={{ fontSize: '28px' }} />
      </IonFabButton>
    </IonFab>
  );
};
