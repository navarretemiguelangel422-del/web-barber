import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Configuración cargada desde variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/**
 * Verifica si las variables de entorno de Firebase están configuradas correctamente.
 */
export const isFirebaseConfigured = (): boolean => {
  const apiKey = firebaseConfig.apiKey;
  const projectId = firebaseConfig.projectId;

  return Boolean(
    apiKey &&
    projectId &&
    apiKey.trim() !== '' &&
    projectId.trim() !== '' &&
    !apiKey.includes('TU_API_KEY')
  );
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.info('[Firebase] Inicializado correctamente con Firestore.');
  } catch (error) {
    console.warn('[Firebase] Error al inicializar Firebase, operando en modo local fallback:', error);
    db = null;
  }
} else {
  console.info(
    '[Firebase] Variables de entorno no detectadas o incompletas en .env. La aplicación utilizará almacenamiento local para pruebas inmediatas.'
  );
}

export { app, db };
