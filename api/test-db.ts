import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        // Test 1: Can we import?
        const { db } = await import('../server/db.js');

        // Test 2: Can we use it?
        const { properties } = await import('../shared/schema.js');
        const result = await db.select().from(properties).limit(3);

        res.status(200).json({
            success: true,
            message: 'Database connection works!',
            count: result.length,
            sampleIds: result.map(p => p.id)
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
            stack: error.stack
        });
    }
}
