import React from 'react';

export function Footer() {
    return (
        <footer className="mt-12 pt-8 border-t border-slate-200 text-slate-600 text-sm leading-relaxed">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h3 className="font-semibold text-slate-900 mb-2">Model Architecture</h3>
                    <div className="mb-4 space-y-2 text-justify">
                        <p>
                            We trained two models for saturation vapor pressure estimation on experimental data.
                            The <strong>adGC<sup className="text-[0.6em]">2</sup>NN-broad</strong> is a general model with broad scope
                            that is suitable for both organic and inorganic molecules and achieves a mean absolute error (MAE)
                            of 0.67 log-units (R<sup>2</sup> = 0.86) on the training data.
                        </p>
                        <p>
                            The <strong>adGC<sup className="text-[0.6em]">2</sup>NN-confined</strong> model is specialized on organic
                            compounds with functional groups often encountered in atmospheric SOA, achieving an even stronger
                            correlation with independent test data (MAE = 0.36 log-units, R<sup>2</sup> = 0.97).
                        </p>
                        <p>
                            The models use molecular descriptors like molar mass alongside molecular graphs containing atom and
                            bond features as representations of molecular structure. In adaptive-depth GC<sup className="text-[0.6em]">2</sup>NN,
                            the number of evaluated graph layers depends on molecular size. The most suitable model is automatically
                            selected for each compound.
                        </p>
                    </div>
                    <p className="italic text-slate-500">
                        Krüger et al., Geosci. Model Dev. 18, 7357–7371, 2025
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Credits</h3>
                    <ul className="space-y-2">
                        <li>Max Planck Institute for Chemistry</li>
                        <li>University of California Irvine</li>
                    </ul>
                    <div className="mt-4">
                        <a
                            href="https://gmd.copernicus.org/articles/18/7357/2025/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium inline-flex items-center gap-1"
                        >
                            Read the Paper <span>&rarr;</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}