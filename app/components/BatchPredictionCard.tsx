'use client';

import React, { useState, useRef } from 'react';
import { FileText, Loader2, AlertCircle, Upload } from 'lucide-react';

/**
 * ----------------------------------------------------------------------
 * INSTRUCTION FOR YOUR LOCAL PROJECT:
 * 1. Uncomment the import below.
 * 2. Delete the temporary `predictBatchAction` function defined below.
 * ----------------------------------------------------------------------
 */
import { predictBatchAction } from '../actions';


interface PredictionResponse {
    smiles: string;
    // MATCHED TO BACKEND: 'predicted_vapor_pressure'
    predicted_vapor_pressure: number | string | null;
    // MATCHED TO BACKEND: 'model_version'
    model_version: string;
    error?: string;
    uncertainty?: number;
}

export function BatchPredictionCard() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState<PredictionResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePredict = async () => {
        const smilesList = input.split('\n').filter((line) => line.trim() !== '');
        if (smilesList.length === 0) return;

        setIsLoading(true);
        setResults([]);
        setError(null);

        try {
            // Call the Server Action
            const response = await predictBatchAction(smilesList);

            if (!response.success) {
                // Handle global/network errors from the action
                throw new Error(response.error || 'Batch prediction failed');
            }

            // Cast and set data
            setResults(response.data as PredictionResponse[]);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Batch prediction failed.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            if (text) {
                setInput((prev) => {
                    const cleanPrev = prev.trim();
                    return cleanPrev ? `${cleanPrev}\n${text}` : text;
                });
            }
        };
        reader.onerror = () => setError('Failed to read file.');
        reader.readAsText(file);

        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    Batch Input
                </h2>

                {/* File Upload Trigger */}
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".txt,.csv"
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-sm flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors"
                        title="Load from text file"
                    >
                        <Upload className="w-4 h-4" />
                        Load from file
                    </button>
                </div>
            </div>

            <textarea
                className="w-full flex-1 min-h-[150px] p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none font-mono text-sm"
                placeholder="Enter multiple SMILES strings, one per line..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                onClick={handlePredict}
                disabled={isLoading}
                className="mt-4 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition disabled:opacity-50 flex items-center justify-center"
            >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Run Batch Analysis'}
            </button>

            {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            {results.length > 0 && (
                <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-3 max-h-[200px] overflow-y-auto font-mono text-xs">
                    {results.map((item, idx) => {
                        // Safe number parsing
                        const rawPred = item.predicted_vapor_pressure;
                        const numPred = (rawPred !== null && rawPred !== undefined) ? Number(rawPred) : NaN;
                        const hasValidPrediction = !isNaN(numPred);

                        // Error Logic:
                        // 1. Explicit 'error' key from backend
                        // 2. Or if 'predicted_vapor_pressure' is null/invalid, we treat 'model_version' as the status message
                        const isError = item.error || !hasValidPrediction;
                        const statusMessage = item.error || item.model_version || 'Analysis Failed';

                        return (
                            <div key={idx} className="border-b border-slate-200 last:border-0 py-2">
                                <div className="font-semibold text-slate-700 truncate" title={item.smiles}>{item.smiles}</div>
                                <div className="flex justify-between items-center text-slate-500 mt-1">
                                    {isError ? (
                                        <span className="text-amber-600 flex items-center gap-1.5 font-medium">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            {statusMessage}
                                        </span>
                                    ) : (
                                        <>
                                            <span className="font-medium text-slate-900">
                                                {numPred.toFixed(2)} <span className="text-slate-500 font-normal">Pa</span>
                                            </span>
                                            <span className="text-[10px] uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                                                {item.model_version}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}