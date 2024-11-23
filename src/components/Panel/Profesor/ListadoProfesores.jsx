import { useState, useEffect } from 'react';
import profesorRepository from '../../../repositories/ProfesorRepository';

export default function ListadoProfesores() {
    const [profesores, setProfesores] = useState([]);
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
    }, []);

    if (loading) {
        return <div>Cargando profesores...</div>;
    }

    return (
        <ul className="space-y-2">
            {profesores.map((profesor, index) => (
                <li key={index} className="bg-white p-4 rounded-md shadow">
                    <h3 className="font-bold">{profesor.nombreProfesor}</h3>
                    <p>Código: {profesor.codigo}</p>
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