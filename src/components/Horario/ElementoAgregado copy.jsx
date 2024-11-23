import React, { useState } from 'react';

function ElementoAgregado({ texto }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleInfo = (e) => {
		e.stopPropagation();
		setIsOpen(!isOpen);
	};


	const texto1 = "INF-113\nIntroduccion a la Computación 1\nSala 1-108\nHugo Araya";

	return (
		<div className="mt-2">
			<div
				className="p-2 bg-blue-100 text-blue-800 rounded cursor-pointer"
				onClick={toggleInfo}
			>
				{texto}
			</div>

			{isOpen && (
				<div className="mt-2 p-2 bg-blue-50 text-blue-700 rounded border border-blue-200 w-full max-w-[200px] break-words whitespace-pre-line">
					{texto1}
				</div>

			)}
		</div>
	);
}

export default ElementoAgregado;


/*

INF-113 
Introduccion a la Computación 1 
Sala 1-108 
Hugo Araya
*/