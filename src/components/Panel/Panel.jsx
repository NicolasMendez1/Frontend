import React, { useState } from 'react';
import PanelCurso from './Curso/PanelCurso';
import PanelProfesor from './Profesor/PanelProfesor';
import PanelSala from './Sala/PanelSala';
import PanelSeccion from './Seccion/PanelSeccion';

function Panel() {
	const [activeTab, setActiveTab] = useState('cursos');

	const handleSubmit = (data) => {
		console.log('Datos enviados:', data);
		// Aquí puedes agregar la lógica para manejar los datos enviados
	};

	return (
		<div className="w-1/4 bg-white p-6 overflow-y-auto shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold mb-4">Formularios</h2>
			<div className="pb-2 gap-2 flex">
				<button
					className={`px-3 py-2 rounded ${activeTab === 'cursos' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
					onClick={() => setActiveTab('cursos')}
				>
					Cursos
				</button>
				<button
					className={`px-3 py-2 rounded ${activeTab === 'salas' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
					onClick={() => setActiveTab('salas')}
				>
					Salas
				</button>
				<button
					className={`px-3 py-2 rounded ${activeTab === 'profesores' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
					onClick={() => setActiveTab('profesores')}
				>
					Profesores
				</button>
				<button
					className={`px-3 py-2 rounded ${activeTab === 'secciones' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
					onClick={() => setActiveTab('secciones')}
				>
					Secciones
				</button>
			</div>
			{activeTab === 'cursos' && <PanelCurso onSubmit={handleSubmit} />}
			{activeTab === 'salas' && <PanelSala onSubmit={handleSubmit} />}
			{activeTab === 'profesores' && <PanelProfesor onSubmit={handleSubmit} />}
			{activeTab === 'secciones' && <PanelSeccion onSubmit={handleSubmit} />}
		</div>
	);
}

export default Panel;



/*
			{activeTab === 'salas' && <FormularioSala onSubmit={handleSubmit} />}
			{activeTab === 'profesores' && <FormularioProfesor onSubmit={handleSubmit} />}

*/