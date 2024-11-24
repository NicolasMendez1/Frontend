import { useState } from 'react';
import InputText from '../UI/InputTexto';
import InputNumerico from '../UI/InputNumerico';
import InputCheckBox from '../UI/InputCheckBox';
import { Sala } from '../../../entities/Sala';
import SalaRepository from '../../../repositories/SalaRepository';

export default function FormularioSala() {
    const [sala, setSala] = useState<Sala>({ codigo: '', nombre: '', capacidad: 0, esLaboratorio: false });
    const estilo_submit_button = "w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

    const handleSubmit = (e: any) => {
        e.preventDefault();
        SalaRepository.create(sala);
        setSala({ codigo: '', nombre: '', capacidad: 0, esLaboratorio: false });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputText
                label="Código de la Sala"
                value={sala.codigo}
                onChange={(newValue) => setSala({ ...sala, codigo: newValue })}
                required={true}
            />
            <InputText
                label="Nombre de la Sala"
                value={sala.nombre}
                onChange={(newValue) => setSala({ ...sala, nombre: newValue })}
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
                checked={sala.esLaboratorio}
                onChange={(newValue) => setSala({ ...sala, esLaboratorio: newValue })}
            />
            <button type="submit" className={estilo_submit_button}>Crear Sala</button>
        </form>
    );
}