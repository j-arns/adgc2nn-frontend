'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/app/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center p-6 md:p-12">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <header className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
              Select a Prediction Model
            </h1>
            <p className="text-xl text-slate-600">
              Choose from our available scientific reference models based on Graph Neural Networks
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-lg mx-auto">
            <Link href="/pvap" className="group">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200 text-left">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  PVAP Model &rarr;
                </h3>
                <p className="mt-3 text-slate-600">
                  Saturation Vapor Pressure Estimator (298 K) using adGC2NN.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}