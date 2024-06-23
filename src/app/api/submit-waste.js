import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default async (req, res) => {
    if (req.method === 'POST') {
        const { user_id, wasteType, quantity, material, timestamp } = req.body;
        await pool.query(
            'INSERT INTO waste_entries (user_id, waste_type, quantity, material, timestamp) VALUES ($1, $2, $3, $4, $5)',
            [user_id, wasteType, quantity, material, timestamp]
        );
        res.status(200).json({ success: true });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
