import React, { useState } from 'react';

function Seccion({ seccion }) {
	const { codigo_curso, curso, sala, profesor } = seccion;
	return (
		<div className="mt-2 p-2 bg-blue-50 text-blue-700 rounded border border-blue-200 w-full max-w-[200px] break-words whitespace-pre-line shadow-lg">
			{`${codigo_curso}\n${curso}\n${sala}\n${profesor}`}
		</div>
	);
}

export default Seccion;


/*
 codigo_curso, curso, sala, profesor 



INF-113 
Introduccion a la Computación 1 
Sala 1-108 
Hugo Araya
*/