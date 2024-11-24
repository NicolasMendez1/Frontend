import { useState, useEffect } from 'react';
import profesorRepository from '../../../repositories/ProfesorRepository';
import { Profesor } from '../../../entities';

export default function ListadoProfesores() {
    const [profesores, setProfesores] = useState<Profesor[]>([]);
    const [loading, setLoading] = useState(true);

    const cargarProfesores = async () => {
        if (loading) {
            try {
                setLoading(true);
                const profesoresData = await profesorRepository.getAll();
                setProfesores(profesoresData);
            } catch (error) {
                console.error('Error al cargar los profesores:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        cargarProfesores();
        profesorRepository.subscribe(cargarProfesores);
        return () => {
            profesorRepository.unsubscribe(cargarProfesores);
        };
    }, []);

    if (loading) {
        return <div>Cargando profesores...</div>;
    }

    return (
        <ul className="space-y-2">
            {profesores.map((profesor, index) => (
                <li key={index} className="bg-white p-4 rounded-md shadow">
                    <h3 className="font-bold">{profesor.nombre} {profesor.apellidoPaterno} {profesor.apellidoMaterno}</h3>
                    <p>Código: {profesor.codigo}</p>
                    <p>Tipo: {profesor.esFullTime ? 'Full Time' : 'Part Time'}</p>
                    {!profesor.esFullTime && profesor.bloquesDisponibles && (
                        <div>
                            <p>Bloques Disponibles:</p>
                            <ul className="list-disc pl-5">
                                {profesor.bloquesDisponibles.map((dia, diaIndex) => (
                                    dia.some(bloque => bloque) && (
                                        <li key={diaIndex}>
                                            Día {diaIndex + 1}: {dia.map((bloque, bloqueIndex) => 
                                                bloque ? `Bloque ${bloqueIndex + 1}` : null
                                            ).filter(Boolean).join(', ')}
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