
import React, { useState } from 'react';
import { CalculatedIngredient } from '../types';
import { InfoIcon } from './icons';

interface IngredientTableProps {
  ingredients: CalculatedIngredient[];
}

const IngredientTable: React.FC<IngredientTableProps> = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) {
    return <p className="text-gray-600">Ingen ingredienser angivet.</p>;
  }

  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ingrediens
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mængde (g)
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bager %
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ingredients.map((ingredient, index) => (
            <tr key={index} className={`${ingredient.isFlour ? "bg-amber-50" : ""} hover:bg-gray-50`}>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center relative">
                  <span>{ingredient.name}</span>
                  {ingredient.substitutions && (
                    <div 
                      className="ml-2 cursor-pointer"
                      onMouseEnter={() => setActiveTooltip(index)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <InfoIcon className="w-4 h-4 text-blue-500" />
                      {activeTooltip === index && (
                        <div className="absolute left-0 ml-6 w-64 p-2 -mt-2 text-xs text-white bg-gray-800 rounded-md shadow-lg z-10 whitespace-normal break-words">
                           <span className="font-semibold">Tip til erstatning:</span> {ingredient.substitutions}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">{ingredient.quantityGram.toLocaleString('da-DK', { minimumFractionDigits: 0, maximumFractionDigits: 1 })} g</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">{ingredient.bakersPercentage.toFixed(1).replace('.', ',')} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientTable;