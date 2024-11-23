import React from 'react';
import Bloque from './Bloque'; // Importa el componente Bloque

export default function MatrizHorarios2() {

  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const bloques = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const estilo_dia = "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider";
  const etiqueta_dia = (dia) => {
    return <th key={dia} className={estilo_dia}> {dia}</th>;
  }

  const estilo_numero_bloque = "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900";
  const etiqueta_numero_de_bloque = (bloque) => {
    return <td className={estilo_numero_bloque}>{bloque}</td>;
  }

  return (
    <div className="overflow-x-auto shadow-lg ">
      <table className="min-w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50 ">
          <tr>
            <th className={estilo_dia}>Bloque</th>
            {dias.map((dia) => etiqueta_dia(dia))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bloques.map((bloque) => (
            <tr key={bloque}>
              {etiqueta_numero_de_bloque(bloque)}
              {dias.map((dia) => (
                <Bloque key={`${dia}-${bloque}`} dia={dia} bloque={bloque} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

