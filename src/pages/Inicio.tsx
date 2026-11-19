import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import {
  calendarOutline,
  locationOutline,
  timeOutline,
  callOutline,
  cutOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
  cafeOutline
} from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { INFO_BARBERIA } from '../data/initialData';
import { WhatsAppFab } from '../components/WhatsAppFab';

export const Inicio: React.FC = () => {
  const navigate = useNavigate();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="brand-font" style={{ textAlign: 'center' }}>
            BARBERÍA M1
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding-bottom">
        <div className="app-container">
          {/* HERO SECTION */}
          <div
            style={{
              position: 'relative',
              minHeight: '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: '48px 24px',
              borderRadius: '0 0 24px 24px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0,0,0,0.7)',
              backgroundImage: `linear-gradient(rgba(11, 12, 16, 0.72), rgba(11, 12, 16, 0.94)), url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Subtle Gold Frame accent */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                bottom: '12px',
                left: '12px',
                right: '12px',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '16px',
                pointerEvents: 'none'
              }}
            />

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                padding: '6px 14px',
                borderRadius: '30px',
                marginBottom: '16px'
              }}
            >
              <IonIcon icon={cutOutline} style={{ color: '#d4af37', fontSize: '15px' }} />
              <span
                style={{
                  color: '#d4af37',
                  fontSize: '0.78rem',
                  letterSpacing: '1.5px',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}
              >
                Tradición & Estilo Masculino
              </span>
            </div>

            <h1
              className="brand-font"
              style={{
                fontSize: '2.6rem',
                margin: '0 0 12px 0',
                color: '#ffffff',
                fontWeight: 800,
                lineHeight: 1.15,
                textShadow: '0 4px 16px rgba(0, 0, 0, 0.8)'
              }}
            >
              Barbería <span style={{ color: '#d4af37' }}>M1</span>
            </h1>

            <p
              style={{
                fontSize: '1.1rem',
                color: '#d1d5db',
                maxWidth: '460px',
                margin: '0 0 28px 0',
                fontStyle: 'italic',
                fontWeight: 300,
                lineHeight: 1.5
              }}
            >
              "{INFO_BARBERIA.eslogan}"
            </p>

            <IonButton
              className="btn-gold"
              size="large"
              onClick={() => navigate('/agendar')}
              style={{
                '--border-radius': '14px',
                '--padding-start': '28px',
                '--padding-end': '28px',
                height: '48px',
                fontWeight: 700
              }}
            >
              <IonIcon icon={calendarOutline} slot="start" />
              Agendar Cita
            </IonButton>
          </div>

          {/* TARJETA DE INFORMACIÓN DE CONTACTO Y HORARIO */}
          <IonCard className="luxury-card" style={{ marginTop: '24px' }}>
            <IonCardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                  <IonIcon icon={locationOutline} style={{ fontSize: '18px' }} />
                </div>
                <IonCardTitle
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    color: '#ffffff',
                    margin: 0
                  }}
                >
                  Ubicación & Atención
                </IonCardTitle>
              </div>
            </IonCardHeader>

            <IonCardContent>
              {/* Dirección */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.15)'
                }}
              >
                <IonIcon icon={locationOutline} style={{ color: '#d4af37', fontSize: '20px', marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#f3f4f6', fontSize: '0.95rem' }}>
                    Dirección
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '0.88rem', marginTop: '2px' }}>
                    {INFO_BARBERIA.direccion}
                  </div>
                </div>
              </div>

              {/* Horario */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.15)'
                }}
              >
                <IonIcon icon={timeOutline} style={{ color: '#d4af37', fontSize: '20px', marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#f3f4f6', fontSize: '0.95rem' }}>
                    Horario de Apertura
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '0.88rem', marginTop: '2px' }}>
                    {INFO_BARBERIA.horarioSemana}
                  </div>
                  <div style={{ color: '#e57373', fontSize: '0.82rem', marginTop: '2px', fontWeight: 500 }}>
                    {INFO_BARBERIA.horarioDomingo}
                  </div>
                </div>
              </div>

              {/* Teléfono */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0 4px 0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <IonIcon icon={callOutline} style={{ color: '#d4af37', fontSize: '20px' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: '#f3f4f6', fontSize: '0.95rem' }}>
                      Teléfono
                    </div>
                    <div style={{ color: '#d4af37', fontSize: '0.92rem', fontWeight: 600 }}>
                      {INFO_BARBERIA.telefono}
                    </div>
                  </div>
                </div>

                <a
                  href={`tel:${INFO_BARBERIA.telefonoLimpio}`}
                  style={{
                    background: 'rgba(212, 175, 55, 0.15)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    color: '#d4af37',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <IonIcon icon={callOutline} />
                  Llamar
                </a>
              </div>
            </IonCardContent>
          </IonCard>

          {/* PILARES / BENEFICIOS EXCLUSIVOS */}
          <div style={{ padding: '8px 16px 20px 16px' }}>
            <h3
              className="brand-font"
              style={{
                fontSize: '1.25rem',
                color: '#ffffff',
                marginBottom: '14px',
                textAlign: 'center'
              }}
            >
              La Experiencia <span style={{ color: '#d4af37' }}>M1</span>
            </h3>

            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonCol size="6" sizeMd="3">
                  <div
                    style={{
                      background: '#14161f',
                      border: '1px solid rgba(212, 175, 55, 0.15)',
                      borderRadius: '12px',
                      padding: '14px 10px',
                      textAlign: 'center',
                      height: '100%'
                    }}
                  >
                    <IonIcon icon={cutOutline} style={{ color: '#d4af37', fontSize: '24px' }} />
                    <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginTop: '6px' }}>
                      Navaja Clásica
                    </div>
                    <div style={{ color: '#8d95a6', fontSize: '0.74rem', marginTop: '4px' }}>
                      Toalla tibia y perfilado milimétrico
                    </div>
                  </div>
                </IonCol>

                <IonCol size="6" sizeMd="3">
                  <div
                    style={{
                      background: '#14161f',
                      border: '1px solid rgba(212, 175, 55, 0.15)',
                      borderRadius: '12px',
                      padding: '14px 10px',
                      textAlign: 'center',
                      height: '100%'
                    }}
                  >
                    <IonIcon icon={shieldCheckmarkOutline} style={{ color: '#d4af37', fontSize: '24px' }} />
                    <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginTop: '6px' }}>
                      Profesionales
                    </div>
                    <div style={{ color: '#8d95a6', fontSize: '0.74rem', marginTop: '4px' }}>
                      Barberos certificados con años de oficio
                    </div>
                  </div>
                </IonCol>

                <IonCol size="6" sizeMd="3">
                  <div
                    style={{
                      background: '#14161f',
                      border: '1px solid rgba(212, 175, 55, 0.15)',
                      borderRadius: '12px',
                      padding: '14px 10px',
                      textAlign: 'center',
                      height: '100%'
                    }}
                  >
                    <IonIcon icon={sparklesOutline} style={{ color: '#d4af37', fontSize: '24px' }} />
                    <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginTop: '6px' }}>
                      Alta Gama
                    </div>
                    <div style={{ color: '#8d95a6', fontSize: '0.74rem', marginTop: '4px' }}>
                      Ceras, bálsamos y navajas de importación
                    </div>
                  </div>
                </IonCol>

                <IonCol size="6" sizeMd="3">
                  <div
                    style={{
                      background: '#14161f',
                      border: '1px solid rgba(212, 175, 55, 0.15)',
                      borderRadius: '12px',
                      padding: '14px 10px',
                      textAlign: 'center',
                      height: '100%'
                    }}
                  >
                    <IonIcon icon={cafeOutline} style={{ color: '#d4af37', fontSize: '24px' }} />
                    <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginTop: '6px' }}>
                      Cortesía M1
                    </div>
                    <div style={{ color: '#8d95a6', fontSize: '0.74rem', marginTop: '4px' }}>
                      Espresso o bebida fría de bienvenida
                    </div>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

          {/* Quick banner to explore services */}
          <div style={{ padding: '0 16px 24px 16px', textAlign: 'center' }}>
            <IonButton
              fill="outline"
              className="btn-outline-gold"
              onClick={() => navigate('/servicios')}
              style={{ width: '100%', height: '42px' }}
            >
              Ver Menú de Servicios y Productos
            </IonButton>
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        <WhatsAppFab />
      </IonContent>
    </IonPage>
  );
};
