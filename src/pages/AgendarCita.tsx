import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonButton,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAlert,
  IonToast,
  IonIcon
} from '@ionic/react';
import {
  calendarOutline,
  personOutline,
  callOutline,
  cutOutline,
  timeOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
  sparklesOutline
} from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import { getServicios, getHorariosOcupados, agendarCita } from '../services/citasService';
import { BARBEROS, type Servicio, type Cita } from '../data/initialData';
import { TimeSlotSelector } from '../components/TimeSlotSelector';
import { WhatsAppFab } from '../components/WhatsAppFab';

interface LocationState {
  servicioSeleccionado?: string;
}

export const AgendarCita: React.FC = () => {
  const location = useLocation();
  const locationState = location.state as LocationState | null;

  // Lista de servicios para el selector
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [serviciosCargando, setServiciosCargando] = useState<boolean>(true);

  // Formulario
  const [nombre, setNombre] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [servicio, setServicio] = useState<string>('');
  const [barbero, setBarbero] = useState<string>(BARBEROS[0].nombre);

  // Fecha predeterminada: hoy o mañana si hoy es domingo
  const getFechaValidaInicial = (): string => {
    const hoy = new Date();
    // Si hoy es domingo (0), avanzamos a lunes
    if (hoy.getDay() === 0) {
      hoy.setDate(hoy.getDate() + 1);
    }
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  };

  const [fecha, setFecha] = useState<string>(getFechaValidaInicial());
  const [hora, setHora] = useState<string>('');

  // Disponibilidad de horarios
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const [cargandoHorarios, setCargandoHorarios] = useState<boolean>(false);

  // Estado del proceso de guardado
  const [guardando, setGuardando] = useState<boolean>(false);
  const [errorValidacion, setErrorValidacion] = useState<string | null>(null);

  // Alerta de éxito con resumen
  const [citaConfirmada, setCitaConfirmada] = useState<Cita | null>(null);
  const [mostrarAlertaExito, setMostrarAlertaExito] = useState<boolean>(false);
  const [mostrarToast, setMostrarToast] = useState<string | null>(null);

  // Fecha mínima (hoy) para el ion-datetime
  const fechaMinima = new Date().toISOString().split('T')[0];

  // Cargar lista de servicios
  useEffect(() => {
    const fetchServicios = async () => {
      setServiciosCargando(true);
      try {
        const data = await getServicios();
        setServicios(data);

        // Si viene un servicio pre-seleccionado desde otra pantalla
        if (locationState?.servicioSeleccionado) {
          setServicio(locationState.servicioSeleccionado);
        } else if (data.length > 0 && !servicio) {
          setServicio(data[0].nombre);
        }
      } catch (err) {
        console.error('Error al cargar servicios para agendar:', err);
      } finally {
        setServiciosCargando(false);
      }
    };

    fetchServicios();
  }, [locationState]);

  // Consultar horarios ocupados cuando cambie barbero o fecha
  useEffect(() => {
    const consultarDisponibilidad = async () => {
      if (!barbero || !fecha) return;

      setCargandoHorarios(true);
      try {
        const ocupados = await getHorariosOcupados(barbero, fecha);
        setHorariosOcupados(ocupados);

        // Si la hora seleccionada actualmente está ocupada en el nuevo barbero/fecha, la deseleccionamos
        if (hora && ocupados.includes(hora)) {
          setHora('');
        }
      } catch (err) {
        console.error('Error al consultar horarios ocupados:', err);
      } finally {
        setCargandoHorarios(false);
      }
    };

    consultarDisponibilidad();
  }, [barbero, fecha]);

  // Función para deshabilitar domingos en ion-datetime
  const isDateEnabled = (dateIsoString: string) => {
    try {
      const parts = dateIsoString.split('T')[0].split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);

      // Si es domingo (0), desactivar
      if (d.getDay() === 0) {
        return false;
      }

      return true;
    } catch {
      return true;
    }
  };

  const handleFechaChange = (e: CustomEvent) => {
    const valor = e.detail.value;
    if (valor) {
      // Extraer solo YYYY-MM-DD
      const fechaString = typeof valor === 'string' ? valor.split('T')[0] : String(valor);
      setFecha(fechaString);
    }
  };

  const validarFormulario = (): boolean => {
    setErrorValidacion(null);

    if (!nombre.trim()) {
      setErrorValidacion('Por favor ingresa tu nombre completo.');
      return false;
    }

    if (!telefono.trim()) {
      setErrorValidacion('Por favor ingresa tu número de contacto.');
      return false;
    }

    const cleanTel = telefono.replace(/\D/g, '');
    if (cleanTel.length < 8) {
      setErrorValidacion('Ingresa un teléfono válido (al menos 8 dígitos numéricos).');
      return false;
    }

    if (!servicio) {
      setErrorValidacion('Selecciona el servicio que deseas agendar.');
      return false;
    }

    if (!barbero) {
      setErrorValidacion('Selecciona tu barbero de preferencia.');
      return false;
    }

    if (!fecha) {
      setErrorValidacion('Por favor elige una fecha para tu cita.');
      return false;
    }

    if (!hora) {
      setErrorValidacion('Por favor selecciona un horario disponible.');
      return false;
    }

    return true;
  };

  const handleConfirmarCita = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setGuardando(true);
    setErrorValidacion(null);

    try {
      const resultado = await agendarCita({
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        servicio,
        barbero,
        fecha,
        hora
      });

      if (resultado.success && resultado.cita) {
        setCitaConfirmada(resultado.cita);
        setMostrarAlertaExito(true);
        setMostrarToast('¡Cita agendada con éxito!');

        // Actualizar horarios ocupados
        setHorariosOcupados((prev) => [...prev, hora]);

        // Limpiar campos para una nueva cita
        setNombre('');
        setTelefono('');
        setHora('');
      } else {
        setErrorValidacion(resultado.error || 'No se pudo agendar la cita. Inténtalo de nuevo.');
      }
    } catch (err: any) {
      setErrorValidacion(err?.message || 'Ocurrió un error al procesar la reserva.');
    } finally {
      setGuardando(false);
    }
  };

  const formatearFechaLegible = (fechaIso: string) => {
    try {
      const [year, month, day] = fechaIso.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString('es-CL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return fechaIso;
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="brand-font" style={{ textAlign: 'center' }}>
            AGENDAR CITA
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding-bottom">
        <div className="app-container" style={{ padding: '16px' }}>
          {/* Header intro */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span
              style={{
                color: '#d4af37',
                fontSize: '0.78rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 700
              }}
            >
              Reserva Online
            </span>
            <h2
              className="brand-font"
              style={{
                fontSize: '1.8rem',
                margin: '4px 0 6px 0',
                color: '#ffffff'
              }}
            >
              Tu Turno en M1
            </h2>
            <p style={{ color: '#8e96aa', fontSize: '0.9rem', margin: 0 }}>
              Elige a tu profesional, el día y la hora que mejor te acomode.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleConfirmarCita}>
            <IonCard className="luxury-card" style={{ margin: 0, padding: '16px 12px' }}>
              <IonCardHeader style={{ padding: '4px 8px 16px 8px' }}>
                <IonCardTitle
                  style={{
                    color: '#ffffff',
                    fontSize: '1.15rem',
                    fontFamily: 'var(--font-heading)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <IonIcon icon={sparklesOutline} style={{ color: '#d4af37' }} />
                  Datos de la Reserva
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent style={{ padding: '0 4px' }}>
                {/* 1. Nombre */}
                <div style={{ marginBottom: '16px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#d4af37',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '6px'
                    }}
                  >
                    <IonIcon icon={personOutline} />
                    Nombre y Apellido *
                  </label>
                  <IonItem className="luxury-input-item" lines="none">
                    <IonInput
                      value={nombre}
                      placeholder="Ej. Rodrigo Silva"
                      onIonInput={(e) => setNombre(String(e.detail.value || ''))}
                      required
                    />
                  </IonItem>
                </div>

                {/* 2. Teléfono */}
                <div style={{ marginBottom: '16px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#d4af37',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '6px'
                    }}
                  >
                    <IonIcon icon={callOutline} />
                    Teléfono / WhatsApp *
                  </label>
                  <IonItem className="luxury-input-item" lines="none">
                    <IonInput
                      type="tel"
                      value={telefono}
                      placeholder="Ej. +56 9 1234 5678"
                      onIonInput={(e) => setTelefono(String(e.detail.value || ''))}
                      required
                    />
                  </IonItem>
                </div>

                {/* 3. Servicio (ion-select) */}
                <div style={{ marginBottom: '16px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#d4af37',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '6px'
                    }}
                  >
                    <IonIcon icon={cutOutline} />
                    Servicio *
                  </label>
                  <IonItem className="luxury-input-item" lines="none">
                    {serviciosCargando ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0' }}>
                        <IonSpinner name="dots" style={{ width: '18px', height: '18px', color: '#d4af37' }} />
                        <span style={{ fontSize: '0.88rem', color: '#8891a5' }}>Cargando servicios...</span>
                      </div>
                    ) : (
                      <IonSelect
                        value={servicio}
                        placeholder="Selecciona un servicio"
                        interface="action-sheet"
                        onIonChange={(e) => setServicio(e.detail.value)}
                        style={{ width: '100%', color: '#ffffff' }}
                      >
                        {servicios.map((s) => (
                          <IonSelectOption key={s.nombre} value={s.nombre}>
                            {s.nombre} ({s.duracion} - ${s.precio.toLocaleString('es-CL')})
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    )}
                  </IonItem>
                </div>

                {/* 4. Barbero (ion-select) */}
                <div style={{ marginBottom: '16px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#d4af37',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '6px'
                    }}
                  >
                    <IonIcon icon={personOutline} />
                    Barbero Profesional *
                  </label>
                  <IonItem className="luxury-input-item" lines="none">
                    <IonSelect
                      value={barbero}
                      placeholder="Selecciona a tu barbero"
                      interface="action-sheet"
                      onIonChange={(e) => setBarbero(e.detail.value)}
                      style={{ width: '100%', color: '#ffffff' }}
                    >
                      {BARBEROS.map((b) => (
                        <IonSelectOption key={b.id} value={b.nombre}>
                          {b.nombre} - {b.especialidad}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </div>

                {/* 5. Fecha (ion-datetime sin domingos ni fechas pasadas) */}
                <div style={{ marginBottom: '18px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: '#d4af37',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '8px'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <IonIcon icon={calendarOutline} />
                      Fecha de la Cita (Lun a Sáb) *
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#9fa6b7', fontWeight: 400 }}>
                      Domingos cerrado
                    </span>
                  </label>

                  <div
                    style={{
                      background: '#12141c',
                      borderRadius: '14px',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      padding: '8px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <IonDatetime
                      presentation="date"
                      min={fechaMinima}
                      value={fecha}
                      isDateEnabled={isDateEnabled}
                      onIonChange={handleFechaChange}
                      style={{
                        borderRadius: '12px'
                      }}
                    />
                  </div>

                  <div
                    style={{
                      marginTop: '8px',
                      fontSize: '0.82rem',
                      color: '#d1d5db',
                      textAlign: 'center',
                      textTransform: 'capitalize'
                    }}
                  >
                    Fecha seleccionada: <strong>{formatearFechaLegible(fecha)}</strong>
                  </div>
                </div>

                {/* 6. Horario (chips de 10:00 a 19:00 cada 30 min) */}
                <div style={{ marginBottom: '22px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: '#d4af37',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '4px'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <IonIcon icon={timeOutline} />
                      Horario de Atención *
                    </span>
                    {cargandoHorarios && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#d4af37' }}>
                        <IonSpinner name="dots" style={{ width: '14px', height: '14px' }} />
                        Consultando turnos...
                      </span>
                    )}
                  </label>

                  <TimeSlotSelector
                    horarioSeleccionado={hora}
                    horariosOcupados={horariosOcupados}
                    onSeleccionarHorario={(h) => setHora(h)}
                    isLoading={cargandoHorarios}
                  />
                </div>

                {/* Mensaje de Error de Validación si existe */}
                {errorValidacion && (
                  <div
                    style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#fca5a5',
                      fontSize: '0.86rem'
                    }}
                  >
                    <IonIcon icon={alertCircleOutline} style={{ fontSize: '20px', flexShrink: 0 }} />
                    <span>{errorValidacion}</span>
                  </div>
                )}

                {/* Botón de Confirmación */}
                <IonButton
                  expand="block"
                  type="submit"
                  className="btn-gold"
                  disabled={guardando}
                  style={{
                    height: '50px',
                    margin: '8px 0 0 0',
                    fontWeight: 700,
                    letterSpacing: '1px'
                  }}
                >
                  {guardando ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <IonSpinner name="crescent" style={{ width: '22px', height: '22px' }} />
                      <span>Verificando y Agendando...</span>
                    </div>
                  ) : (
                    <>
                      <IonIcon icon={checkmarkCircleOutline} slot="start" />
                      Confirmar Reserva
                    </>
                  )}
                </IonButton>
              </IonCardContent>
            </IonCard>
          </form>
        </div>

        {/* Floating WhatsApp Button */}
        <WhatsAppFab />

        {/* Alerta de confirmación con el resumen de la cita */}
        <IonAlert
          isOpen={mostrarAlertaExito}
          onDidDismiss={() => setMostrarAlertaExito(false)}
          header="¡Cita Agendada Exitosamente!"
          subHeader="Barbería M1"
          message={`
            Cliente: ${citaConfirmada?.nombre || ''}
            Teléfono: ${citaConfirmada?.telefono || ''}
            Servicio: ${citaConfirmada?.servicio || ''}
            Barbero: ${citaConfirmada?.barbero || ''}
            Fecha: ${citaConfirmada?.fecha ? formatearFechaLegible(citaConfirmada.fecha) : ''}
            Hora: ${citaConfirmada?.hora || ''} hrs
            
            Te esperamos 5 minutos antes para brindarte tu espresso de cortesía.
          `}
          buttons={['Entendido']}
        />

        {/* Notificación Toast */}
        <IonToast
          isOpen={!!mostrarToast}
          message={mostrarToast || ''}
          duration={3000}
          onDidDismiss={() => setMostrarToast(null)}
          position="bottom"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};
