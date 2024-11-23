import React, { useState } from 'react';
import ListadoProfesores from './ListadoProfesores';
import FormularioProfesor from './FormularioProfesor';

export default function PanelProfesor({ onSubmit, profesores }) {
    const [modo, setModo] = useState('crear');

    const SelectorModo = () => {
        const estilo_boton_crear = `mr-2 px-4 py-2 ${modo === 'crear' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`;
        const estilo_boton_listado = `px-4 py-2 ${modo === 'listado' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`;

        return (
            <div className="mb-4">
                <button className={estilo_boton_crear} onClick={() => setModo('crear')}>Crear</button>
                <button className={estilo_boton_listado} onClick={() => setModo('listado')}>Listado</button>
            </div>
        );
    }

    return (
        <div>
            <SelectorModo />
            {modo === 'crear' ? (
                <FormularioProfesor />
            ) : (
                <ListadoProfesores />
            )}
        </div>
    );
} 