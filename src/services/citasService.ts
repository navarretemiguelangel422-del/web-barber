import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
  doc,
  writeBatch
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import {
  SERVICIOS_INICIALES,
  PRODUCTOS_INICIALES,
  type Servicio,
  type Producto,
  type Cita
} from '../data/initialData';

const LOCAL_STORAGE_SERVICIOS_KEY = 'barberia_m1_servicios';
const LOCAL_STORAGE_PRODUCTOS_KEY = 'barberia_m1_productos';
const LOCAL_STORAGE_CITAS_KEY = 'barberia_m1_citas';

/**
 * Inicializa almacenamiento local de respaldo si Firebase no está activo.
 */
const initLocalStorageBackup = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_SERVICIOS_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_SERVICIOS_KEY, JSON.stringify(SERVICIOS_INICIALES));
  }
  if (!localStorage.getItem(LOCAL_STORAGE_PRODUCTOS_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTOS_KEY, JSON.stringify(PRODUCTOS_INICIALES));
  }
  if (!localStorage.getItem(LOCAL_STORAGE_CITAS_KEY)) {
    // Agregamos una cita de ejemplo para hoy para demostrar horarios bloqueados
    const hoy = new Date().toISOString().split('T')[0];
    const citaEjemplo: Cita = {
      id: 'demo-1',
      nombre: 'Alejandro Cruz',
      telefono: '+56912345678',
      servicio: 'Corte clásico',
      barbero: 'Mateo Gómez',
      fecha: hoy,
      hora: '11:00',
      creadaEn: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_STORAGE_CITAS_KEY, JSON.stringify([citaEjemplo]));
  }
};

/**
 * Carga o siembra datos iniciales en Firestore si las colecciones están vacías.
 */
export const seedInitialData = async (force = false): Promise<{ serviciosAdded: number; productosAdded: number }> => {
  if (!isFirebaseConfigured() || !db) {
    console.info('[Seed] Firebase no configurado; restableciendo datos locales.');
    localStorage.setItem(LOCAL_STORAGE_SERVICIOS_KEY, JSON.stringify(SERVICIOS_INICIALES));
    localStorage.setItem(LOCAL_STORAGE_PRODUCTOS_KEY, JSON.stringify(PRODUCTOS_INICIALES));
    return { serviciosAdded: SERVICIOS_INICIALES.length, productosAdded: PRODUCTOS_INICIALES.length };
  }

  try {
    const serviciosCol = collection(db, 'servicios');
    const productosCol = collection(db, 'productos');

    const [serviciosSnap, productosSnap] = await Promise.all([
      getDocs(serviciosCol),
      getDocs(productosCol)
    ]);

    let serviciosCount = 0;
    let productosCount = 0;

    const batch = writeBatch(db);

    if (force || serviciosSnap.empty) {
      for (const serv of SERVICIOS_INICIALES) {
        const docRef = doc(serviciosCol);
        batch.set(docRef, { ...serv, creadaEn: serverTimestamp() });
        serviciosCount++;
      }
    }

    if (force || productosSnap.empty) {
      for (const prod of PRODUCTOS_INICIALES) {
        const docRef = doc(productosCol);
        batch.set(docRef, { ...prod, creadaEn: serverTimestamp() });
        productosCount++;
      }
    }

    if (serviciosCount > 0 || productosCount > 0) {
      await batch.commit();
      console.info(`[Seed] Firestore sembrado exitosamente: ${serviciosCount} servicios, ${productosCount} productos.`);
    }

    return { serviciosAdded: serviciosCount, productosAdded: productosCount };
  } catch (error) {
    console.error('[Seed] Error al sembrar datos en Firestore:', error);
    throw error;
  }
};

/**
 * Obtiene la lista de servicios desde Firestore o fallback local.
 */
export const getServicios = async (): Promise<Servicio[]> => {
  if (isFirebaseConfigured() && db) {
    try {
      const colRef = collection(db, 'servicios');
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        return snap.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Servicio, 'id'>)
        }));
      } else {
        // Si está vacía, sembramos automáticamente
        await seedInitialData(false);
        const retrySnap = await getDocs(colRef);
        return retrySnap.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Servicio, 'id'>)
        }));
      }
    } catch (error) {
      console.warn('[citasService] Error al obtener servicios de Firestore, usando respaldo:', error);
    }
  }

  initLocalStorageBackup();
  const raw = localStorage.getItem(LOCAL_STORAGE_SERVICIOS_KEY);
  return raw ? JSON.parse(raw) : SERVICIOS_INICIALES;
};

