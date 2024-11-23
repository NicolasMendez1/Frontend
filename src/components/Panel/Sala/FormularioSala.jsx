import React, { useState } from 'react';
import InputText from '../UI/InputTexto';
import InputNumerico from '../UI/InputNumerico';
import InputCheckBox from '../UI/InputCheckBox';

export default function FormularioSala() {
    const [sala, setSala] = useState({ codigoSala: '', nombreSala: '', capacidad: 0 , es_laboratorio: false});
    const estilo_submit_button = "w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

    const handleSubmit = (e) => {
        e.preventDefault();
        //onSubmit(sala);
        setSala({ codigoSala: '', nombreSala: '', capacidad: 0, es_laboratorio: false });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputText
                label="Código de la Sala"
                value={sala.codigoSala}
                onChange={(newValue) => setSala({ ...sala, codigoSala: newValue })}
                required={true}
            />
            <InputText
                label="Nombre de la Sala"
                value={sala.nombreSala}
                onChange={(newValue) => setSala({ ...sala, nombreSala: newValue })}
                required={true}
            />
            <InputNumerico
                label="Capacidad"
                value={sala.capacidad}
                onChange={(newValue) => setSala({ ...sala, capacidad: newValue })}
                required={true}
            />
            <InputCheckBox
                label="Es Laboratorio"
                checked={sala.es_laboratorio}
                onChange={(newValue) => setSala({ ...sala, es_laboratorio: newValue })}
            />
            <button type="submit" className={estilo_submit_button}>Crear Sala</button>
        </form>
    );
} 