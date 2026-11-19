import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge
} from '@ionic/react';
import type { Producto } from '../data/initialData';

interface ProductCardProps {
  producto: Producto;
}

export const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
  const formatearPrecio = (valor: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(valor);
  };

  return (
    <IonCard className="luxury-card" style={{ margin: '14px 0', overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: '190px', overflow: 'hidden', backgroundColor: '#0f1117' }}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(to top, rgba(17, 19, 25, 0.95), transparent)'
          }}
        />
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <IonBadge
            style={{
              background: 'rgba(15, 17, 21, 0.85)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: '#d4af37',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 800,
              backdropFilter: 'blur(8px)'
            }}
          >
            {formatearPrecio(producto.precio)}
          </IonBadge>
        </div>
      </div>

      <IonCardHeader style={{ paddingTop: '14px', paddingBottom: '4px' }}>
        <IonCardTitle
          style={{
            color: '#ffffff',
            fontSize: '1.2rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700
          }}
        >
          {producto.nombre}
        </IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p
          style={{
            color: '#a0a7ba',
            fontSize: '0.88rem',
            lineHeight: '1.5',
            margin: '0 0 10px 0'
          }}
        >
          {producto.descripcion}
        </p>

        <div
          style={{
            fontSize: '0.78rem',
            color: '#d4af37',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontStyle: 'italic',
            opacity: 0.9
          }}
        >
          Disponible en salón para compra directa
        </div>
      </IonCardContent>
    </IonCard>
  );
};
