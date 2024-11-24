
interface HorarioProfesorProps {
  disponibilidad: boolean[][]
}

const dias = ['L', 'M', 'X', 'J', 'V', 'S']

export default function HorarioProfesor({ disponibilidad }: HorarioProfesorProps) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-md">
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="w-6"></th>
            {dias.map((dia) => (
              <th key={dia} className="w-8 text-center font-semibold text-gray-600">
                {dia}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(12)].map((_, bloque) => (
            <tr key={bloque}>
              <td className="pr-2 text-right font-medium text-gray-500">{bloque + 1}</td>
              {disponibilidad.map((dia, index) => (
                <td key={index} className="p-1">
                  <div
                    className={`w-full h-4 rounded-sm ${
                      dia[bloque]
                        ? 'bg-green-400 shadow-sm shadow-green-200'
                        : 'bg-red-400 shadow-sm shadow-red-200'
                    }`}
                  ></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
