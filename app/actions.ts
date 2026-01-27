'use server';

// This file runs strictly on the server.
// The API_URL is never exposed to the client.

const API_URL = process.env.INTERNAL_API_URL || 'http://backend:3001';

export interface ActionResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export async function predictSingleAction(smiles: string): Promise<ActionResponse<any>> {
    try {
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ smiles }),
            cache: 'no-store', // Ensure we don't cache predictions
        });

        if (!response.ok) {
            throw new Error(`Backend Error: ${response.statusText}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Prediction Error:', error);
        return { success: false, error: 'Failed to connect to prediction engine.' };
    }
}

export async function predictBatchAction(smilesList: string[]): Promise<ActionResponse<any[]>> {
    try {
        const response = await fetch(`${API_URL}/batch_predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ smiles_list: smilesList }),
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Backend Error: ${response.statusText}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Batch Error:', error);
        return { success: false, error: 'Failed to process batch request.' };
    }
}