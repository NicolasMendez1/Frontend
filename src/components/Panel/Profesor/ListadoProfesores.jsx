import React from 'react';

const profesores = [
    { codigoProfesor: "P001", nombreProfesor: "Hugo Araya", es_full_time: true },
    { codigoProfesor: "P002", nombreProfesor: "Pedro Perez", es_full_time: false },
    { codigoProfesor: "P003", nombreProfesor: "Juan Perez", es_full_time: false }
];

export default function ListadoProfesores() {
    return (
        <ul className="space-y-2">
            {profesores.map((profesor, index) => (
                <li key={index} className="bg-white p-4 rounded-md shadow">
                    <h3 className="font-bold">{profesor.nombreProfesor}</h3>
                    <p>Código: {profesor.codigoProfesor}</p>
                    <p>Tipo: {profesor.es_full_time ? 'Full Time' : 'Part Time'}</p>
                    {!profesor.es_full_time && profesor.bloquesDisponibles && (
                        <div>
                            <p>Bloques Disponibles:</p>
                            <ul className="list-disc pl-5">
                                {profesor.bloquesDisponibles.map((dia, index) => (
                                    dia.length > 0 && (
                                        <li key={index}>
                                            Día {index + 1}: {dia.join(', ')}
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
} 