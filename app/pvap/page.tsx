'use client';

import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { FooterAdgc2nn as Footer } from '@/app/components/Footer_adgc2nn';
import { SinglePredictionCard } from '@/app/components/SinglePredictionCard';
import { BatchPredictionCard } from '@/app/components/BatchPredictionCard';
import { FileUploadCard } from '@/app/components/FileUploadCard';

export default function ScientificPredictor() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <Navbar />
            <div className="max-w-5xl mx-auto space-y-8 p-6 md:p-12">

                {/* Header - Page specific context */}
                <header className="text-center space-y-4 mb-12">
                    <div className="flex items-center justify-center gap-3">
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                            Saturation Vapor Pressure Estimator
                        </h1>
                    </div>
                    <div className="max-w-2xl mx-auto space-y-3">
                        <p className="text-lg text-slate-600 font-medium">
                            Advanced estimation using Adaptive-Depth Graph Convolutional Neural Networks.
                        </p>
                        <p className="text-slate-500 leading-relaxed">
                            Enter a SMILES string of chemical compound to predict its saturation vapor pressure at 298 K using the adGC2NN model.
                        </p>
                    </div>
                </header>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <SinglePredictionCard />
                    <BatchPredictionCard />
                    <FileUploadCard />
                </div>

                <Footer />
            </div>
        </div>
    );
}
