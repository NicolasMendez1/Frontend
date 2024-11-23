import React from 'react';

const salas = [
    { codigoSala: "1-108", nombreSala: "Sala 1-108", capacidad: 30 },
    { codigoSala: "1-145", nombreSala: "Sala 1-145", capacidad: 25 },
    { codigoSala: "1-150", nombreSala: "Sala 1-150", capacidad: 35 }
];

export default function ListadoSalas() {
    return (
        <ul className="space-y-2">
            {salas.map((sala, index) => (
                <li key={index} className="bg-white p-4 rounded-md shadow">
                    <h3 className="font-bold">{sala.nombreSala}</h3>
                    <p>Código: {sala.codigoSala}</p>
                    <p>Capacidad: {sala.capacidad}</p>
                </li>
            ))}
        </ul>
    );
} 