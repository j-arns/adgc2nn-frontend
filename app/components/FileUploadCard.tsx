'use client';

import React, { useState, useRef } from 'react';
import { Upload, Loader2, AlertCircle, FileText, CheckCircle, ArrowRight } from 'lucide-react';

/**
 * ----------------------------------------------------------------------
 * INSTRUCTION FOR YOUR LOCAL PROJECT:
 * 1. Uncomment the import below.
 * 2. Delete the temporary `predictBatchAction` function defined below.
 * ----------------------------------------------------------------------
 */
import { predictBatchAction } from '../actions';

export function FileUploadCard() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Client-side CSV Generator to match backend format
    const generateCSV = (data: any[]) => {
        const headers = ['SMILES', 'Prediction[Pa]', 'log10-Prediction[Pa]', 'Model'];
        const rows = data.map(item => {
            const pred = item.predicted_vapor_pressure;
            const hasPred = pred !== null && pred !== undefined;
            const rounded = hasPred ? Number(pred).toFixed(2) : 'N/A';
            const logPred = hasPred ? Math.log10(Number(pred)).toFixed(4) : 'N/A';
            const model = item.model_version || 'Unknown';

            return [item.smiles, rounded, logPred, model].join(',');
        });
        return [headers.join(','), ...rows].join('\n');
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setIsLoading(true);
        setStatus('idle');
        setErrorMsg(null);

        // 1. Read File Client-Side
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const text = event.target?.result as string;
                if (!text) throw new Error("File is empty");

                // 2. Parse SMILES (Simple split by newline)
                const smilesList = text.split('\n').map(s => s.trim()).filter(s => s);

                if (smilesList.length === 0) throw new Error("No valid SMILES found in file");

                // 3. Send to Server Action
                const response = await predictBatchAction(smilesList);

                if (!response.success) {
                    throw new Error(response.error || 'Batch processing failed');
                }

                // 4. Generate CSV from JSON response
                const csvContent = generateCSV(response.data || []);
                const blob = new Blob([csvContent], { type: 'text/csv' });

                // 5. Trigger Download
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `predictions_${new Date().getTime()}.csv`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);

                setStatus('success');
            } catch (err: any) {
                console.error(err);
                setStatus('error');
                setErrorMsg(err.message || 'Processing failed');
            } finally {
                setIsLoading(false);
                if (fileInputRef.current) fileInputRef.current.value = '';
                if (status !== 'error') setTimeout(() => setStatus('idle'), 5000);
            }
        };

        reader.onerror = () => {
            setIsLoading(false);
            setStatus('error');
            setErrorMsg("Failed to read file content");
        };

        reader.readAsText(file);
    };

    return (
        <div className="bg-indigo-900 rounded-xl shadow-lg border border-indigo-800 p-6 flex flex-col h-full text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <FileText className="w-32 h-32" />
            </div>

            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 relative z-10">
                <Upload className="w-5 h-5 text-indigo-300" />
                CSV Batch Processing
            </h2>
            <p className="text-indigo-200 text-sm mb-6 relative z-10">
                Upload large datasets for asynchronous processing.
            </p>

            <div
                className={`
                    flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition cursor-pointer group relative z-10
                    ${status === 'error' ? 'border-red-400/50 bg-red-900/20' : 'border-indigo-400/30 hover:border-indigo-400/60 hover:bg-indigo-800/50'}
                `}
                onClick={() => !isLoading && fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleUpload}
                    accept=".csv,.txt"
                    disabled={isLoading}
                />

                {isLoading ? (
                    <div className="flex flex-col items-center animate-pulse">
                        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mb-3" />
                        <span className="text-sm font-medium text-indigo-200">Processing...</span>
                    </div>
                ) : status === 'success' ? (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                            <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white">Done!</span>
                        <span className="text-xs text-indigo-200 mt-1">Download started automatically</span>
                    </div>
                ) : (
                    <>
                        <div className="bg-indigo-800 p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition duration-300">
                            <Upload className="w-6 h-6 text-indigo-200" />
                        </div>
                        <p className="text-sm font-medium text-center text-white">
                            Click to upload CSV
                        </p>
                        <p className="text-xs text-indigo-300 mt-1">or drag and drop</p>
                    </>
                )}
            </div>

            {errorMsg && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2 text-sm text-red-100">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errorMsg}
                </div>
            )}

            {!errorMsg && !isLoading && status === 'idle' && (
                <div className="mt-4 flex items-start gap-2 text-xs text-indigo-300/80">
                    <ArrowRight className="w-4 h-4 mt-0.5 shrink-0" />
                    <p>Supported formats: .csv, .txt (SMILES column required)</p>
                </div>
            )}
        </div>
    );
}