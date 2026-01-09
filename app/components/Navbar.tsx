'use client';

import React, { useState } from 'react';
import { FlaskConical, Menu, X, Activity, Layers, BookOpen, Settings } from 'lucide-react';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <FlaskConical className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-lg text-slate-900 tracking-tight">
                                adGC<sup className="text-xs">2</sup>NN <span className="text-slate-400 font-normal hidden sm:inline">Suite</span>
                            </span>
                        </div>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            <a href="#" className="border-blue-500 text-slate-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                <Activity className="w-4 h-4 mr-2" />
                                Predictor
                            </a>
                            <a href="#" className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                <Layers className="w-4 h-4 mr-2" />
                                Models
                            </a>
                            <a href="#" className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                <BookOpen className="w-4 h-4 mr-2" />
                                API Docs
                            </a>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                            System Operational
                        </span>
                        <div className="h-6 w-px bg-slate-200" />
                        <button className="p-1 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden border-t border-slate-200 bg-slate-50">
                    <div className="pt-2 pb-3 space-y-1">
                        <a href="#" className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Predictor</a>
                        <a href="#" className="border-transparent text-slate-500 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Models</a>
                        <a href="#" className="border-transparent text-slate-500 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">API Docs</a>
                        <div className="pt-4 pb-2 border-t border-slate-200 mt-2">
                            <div className="px-4 flex items-center">
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded">System Operational</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}