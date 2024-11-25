import React, { useState, useEffect } from 'react';
import Bloque from './Bloque';
import seccionBloqueDiaData from '../../data/seccionBloqueDia.json';
import seccionRepository from '../../repositories/SeccionRepository';
import seccionBloqueDiaRepository from '../../repositories/SeccionBloqueDiaRepository';
export default function MatrizHorario() {
  const [secciones, setSecciones] = useState([]);
  const [seccionesBloqueDia, setSeccionesBloqueDia] = useState([]);
  useEffect(() => {
    const cargarSecciones = async () => {
      const seccionesData = await seccionRepository.getAll();
      setSecciones(seccionesData);
    };
    cargarSecciones();

    const cargarSeccionesBloqueDia = async () => {
      const seccionesBloqueDiaData = await seccionBloqueDiaRepository.getAll();
      setSeccionesBloqueDia(seccionesBloqueDiaData);
    };
    cargarSeccionesBloqueDia();
    
    // Suscribirse a cambios
    seccionRepository.subscribe(cargarSecciones);
    seccionBloqueDiaRepository.subscribe(cargarSeccionesBloqueDia);
    
    // Limpieza
    return () => {
      seccionRepository.unsubscribe(cargarSecciones);
      seccionBloqueDiaRepository.unsubscribe(cargarSeccionesBloqueDia);
    };
  }, []);

  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const bloques = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const diaACodigo = {
    'Lunes': 1,
    'Martes': 2,
    'Miércoles': 3,
    'Jueves': 4,
    'Viernes': 5,
    'Sábado': 6
  };

  const obtenerSecciones = (dia, bloque) => {
    const codigoDia = diaACodigo[dia];
    const seccionesBloque = seccionesBloqueDia.filter(seccionBloque => 
      seccionBloque.codigoDia === codigoDia && 
      seccionBloque.codigoBloque === bloque
    );

    if(seccionesBloque.length > 0) {
      console.log("codigoDia: " + codigoDia);
      console.log("bloque: " + bloque);
      console.log(seccionesBloque);
    } 
    // Enriquecer con la información completa de la sección
    return seccionesBloque.map(seccionBloque => ({
      ...seccionBloque,
      infoSeccion: secciones.find(s => 
        s.codigo === seccionBloque.codigoSeccion && 
        s.codigoCurso === seccionBloque.codigoCurso
      )
    }));
  };

  const estilo_dia = "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider";
  const etiqueta_dia = (dia) => {
    return <th key={dia} className={estilo_dia}> {dia}</th>;
  }

  const estilo_numero_bloque = "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900";
  const etiqueta_numero_de_bloque = (bloque) => {
    return <td className={estilo_numero_bloque}>{bloque}</td>;
  }

  return (
    <div className="overflow-x-auto shadow-lg">
      <table className="min-w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className={estilo_dia}>Bloque</th>
            {dias.map((dia) => etiqueta_dia(dia))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bloques.map((bloque) => (
            <tr key={bloque}>
              {etiqueta_numero_de_bloque(bloque)}
              {dias.map((dia) => {
                const secciones = obtenerSecciones(dia, bloque);
                return (
                  <Bloque 
                    key={`${dia}-${bloque}`} 
                    dia={dia} 
                    bloque={bloque}
                    secciones={secciones} // Ahora pasamos un array de secciones
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