/**
 * Obtiene la lista de productos desde Firestore o fallback local.
 */
export const getProductos = async (): Promise<Producto[]> => {
  if (isFirebaseConfigured() && db) {
    try {
      const colRef = collection(db, 'productos');
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        return snap.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Producto, 'id'>)
        }));
      } else {
        // Si está vacía, sembramos automáticamente
        await seedInitialData(false);
        const retrySnap = await getDocs(colRef);
        return retrySnap.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Producto, 'id'>)
        }));
      }
    } catch (error) {
      console.warn('[citasService] Error al obtener productos de Firestore, usando respaldo:', error);
    }
  }

  initLocalStorageBackup();
  const raw = localStorage.getItem(LOCAL_STORAGE_PRODUCTOS_KEY);
  return raw ? JSON.parse(raw) : PRODUCTOS_INICIALES;
};

/**
 * Consulta las citas existentes para un barbero en una fecha determinada.
 * Retorna un arreglo con las horas ocupadas (ej: ['11:00', '15:30']).
 */
export const getHorariosOcupados = async (barbero: string, fecha: string): Promise<string[]> => {
  if (!barbero || !fecha) return [];

  if (isFirebaseConfigured() && db) {
    try {
      const citasCol = collection(db, 'citas');
      const q = query(
        citasCol,
        where('barbero', '==', barbero),
        where('fecha', '==', fecha)
      );
      const snap = await getDocs(q);
      const horasOcupadas = snap.docs.map((d) => d.data().hora as string);
      return horasOcupadas;
    } catch (error) {
      console.warn('[citasService] Error al consultar citas en Firestore, usando respaldo:', error);
    }
  }

  initLocalStorageBackup();
  const raw = localStorage.getItem(LOCAL_STORAGE_CITAS_KEY);
  const citas: Cita[] = raw ? JSON.parse(raw) : [];
  return citas
    .filter((c) => c.barbero === barbero && c.fecha === fecha)
    .map((c) => c.hora);
};

/**
 * Agenda una nueva cita.
 * Incluye validación de horario duplicado previa al guardado.
 */
export const agendarCita = async (
  nuevaCita: Omit<Cita, 'id' | 'creadaEn'>
): Promise<{ success: boolean; cita?: Cita; error?: string }> => {
  const { nombre, telefono, servicio, barbero, fecha, hora } = nuevaCita;

  // 1. Validaciones previas de formato y completitud
  if (!nombre.trim() || !telefono.trim() || !servicio || !barbero || !fecha || !hora) {
    return { success: false, error: 'Por favor completa todos los campos requeridos.' };
  }

  // Validación de teléfono básico (mínimo 8 dígitos)
  const phoneClean = telefono.replace(/\D/g, '');
  if (phoneClean.length < 8) {
    return { success: false, error: 'Ingresa un número de teléfono válido (mínimo 8 dígitos).' };
  }

  // 2. Verificación de doble reserva en tiempo real antes de guardar
  const ocupados = await getHorariosOcupados(barbero, fecha);
  if (ocupados.includes(hora)) {
    return {
      success: false,
      error: `El horario de las ${hora} para ${barbero} ya fue reservado. Por favor selecciona otro horario.`
    };
  }

  const timestampActual = new Date().toISOString();

  // 3. Guardado en Firestore o en fallback
  if (isFirebaseConfigured() && db) {
    try {
      const citasCol = collection(db, 'citas');
      const docRef = await addDoc(citasCol, {
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        servicio,
        barbero,
        fecha,
        hora,
        creadaEn: timestampActual
      });

      return {
        success: true,
        cita: {
          id: docRef.id,
          ...nuevaCita,
          creadaEn: timestampActual
        }
      };
    } catch (error: any) {
      console.error('[citasService] Error al guardar cita en Firestore:', error);
      return {
        success: false,
        error: error?.message || 'Error al conectar con la base de datos al agendar.'
      };
    }
  }

  // Guardado en fallback local
  initLocalStorageBackup();
  const raw = localStorage.getItem(LOCAL_STORAGE_CITAS_KEY);
  const citas: Cita[] = raw ? JSON.parse(raw) : [];

  const citaGuardada: Cita = {
    id: `local-${Date.now()}`,
    nombre: nombre.trim(),
    telefono: telefono.trim(),
    servicio,
    barbero,
    fecha,
    hora,
    creadaEn: timestampActual
  };

  citas.push(citaGuardada);
  localStorage.setItem(LOCAL_STORAGE_CITAS_KEY, JSON.stringify(citas));

  return {
    success: true,
    cita: citaGuardada
  };
};
