export interface Servicio {
  id?: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  precio: number;
  popular?: boolean;
}

export interface Producto {
  id?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export interface Barbero {
  id: string;
  nombre: string;
  especialidad: string;
  avatar: string;
}

export interface Cita {
  id?: string;
  nombre: string;
  telefono: string;
  servicio: string;
  barbero: string;
  fecha: string; // YYYY-MM-DD
  hora: string;  // HH:mm
  creadaEn: string;
}

export const SERVICIOS_INICIALES: Servicio[] = [
  {
    nombre: 'Corte clásico',
    descripcion: 'Corte tradicional a tijera y máquina con lavado, perfilado de patillas y peinado con producto premium.',
    duracion: '30 min',
    precio: 18000,
    popular: true
  },
  {
    nombre: 'Corte + barba',
    descripcion: 'Servicio completo: corte personalizado, toalla caliente y ritual de barba con aceites esenciales.',
    duracion: '45 min',
    precio: 25000,
    popular: true
  },
  {
    nombre: 'Afeitado con toalla caliente',
    descripcion: 'Experiencia clásica con doble toalla tibia, espuma aromática batida y afeitado al ras con navaja tradicional.',
    duracion: '30 min',
    precio: 16000
  },
  {
    nombre: 'Perfilado de barba',
    descripcion: 'Alineación de contornos con navaja, rebaje de volumen parejo y aplicación de bálsamo hidratante.',
    duracion: '25 min',
    precio: 14000
  },
  {
    nombre: 'Corte infantil',
    descripcion: 'Corte moderno con atención paciente y divertida para niños de hasta 12 años.',
    duracion: '30 min',
    precio: 15000
  }
];

export const PRODUCTOS_INICIALES: Producto[] = [
  {
    nombre: 'Cera para cabello Matte Pomade',
    descripcion: 'Fijación fuerte y acabado mate natural. A base de agua, fácil de retirar.',
    precio: 12000,
    imagen: 'https://images.unsplash.com/photo-1597854710119-a5a8fac75e52?auto=format&fit=crop&w=600&q=80'
  },
  {
    nombre: 'Aceite para barba Cedar & Amber',
    descripcion: 'Nutre la piel, suaviza el vello facial y deja una fragancia amaderada elegante.',
    precio: 15000,
    imagen: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=600&q=80'
  },
  {
    nombre: 'Shampoo Purificante Fresh Mint',
    descripcion: 'Limpieza profunda con aceite de árbol de té y mentol revitalizante para el cuero cabelludo.',
    precio: 14000,
    imagen: 'https://images.unsplash.com/photo-1608248597359-45e69e061a9c?auto=format&fit=crop&w=600&q=80'
  },
  {
    nombre: 'Peine de madera de Sándalo',
    descripcion: 'Doble dentado artesanal anti-frizz, ideal para distribuir aceites y desenredar barbas densas.',
    precio: 8000,
    imagen: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  }
];

export const BARBEROS: Barbero[] = [
  {
    id: 'mateo',
    nombre: 'Mateo Gómez',
    especialidad: 'Especialista en Degradados y Fades Clásicos',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'carlos',
    nombre: 'Carlos Mendoza',
    especialidad: 'Maestro Barbero Tradicional & Toalla Caliente',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'daniel',
    nombre: 'Daniel Ramírez',
    especialidad: 'Experto en Barbas y Estilismo Moderno',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
  }
];

export const HORARIOS_DISPONIBLES: string[] = [
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00'
];

export const INFO_BARBERIA = {
  nombre: 'Barbería M1',
  eslogan: 'Elegancia clásica, precisión moderna.',
  descripcionCorta: 'Tu espacio exclusivo para el cuidado masculino, cortes de alta precisión y afeitados tradicionales.',
  direccion: 'Av. Libertador #1042, Local 4, Centro',
  telefono: '+56 9 8765 4321',
  telefonoLimpio: '56987654321',
  whatsappUrl: 'https://wa.me/56987654321?text=Hola%20Barber%C3%ADa%20M1,%20quisiera%20consultar%20sobre%20sus%20servicios',
  horarioSemana: 'Lunes a Sábado: 10:00 a 20:00 hrs',
  horarioDomingo: 'Domingos: Cerrado',
  instagram: '@barberia.m1'
};
