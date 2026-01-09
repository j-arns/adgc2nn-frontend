export interface SinglePredictionResponse {
    prediction: number | null;
    model: string;
    error?: string;
}

export interface BatchPredictionItem {
    smiles: string;
    prediction: number | null;
    model: string;
}