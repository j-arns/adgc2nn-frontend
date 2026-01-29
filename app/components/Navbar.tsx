import React, { useState } from 'react';
import { FlaskConical, Menu, X, Activity } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isPvap = pathname === '/pvap';

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
                                <FlaskConical className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-lg text-slate-900 tracking-tight">
                                Model <span className="text-slate-400 font-normal">Suite</span>
                            </span>
                        </Link>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            <Link
                                href="/pvap"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isPvap
                                        ? 'border-blue-500 text-slate-900'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    }`}
                            >
                                <Activity className={`w-4 h-4 mr-2 ${isPvap ? 'text-blue-500' : 'text-slate-400'}`} />
                                adGC<sup className="text-xs">2</sup>NN model
                            </Link>
                        </div>
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
                        <Link
                            href="/pvap"
                            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isPvap
                                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                                    : 'border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700'
                                }`}
                        >
                            adGC<sup className="text-xs">2</sup>NN model
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}