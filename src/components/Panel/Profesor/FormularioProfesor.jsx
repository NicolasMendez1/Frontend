import React, { useState } from 'react';
import InputText from '../UI/InputTexto';
import InputCheckBox from '../UI/InputCheckBox';
import SelectorDias from '../UI/SelectorDias';

export default function FormularioProfesor() {
    const [profesor, setProfesor] = useState({ 
        codigoProfesor: '', 
        nombreProfesor: '', 
        es_full_time: false, 
        bloquesDisponibles: [[], [], [], [], [], [], [], [], [], [], [], []] 
    });
    const estilo_submit_button = "w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

    const handleBlockToggle = (dayIndex, block) => {
        profesor.bloquesDisponibles[dayIndex][block] = !profesor.bloquesDisponibles[dayIndex][block];
        setProfesor((prev) => ({
            ...prev,
            bloquesDisponibles: [...prev.bloquesDisponibles],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //onSubmit(profesor);
        setProfesor({ 
            codigoProfesor: '', 
            nombreProfesor: '', 
            es_full_time: false, 
            bloquesDisponibles: [[], [], [], [], [], [], [], [], [], [], [], []] 
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputText
                label="Código del Profesor"
                value={profesor.codigoProfesor}
                onChange={(newValue) => setProfesor({ ...profesor, codigoProfesor: newValue })}
                required={true}
            />
            <InputText
                label="Nombre del Profesor"
                value={profesor.nombreProfesor}
                onChange={(newValue) => setProfesor({ ...profesor, nombreProfesor: newValue })}
                required={true}
            />
            <InputCheckBox
                label="Es Full Time"
                checked={profesor.es_full_time}
                onChange={(newValue) => setProfesor({ ...profesor, es_full_time: newValue })}
            />
            {!profesor.es_full_time && (
                <SelectorDias 
                    blocks={profesor.bloquesDisponibles} 
                    onBlockToggle={handleBlockToggle} 
                />
            )}
            <button type="submit" className={estilo_submit_button}>Crear Profesor</button>
        </form>
    );
} 