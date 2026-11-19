import React from 'react';
import { HORARIOS_DISPONIBLES } from '../data/initialData';

interface TimeSlotSelectorProps {
  horarioSeleccionado: string;
  horariosOcupados: string[];
  onSeleccionarHorario: (hora: string) => void;
  isLoading?: boolean;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  horarioSeleccionado,
  horariosOcupados,
  onSeleccionarHorario,
  isLoading = false
}) => {
  return (
    <div style={{ marginTop: '10px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}
      >
        <span style={{ fontSize: '0.88rem', color: '#a0a7ba' }}>
          Selecciona un horario disponible:
        </span>
        <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: '#8891a5' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#d4af37'
              }}
            />
            Libre
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#ef4444'
              }}
            />
            Ocupado
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(78px, 1fr))',
          gap: '8px'
        }}
      >
        {HORARIOS_DISPONIBLES.map((hora) => {
          const estaOcupado = horariosOcupados.includes(hora);
          const estaSeleccionado = horarioSeleccionado === hora;

          return (
            <button
              key={hora}
              type="button"
              disabled={estaOcupado || isLoading}
              onClick={() => onSeleccionarHorario(hora)}
              style={{
                background: estaSeleccionado
                  ? '#d4af37'
                  : estaOcupado
                  ? 'rgba(239, 68, 68, 0.08)'
                  : '#151821',
                color: estaSeleccionado
                  ? '#0d0f13'
                  : estaOcupado
                  ? '#6b7280'
                  : '#e5e7eb',
                border: estaSeleccionado
                  ? '2px solid #d4af37'
                  : estaOcupado
                  ? '1px solid rgba(239, 68, 68, 0.25)'
                  : '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '10px',
                padding: '9px 4px',
                fontSize: '0.86rem',
                fontWeight: estaSeleccionado ? 700 : 500,
                cursor: estaOcupado ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                boxShadow: estaSeleccionado
                  ? '0 0 12px rgba(212, 175, 55, 0.5)'
                  : 'none',
                opacity: estaOcupado ? 0.6 : 1,
                textDecoration: estaOcupado ? 'line-through' : 'none'
              }}
            >
              <span>{hora}</span>
              {estaOcupado ? (
                <span
                  style={{
                    fontSize: '0.62rem',
                    textDecoration: 'none',
                    color: '#ef4444',
                    fontWeight: 600
                  }}
                >
                  Ocupado
                </span>
              ) : estaSeleccionado ? (
                <span
                  style={{
                    fontSize: '0.62rem',
                    textDecoration: 'none',
                    color: '#0d0f13',
                    fontWeight: 700
                  }}
                >
                  Elegido
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};
