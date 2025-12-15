import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'PATCH') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { id } = req.query;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        const { db } = await import('../../server/db.js');
        const { properties } = await import('../../shared/schema.js');
        const { eq } = await import('drizzle-orm');

        // Get the update data from request body
        const updateData = req.body;

        // Update the property
        await db
            .update(properties)
            .set({
                ...updateData,
                updatedAt: new Date().toISOString()
            })
            .where(eq(properties.id, id.trim()));

        // Fetch and return updated property
        const [updatedProperty] = await db
            .select()
            .from(properties)
            .where(eq(properties.id, id.trim()));

        if (!updatedProperty) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.status(200).json(updatedProperty);
    } catch (error: any) {
        console.error('Error updating property:', error);
        res.status(500).json({ error: 'Failed to update property', details: error.message });
    }
}
