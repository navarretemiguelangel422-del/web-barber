import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonButton,
  IonIcon
} from '@ionic/react';
import { timeOutline, cutOutline, calendarOutline, starOutline } from 'ionicons/icons';
import type { Servicio } from '../data/initialData';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  servicio: Servicio;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ servicio }) => {
  const navigate = useNavigate();

  const formatearPrecio = (valor: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(valor);
  };

  const handleAgendar = () => {
    navigate('/agendar', {
      state: { servicioSeleccionado: servicio.nombre }
    });
  };

  return (
    <IonCard className="luxury-card" style={{ margin: '14px 0', position: 'relative' }}>
      {servicio.popular && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'linear-gradient(135deg, #d4af37, #9b7918)',
            color: '#0b0c10',
            fontSize: '0.68rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            padding: '4px 10px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            zIndex: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
          }}
        >
          <IonIcon icon={starOutline} style={{ fontSize: '12px' }} />
          Destacado
        </div>
      )}

      <IonCardHeader style={{ paddingBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(212, 175, 55, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d4af37'
            }}
          >
            <IonIcon icon={cutOutline} style={{ fontSize: '18px' }} />
          </div>
          <IonCardSubtitle
            style={{
              color: '#d4af37',
              fontSize: '0.8rem',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              fontWeight: 600,
              margin: 0
            }}
          >
            Servicio Exclusivo
          </IonCardSubtitle>
        </div>

        <IonCardTitle
          style={{
            color: '#ffffff',
            fontSize: '1.25rem',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            marginTop: '4px'
          }}
        >
          {servicio.nombre}
        </IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p
          style={{
            color: '#a3abbd',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            margin: '0 0 16px 0'
          }}
        >
          {servicio.descripcion}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1px solid rgba(212, 175, 55, 0.15)',
            marginTop: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <IonBadge
              style={{
                background: 'rgba(255, 255, 255, 0.07)',
                color: '#e5e7eb',
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <IonIcon icon={timeOutline} style={{ color: '#d4af37' }} />
              {servicio.duracion}
            </IonBadge>

            <span
              style={{
                color: '#d4af37',
                fontSize: '1.2rem',
                fontWeight: 800,
                letterSpacing: '0.5px'
              }}
            >
              {formatearPrecio(servicio.precio)}
            </span>
          </div>

          <IonButton
            size="small"
            fill="solid"
            className="btn-gold"
            onClick={handleAgendar}
            style={{ margin: 0, height: '34px' }}
          >
            <IonIcon icon={calendarOutline} slot="start" style={{ fontSize: '14px' }} />
            Agendar
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};
