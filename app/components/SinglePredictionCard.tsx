'use client';

import React, { useState } from 'react';
import { Activity, AlertCircle, Loader2 } from 'lucide-react';

/**
 * ----------------------------------------------------------------------
 * INSTRUCTION FOR YOUR LOCAL PROJECT:
 * 1. Uncomment the import below.
 * 2. Delete the temporary `predictSingleAction` function defined below.
 * ----------------------------------------------------------------------
 */
import { predictSingleAction } from '../actions';



interface PredictionResponse {
    smiles: string;
    // Updated to match Backend: 'prediction' instead of 'predicted_vapor_pressure'
    prediction: number | null;
    // Updated to match Backend: 'model' instead of 'model_version'
    model: string;
    error?: string;
}

export function SinglePredictionCard() {
    const [smiles, setSmiles] = useState<string>('Enter SMILES string (e.g., CCO)');
    const [result, setResult] = useState<PredictionResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePredict = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!smiles.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await predictSingleAction(smiles);

            if (!response.success) {
                // Handles HTTP/Network errors (e.g. 500 Internal Server Error)
                throw new Error(response.error || 'Prediction failed');
            }

            const data = response.data as PredictionResponse;

            // Handles Logical Errors returned by backend (e.g. "Invalid SMILES")
            if (data.error) {
                throw new Error(data.error);
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                Single Compound Analysis
            </h2>

            <form onSubmit={handlePredict} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={smiles}
                        onChange={(e) => setSmiles(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition font-mono"
                        placeholder="Enter SMILES string (e.g., CCO)"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                >
                    {loading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        'Predict'
                    )}
                </button>
            </form>

            <div className="mt-6">
                {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                )}

                {result && (
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                        <div>
                            <span className="block text-sm text-indigo-600 font-semibold uppercase tracking-wider">Prediction</span>
                            <span className="text-3xl font-bold text-slate-900">
                                {/* Updated to use result.prediction */}
                                {typeof result.prediction === 'number'
                                    ? result.prediction.toFixed(2)
                                    : 'N/A'}
                                <span className="text-lg font-normal text-slate-500 ml-1">Pa</span>
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="block text-xs text-slate-500">Model Used</span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-indigo-800 border border-indigo-200 shadow-sm mt-1">
                                {/* Updated to use result.model */}
                                {result.model}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}