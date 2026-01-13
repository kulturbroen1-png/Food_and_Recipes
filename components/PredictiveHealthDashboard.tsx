import React, { useState, useEffect } from 'react';
import { predictiveHealthService, PatientProfile, PersonalizedRecipe, HealthPrediction } from '../services/predictiveHealthService';
import { HeartPulse, Dna, TrendingUp, Shield, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

interface PredictiveHealthDashboardProps {
  recipe: any;
  patientId?: string;
}

const PredictiveHealthDashboard: React.FC<PredictiveHealthDashboardProps> = ({
  recipe,
  patientId = 'demo-patient'
}) => {
  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [personalizedRecipe, setPersonalizedRecipe] = useState<PersonalizedRecipe | null>(null);
  const [healthPredictions, setHealthPredictions] = useState<HealthPrediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize with demo patient data
    const demoPatient: PatientProfile = {
      id: patientId,
      name: 'Anna Jensen',
      age: 72,
      gender: 'female',
      weight: 68,
      height: 165,
      medicalConditions: ['Hypertension', 'Osteoporosis', 'Vitamin D deficiency'],
      allergies: ['Shellfish'],
      medications: ['Lisinopril', 'Calcium carbonate', 'Vitamin D supplement'],
      labResults: {
        cholesterol: 6.2,
        bloodSugar: 5.8,
        bloodPressure: { systolic: 145, diastolic: 88 },
        vitaminD: 35,
        iron: 12,
        b12: 280
      },
      geneticMarkers: {
        lactase: false,
        glutenSensitivity: 0.3,
        caffeineMetabolism: 'slow',
        folate: true
      },
      nutritionalGoals: {
        proteinTarget: 80,
        carbTarget: 150,
        fatTarget: 60,
        fiberTarget: 25,
        sodiumLimit: 2000,
        calorieTarget: 1800
      }
    };

    predictiveHealthService.addPatient(demoPatient);
    setPatient(demoPatient);

    // Generate personalized recipe
    try {
      const optimized = predictiveHealthService.optimizeRecipeForPatient(recipe, patientId);
      setPersonalizedRecipe(optimized);
    } catch (error) {
      console.error('Failed to optimize recipe:', error);
    }

    // Get health predictions
    try {
      const predictions = predictiveHealthService.predictHealthOutcomes(patientId);
      setHealthPredictions(predictions);
    } catch (error) {
      console.error('Failed to get health predictions:', error);
    }

    setLoading(false);
  }, [recipe, patientId]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-[2rem] border-2 border-blue-200">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-blue-800 font-semibold">Analyzing patient health data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-[2rem] border-2 border-blue-200 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg">
          <Dna size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter leading-none text-blue-800">
            50x Superiority: Predictive Health Integration
          </h2>
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mt-1">
            AI-Powered Personalized Medicine Through Nutrition
          </p>
        </div>
      </div>

      {/* Patient Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <HeartPulse className="text-blue-600" size={24} />
            <h3 className="text-lg font-black uppercase text-blue-800">Patient Profile</h3>
          </div>
          {patient && (
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Age:</strong> {patient.age} years</p>
              <p><strong>Conditions:</strong> {patient.medicalConditions.join(', ')}</p>
              <p><strong>Allergies:</strong> {patient.allergies.join(', ')}</p>
              <p><strong>Medications:</strong> {patient.medications.length} active</p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-green-600" size={24} />
            <h3 className="text-lg font-black uppercase text-green-800">Genetic Profile</h3>
          </div>
          {patient?.geneticMarkers && (
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                {!patient.geneticMarkers.lactase ? (
                  <AlertTriangle className="text-red-500" size={16} />
                ) : (
                  <CheckCircle className="text-green-500" size={16} />
                )}
                <span>Lactase: {!patient.geneticMarkers.lactase ? 'Intolerant' : 'Tolerant'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="text-blue-500" size={16} />
                <span>Gluten Sensitivity: Low</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} />
                <span>Folate: Optimal metabolism</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl border border-purple-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-purple-600" size={24} />
            <h3 className="text-lg font-black uppercase text-purple-800">Health Predictions</h3>
          </div>
          <div className="space-y-2">
            {healthPredictions.slice(0, 3).map((prediction, index) => (
              <div key={index} className="text-xs p-2 rounded-lg bg-purple-50 border border-purple-200">
                <div className="font-semibold text-purple-800">{prediction.condition}</div>
                <div className="text-purple-600">
                  Risk: <span className={`font-bold ${
                    prediction.riskLevel === 'high' ? 'text-red-600' :
                    prediction.riskLevel === 'moderate' ? 'text-orange-600' : 'text-green-600'
                  }`}>{prediction.riskLevel.toUpperCase()}</span>
                </div>
                <div className="text-purple-500">Improvement potential: {prediction.projectedImprovement}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recipe Transformation Demonstration */}
      {personalizedRecipe && (
        <div className="bg-white rounded-2xl border-2 border-green-300 shadow-xl overflow-hidden">
          <div className="bg-green-600 text-white p-6">
            <h3 className="text-2xl font-black uppercase tracking-tighter">
              Recipe Transformation: Standard → Personalized Health Intervention
            </h3>
            <p className="text-sm font-bold uppercase tracking-widest mt-1 opacity-90">
              50x Superiority Demonstration
            </p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Original Recipe */}
              <div className="space-y-4">
                <h4 className="text-xl font-black uppercase text-slate-800 border-b-2 border-slate-300 pb-2">
                  Original Recipe (Generic)
                </h4>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <h5 className="font-bold text-slate-800">{recipe.recipeName}</h5>
                  <p className="text-sm text-slate-600 mt-2">Standard institutional preparation</p>
                  <div className="mt-4 space-y-1">
                    {recipe.ingredients?.slice(0, 5).map((ing: any, index: number) => (
                      <div key={index} className="text-xs text-slate-500">
                        • {ing.name}
                      </div>
                    ))}
                    {recipe.ingredients?.length > 5 && (
                      <div className="text-xs text-slate-400">• ... and {recipe.ingredients.length - 5} more ingredients</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Personalized Recipe */}
              <div className="space-y-4">
                <h4 className="text-xl font-black uppercase text-green-800 border-b-2 border-green-300 pb-2">
                  AI-Optimized for {patient?.name} (Personalized)
                </h4>
                <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
                  <h5 className="font-bold text-green-800">{recipe.recipeName} - Health Optimized</h5>
                  <p className="text-sm text-green-600 mt-2">Personalized medical nutrition intervention</p>

                  {/* Nutritional Adjustments */}
                  <div className="mt-4">
                    <h6 className="font-bold text-green-700 uppercase text-xs mb-2">Nutritional Adjustments:</h6>
                    <div className="space-y-1">
                      {Object.entries(personalizedRecipe.patientOptimizations.nutritionalAdjustments).map(([nutrient, adjustment]) => (
                        <div key={nutrient} className="text-xs flex justify-between">
                          <span className="text-green-700">{nutrient}:</span>
                          <span className={`font-bold ${(adjustment as number) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {(adjustment as number) > 0 ? '+' : ''}{adjustment}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ingredient Substitutions */}
                  {personalizedRecipe.patientOptimizations.ingredientSubstitutions.length > 0 && (
                    <div className="mt-4">
                      <h6 className="font-bold text-green-700 uppercase text-xs mb-2">Smart Substitutions:</h6>
                      <div className="space-y-1">
                        {personalizedRecipe.patientOptimizations.ingredientSubstitutions.map((sub, index) => (
                          <div key={index} className="text-xs bg-green-100 p-2 rounded">
                            <span className="line-through text-red-600">{sub.original}</span>
                            <span className="mx-2 text-green-600">→</span>
                            <span className="font-bold text-green-800">{sub.substitute}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Health Impact Summary */}
            <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-xl">
              <h4 className="text-xl font-black uppercase tracking-tighter mb-4">
                Health Impact: From Basic Nutrition to Medical Intervention
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-bold uppercase text-sm mb-2">Immediate Benefits</h5>
                  <ul className="space-y-1 text-sm">
                    {personalizedRecipe.healthImpact.immediateBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle size={14} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold uppercase text-sm mb-2">Risk Reductions</h5>
                  <div className="space-y-1 text-sm">
                    {Object.entries(personalizedRecipe.healthImpact.riskReductions).map(([risk, reduction]) => (
                      <div key={risk} className="flex justify-between">
                        <span>{risk.replace('_', ' ')}:</span>
                        <span className="font-bold text-yellow-300">-{reduction}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-bold uppercase text-sm mb-2">Safety & Compliance</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Medical Safety:</span>
                      <span className="font-bold text-green-300">
                        {Math.round(personalizedRecipe.compliance.medicalSafety * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Allergy Safety:</span>
                      <span className="font-bold text-green-300">
                        {Math.round(personalizedRecipe.compliance.allergySafety * 100)}%
                      </span>
                    </div>
                    {personalizedRecipe.compliance.medicationInteractions.length > 0 && (
                      <div className="mt-2 p-2 bg-yellow-500/20 rounded text-xs">
                        ⚠️ {personalizedRecipe.compliance.medicationInteractions.length} medication interaction(s) noted
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Competitive Superiority Statement */}
      <div className="mt-8 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white p-8 rounded-2xl text-center">
        <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
          THIS IS 50X SUPERIORITY
        </h3>
        <p className="text-xl font-bold mb-6">
          From Generic Recipes → Personalized Medical Interventions
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-4xl font-black mb-2">🤖</div>
            <h4 className="font-bold uppercase">Master Cater</h4>
            <p className="text-sm opacity-90">Basic inventory system</p>
          </div>
          <div>
            <div className="text-4xl font-black mb-2">📊</div>
            <h4 className="font-bold uppercase">Dankost</h4>
            <p className="text-sm opacity-90">Simple cost calculator</p>
          </div>
          <div className="bg-white/20 p-4 rounded-xl border-2 border-white/30">
            <div className="text-4xl font-black mb-2">🚀</div>
            <h4 className="font-bold uppercase">CaterCare Ultimate</h4>
            <p className="text-sm">AI-Powered Preventive Medicine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveHealthDashboard;