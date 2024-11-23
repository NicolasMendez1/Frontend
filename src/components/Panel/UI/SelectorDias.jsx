import React from 'react';


const DAYS = ['L', 'M', 'X', 'J', 'V', 'S'];
const BLOCKS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function SelectorDias({ blocks, onBlockToggle }) {
  const isBlockSelected = (dayIndex, blockIndex) => {
    return blocks[dayIndex][blockIndex] === true;
  };


  return (
    <div className="overflow-x-auto">
       <h3 className="text-lg font-bold mb-2">Bloques Disponibles</h3>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-8 px-1 py-1 bg-gray-50 border text-xs">#</th>
            {DAYS.map((day) => (
              <th
                key={day}
                className="w-8 px-1 py-1 bg-gray-50 border text-xs font-medium"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BLOCKS.map((block) => (
            <tr key={block}>
              <td className="px-1 py-1 border bg-gray-50 text-xs text-center">
                {block}
              </td>
              {DAYS.map((_, dayIndex) => (
                <td
                  key={`${dayIndex}-${block}`}
                  className="px-1 py-1 border text-center"
                >
                  <button
                    type="button"
                    onClick={() => onBlockToggle(dayIndex, block)}
                    className={`w-4 h-4 rounded-sm transition-colors    items-center justify-center ${
                      isBlockSelected(dayIndex, block)
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    aria-label={`Bloque ${block}, ${DAYS[dayIndex]}`}
                  >
                    {isBlockSelected(dayIndex, block) && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}