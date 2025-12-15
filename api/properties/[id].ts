```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const { db } = await import('../../server/db.js');
  const { properties } = await import('../../shared/schema.js');
  const { eq } = await import('drizzle-orm');

  try {
    // Handle GET request - fetch property
    if (req.method === 'GET') {
      const [property] = await db.select().from(properties).where(eq(properties.id, id.trim()));
      
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }

      return res.status(200).json(property);
    }

    // Handle PATCH request - update property
    if (req.method === 'PATCH') {
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

      return res.status(200).json(updatedProperty);
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error: any) {
    console.error('Error in properties endpoint:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}
```
