import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSpinner,
  IonButton,
  IonIcon,
  IonToast,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import {
  cutOutline,
  bagHandleOutline,
  refreshOutline,
  cloudUploadOutline
} from 'ionicons/icons';
import { getServicios, getProductos, seedInitialData } from '../services/citasService';
import { isFirebaseConfigured } from '../services/firebase';
import type { Servicio, Producto } from '../data/initialData';
import { ServiceCard } from '../components/ServiceCard';
import { ProductCard } from '../components/ProductCard';
import { WhatsAppFab } from '../components/WhatsAppFab';

export const ServiciosProductos: React.FC = () => {
  const [segmento, setSegmento] = useState<'servicios' | 'productos'>('servicios');
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [sembrando, setSembrando] = useState<boolean>(false);
  const [mensajeToast, setMensajeToast] = useState<string | null>(null);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const [servs, prods] = await Promise.all([getServicios(), getProductos()]);
      setServicios(servs);
      setProductos(prods);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setMensajeToast('Error al conectar con la base de datos. Mostrando catálogo local.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleRefresh = async (event: CustomEvent) => {
    await cargarDatos();
    event.detail.complete();
  };

  const handleSembrarDatos = async () => {
    setSembrando(true);
    try {
      const res = await seedInitialData(true);
      setMensajeToast(
        `Datos iniciales sembrados con éxito (${res.serviciosAdded} servicios, ${res.productosAdded} productos).`
      );
      await cargarDatos();
    } catch (error: any) {
      setMensajeToast('Error al sembrar datos: ' + (error?.message || 'Error desconocido'));
    } finally {
      setSembrando(false);
    }
  };

  const firebaseActivo = isFirebaseConfigured();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="brand-font" style={{ textAlign: 'center' }}>
            CATÁLOGO & SERVICIOS
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding-bottom">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent pullingIcon={refreshOutline} refreshingSpinner="crescent" />
        </IonRefresher>

        <div className="app-container" style={{ padding: '16px' }}>
          {/* Header intro */}
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <span
              style={{
                color: '#d4af37',
                fontSize: '0.78rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 700
              }}
            >
              Menú de Estilo
            </span>
            <h2
              className="brand-font"
              style={{
                fontSize: '1.8rem',
                margin: '4px 0 6px 0',
                color: '#ffffff'
              }}
            >
              Servicios & Productos
            </h2>
            <p style={{ color: '#8e96aa', fontSize: '0.9rem', margin: 0 }}>
              Selecciona tu ritual de barbería o descubre nuestros productos profesionales para el cuidado masculino.
            </p>
          </div>

          {/* Segment Toggle */}
          <div style={{ marginBottom: '16px' }}>
            <IonSegment
              value={segmento}
              onIonChange={(e) => setSegmento(e.detail.value as 'servicios' | 'productos')}
            >
              <IonSegmentButton value="servicios">
                <IonIcon icon={cutOutline} style={{ marginRight: '6px' }} />
                <IonLabel>Servicios</IonLabel>
              </IonSegmentButton>

              <IonSegmentButton value="productos">
                <IonIcon icon={bagHandleOutline} style={{ marginRight: '6px' }} />
                <IonLabel>Productos</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

          {/* Seed button / Firebase status indicator banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#13151d',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              borderRadius: '10px',
              padding: '8px 12px',
              marginBottom: '16px',
              fontSize: '0.78rem',
              color: '#9fa6b7'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: firebaseActivo ? '#10b981' : '#f59e0b'
                }}
              />
              <span>
                Fuente:{' '}
                <strong style={{ color: '#ffffff' }}>
                  {firebaseActivo ? 'Firestore Cloud' : 'Catálogo Integrado'}
                </strong>
              </span>
            </div>

            <IonButton
              fill="clear"
              size="small"
              onClick={handleSembrarDatos}
              disabled={sembrando}
              style={{
                '--color': '#d4af37',
                fontSize: '0.75rem',
                height: '26px',
                margin: 0
              }}
            >
              {sembrando ? (
                <IonSpinner name="dots" style={{ width: '18px', height: '18px' }} />
              ) : (
                <>
                  <IonIcon icon={cloudUploadOutline} slot="start" />
                  Sembrar Datos
                </>
              )}
            </IonButton>
          </div>

          {/* Loading Indicator */}
          {cargando ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 0',
                color: '#d4af37'
              }}
            >
              <IonSpinner name="crescent" style={{ width: '40px', height: '40px' }} />
              <p style={{ marginTop: '12px', color: '#9fa6b7', fontSize: '0.9rem' }}>
                Cargando catálogo...
              </p>
            </div>
          ) : (
            <>
              {/* TAB SERVICIOS */}
              {segmento === 'servicios' && (
                <div>
                  {servicios.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#8891a5' }}>
                      No se encontraron servicios disponibles.
                    </div>
                  ) : (
                    servicios.map((serv, index) => (
                      <ServiceCard key={serv.id || `serv-${index}`} servicio={serv} />
                    ))
                  )}
                </div>
              )}

              {/* TAB PRODUCTOS */}
              {segmento === 'productos' && (
                <div>
                  {productos.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#8891a5' }}>
                      No se encontraron productos disponibles.
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '12px'
                      }}
                    >
                      {productos.map((prod, index) => (
                        <ProductCard key={prod.id || `prod-${index}`} producto={prod} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Floating WhatsApp Button */}
        <WhatsAppFab />

        {/* Notification Toast */}
        <IonToast
          isOpen={!!mensajeToast}
          message={mensajeToast || ''}
          duration={3500}
          onDidDismiss={() => setMensajeToast(null)}
          position="bottom"
          style={{ '--background': '#1f2430', '--color': '#d4af37' }}
        />
      </IonContent>
    </IonPage>
  );
};
