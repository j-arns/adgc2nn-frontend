import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://127.0.0.1:3001';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Forward the request to FastAPI
        const backendResponse = await fetch(`${API_URL}/batch_predict`, {
            method: 'POST',
            body: formData,
            // Note: Do not set Content-Type header here; fetch sets it automatically with the boundary for FormData
        });

        if (!backendResponse.ok) {
            return NextResponse.json(
                { error: 'Backend processing failed' },
                { status: backendResponse.status }
            );
        }

        // Stream the file back to the client
        // We pass the headers to preserve the filename and content type
        const headers = new Headers();
        headers.set('Content-Type', backendResponse.headers.get('Content-Type') || 'text/csv');
        headers.set('Content-Disposition', backendResponse.headers.get('Content-Disposition') || 'attachment; filename=predictions.csv');

        return new NextResponse(backendResponse.body, {
            status: 200,
            headers,
        });

    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}