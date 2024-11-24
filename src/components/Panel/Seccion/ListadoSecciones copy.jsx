import React from 'react';

const secciones = [
    { 
        numeroSeccion: 1,
        codigoCurso: "INF-113",
        codigoSala: "1-108",
        codigoProfesor: "P001",
        bloques: [
            { numeroDia: 1, numeroBloque: 1 },
            { numeroDia: 1, numeroBloque: 2 }
        ]
    },
    // Add more sample sections as needed
];

export default function ListadoSecciones() {
    return (
        <ul className="space-y-2">
            {secciones.map((seccion, index) => (
                <li key={index} className="bg-white p-4 rounded-md shadow">
                    <h3 className="font-bold">Sección {seccion.numeroSeccion}</h3>
                    <p>Curso: {seccion.codigoCurso}</p>
                    <p>Sala: {seccion.codigoSala}</p>
                    <p>Profesor: {seccion.codigoProfesor}</p>
                    <div>
                        <p>Bloques:</p>
                        <ul className="list-disc pl-5">
                            {seccion.bloques.map((bloque, idx) => (
                                <li key={idx}>
                                    Día {bloque.numeroDia}, Bloque {bloque.numeroBloque}
                                </li>
                            ))}
                        </ul>
                    </div>
                </li>
            ))}
        </ul>
    );
} 