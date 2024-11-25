// Bloque.js
import React, { useState } from 'react';
import ElementoAgregado from './ElementoAgregado';  // Importamos el nuevo componente

function Bloque({ dia, bloque }) {
	const [elementosAgregados, setElementosAgregados] = useState([]);

	const estilo_bloque = "px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:bg-gray-100";

	const agregarElemento = () => {
		setElementosAgregados(prev => [
			...prev,
			`Elemento agregado ${prev.length + 1}`
		]);
	};

	const eliminarElemento = (index) => {
		setElementosAgregados(prev =>
			prev.filter((_, i) => i !== index)  // Filtrar el array excluyendo el elemento con el índice proporcionado
		);
	};

	return (
		<td className={estilo_bloque} onClick={agregarElemento}>
			<div >
				<p>{dia} - {bloque}</p>
				{elementosAgregados.map((elemento, index) => (
					<div >
						<ElementoAgregado
							texto={elemento}
							onDelete={() => eliminarElemento(index)}
						/>
					</div>
				))}
			</div>
		</td>
	);


	/*
	return (
		<td className={estilo_bloque} onClick={agregarElemento}>
			<Droppable droppableId={`${dia}-${bloque}`}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}  // Aplica las propiedades necesarias para el área droppable
						style={{ minHeight: '100px' }}  // Puedes ajustar el estilo del contenedor droppable
					>
						<p>{dia} - {bloque}</p>
						{elementosAgregados.map((elemento, index) => (
							<Draggable key={index} draggableId={index.toString()} index={index}>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}  // Aplica las propiedades necesarias para el item draggable
										{...provided.dragHandleProps}  // Hace que el item sea arrastrable
									>
										<ElementoAgregado
											texto={elemento}
											onDelete={() => eliminarElemento(index)}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}  {}
					</div>
				)}
			</Droppable>
		</td>
	);
	*/
}

export default Bloque;


//TABLE DATA 