
import React, { useState, useEffect, useCallback } from 'react';
import { Scale } from 'lucide-react';


interface BakeLossCalculatorProps {
  initialWeightGram: number;
  expectedBakeLossPercent?: number;
}

const BakeLossCalculator: React.FC<BakeLossCalculatorProps> = ({ initialWeightGram, expectedBakeLossPercent }) => {
  const [finalWeightGramStr, setFinalWeightGramStr] = useState<string>('');
  const [bakeLossPercent, setBakeLossPercent] = useState<number | null>(null);
  const [expectedFinalWeight, setExpectedFinalWeight] = useState<number | null>(null);
  const [internalStartWeightStr, setInternalStartWeightStr] = useState<string>('');
  const [manualStartWeight, setManualStartWeight] = useState<string>('');

  const activeStartWeight = initialWeightGram > 0 ? initialWeightGram : parseFloat(manualStartWeight) || 0;

  useEffect(() => {
    if (expectedBakeLossPercent !== undefined && activeStartWeight > 0) {
      const loss = activeStartWeight * (expectedBakeLossPercent / 100);
      setExpectedFinalWeight(activeStartWeight - loss);
    } else {
      setExpectedFinalWeight(null);
    }
  }, [activeStartWeight, expectedBakeLossPercent]);

  const calculateLoss = useCallback(() => {
    const finalWeightNum = parseFloat(finalWeightGramStr.replace(',', '.'));
    if (!isNaN(finalWeightNum) && finalWeightNum > 0 && activeStartWeight > 0) {
      if (finalWeightNum > activeStartWeight) {
        setBakeLossPercent(null);
        return;
      }
      const loss = ((activeStartWeight - finalWeightNum) / activeStartWeight) * 100;
      setBakeLossPercent(loss);
    } else {
      setBakeLossPercent(null);
    }
  }, [activeStartWeight, finalWeightGramStr]);

  useEffect(() => {
    calculateLoss();
  }, [finalWeightGramStr, activeStartWeight, calculateLoss]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinalWeightGramStr(event.target.value);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <Scale className="w-5 h-5 mr-2 text-indigo-600" />
        Bagesvindsberegner
      </h3>
      <div className="space-y-3">

        <div>
          <label htmlFor="initialWeight" className="block text-sm font-medium text-gray-700">
            Startvægt (Dej)
          </label>
          {initialWeightGram > 0 ? (
            <p id="initialWeight" className="mt-1 text-lg font-medium text-gray-900">
              {initialWeightGram.toLocaleString('da-DK')} g
            </p>
          ) : (
            <input
              type="number"
              value={manualStartWeight}
              onChange={(e) => setManualStartWeight(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              placeholder="Indtast vægt i gram"
            />
          )}
          {/* 
                Wait, modifying props is bad. 
                Better strategy: Allow BakeLossCalculator to handle its own weight if prop is 0.
             */}
        </div>

        {expectedFinalWeight !== null && (
          <div>
            <label htmlFor="expectedFinalWeight" className="block text-sm font-medium text-gray-700">
              Forventet Bagt Vægt (ved {expectedBakeLossPercent?.toFixed(1).replace('.', ',')}% svind)
            </label>
            <p id="expectedFinalWeight" className="mt-1 text-gray-700">
              ~ {expectedFinalWeight.toFixed(0)} g
            </p>
          </div>
        )}

        <div>
          <label htmlFor="finalWeight" className="block text-sm font-medium text-gray-700">
            Indtast Faktisk Bagt Vægt (g)
          </label>
          <input
            type="text" // Using text to allow comma, will parse later
            id="finalWeight"
            value={finalWeightGramStr}
            onChange={handleInputChange}
            placeholder="f.eks. 850"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {bakeLossPercent !== null && (
          <div className="pt-2">
            <p className="text-sm font-medium text-gray-700">Beregnet Bagesvind:</p>
            <p className="text-2xl font-bold text-indigo-600">
              {bakeLossPercent.toFixed(1).replace('.', ',')}%
            </p>
          </div>
        )}
        {parseFloat(finalWeightGramStr.replace(',', '.')) > activeStartWeight && activeStartWeight > 0 && (
          <p className="text-sm text-red-600 mt-1">
            Faktisk bagt vægt kan ikke være højere end startvægt.
          </p>
        )}
      </div>
    </div>
  );
};

export default BakeLossCalculator;