import { useState } from 'react';
import InputText from '../UI/InputTexto';
import InputCheckBox from '../UI/InputCheckBox';
import SelectorDias from '../UI/SelectorDias';
import { Profesor } from '../../../entities/Profesor';
import profesorRepository from '../../../repositories/ProfesorRepository';

export default function FormularioProfesor() {
    const [profesor, setProfesor] = useState<Profesor>({ 
        codigo: 0,
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        esFullTime: false,
        bloquesDisponibles: Array(6).fill([]).map(() => Array(12).fill(false))
    });
    const estilo_submit_button = "w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

    const handleBlockToggle = (dayIndex: number, block: number) => {
        const newBloquesDisponibles = profesor.bloquesDisponibles.map((row, i) => 
            i === dayIndex ? row.map((val, j) => j === block ? !val : val) : [...row]
        );
        setProfesor((prev: Profesor) => ({
            ...prev,
            bloquesDisponibles: newBloquesDisponibles
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(profesor);
        profesorRepository.createProfesor(profesor);
        setProfesor({ 
            codigo: 0,
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            esFullTime: false,
            bloquesDisponibles: Array(6).fill([]).map(() => Array(12).fill(false))
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputText
                label="Código del Profesor"
                value={profesor.codigo.toString()}
                onChange={(newValue) => setProfesor({ ...profesor, codigo: parseInt(newValue) || 0 })}
                required={true}
            />
            <InputText
                label="Nombre"
                value={profesor.nombre}
                onChange={(newValue) => setProfesor({ ...profesor, nombre: newValue })}
                required={true}
            />
            <InputText
                label="Apellido Paterno"
                value={profesor.apellidoPaterno}
                onChange={(newValue) => setProfesor({ ...profesor, apellidoPaterno: newValue })}
                required={true}
            />
            <InputText
                label="Apellido Materno"
                value={profesor.apellidoMaterno}
                onChange={(newValue) => setProfesor({ ...profesor, apellidoMaterno: newValue })}
                required={true}
            />
            <InputCheckBox
                label="Es Full Time"
                checked={profesor.esFullTime}
                onChange={(newValue) => setProfesor({ ...profesor, esFullTime: newValue })}
            />
            {!profesor.esFullTime && (
                <SelectorDias 
                    blocks={profesor.bloquesDisponibles} 
                    onBlockToggle={handleBlockToggle} 
                />
            )}
            <button type="submit" className={estilo_submit_button}>Crear Profesor</button>
        </form>
    );
}



