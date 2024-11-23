import { useState, useEffect } from 'react';
import { salaRepository } from '../../../repositories/SalaRepository';
import { Sala } from '../../../entities/Sala';

export default function ListadoSalas() {
    const [salas, setSalas] = useState<Sala[]>([]);
    const [loading, setLoading] = useState(true);

    const cargarSalas = async () => {
        if (loading) {
            try {
                setLoading(true);
                const salasData = await salaRepository.getAll();
                setSalas(salasData);
            } catch (error) {
                console.error('Error al cargar las salas:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        cargarSalas();
    }, []);

    if (loading) {
        return <div>Cargando salas...</div>;
    }

    return (
        <ul className="space-y-2">
            {salas.map((sala, index) => (
                <li key={index} className="bg-white p-4 rounded-md shadow">
                    <h3 className="font-bold">{sala.nombre}</h3>
                    <p>Código: {sala.codigo}</p>
                    <p>Capacidad: {sala.capacidad}</p>
                    <p>Tipo: {sala.esLaboratorio ? 'Laboratorio' : 'Aula'}</p>
                </li>
            ))}
        </ul>
    );
} 

