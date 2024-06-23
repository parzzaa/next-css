import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { user_id, wasteType, quantity, material, timestamp, first_name, photo_url } = req.body;

        // Ensure user exists
        await pool.query(
            'INSERT INTO users (telegram_id, first_name, photo_url) VALUES ($1, $2, $3) ON CONFLICT (telegram_id) DO UPDATE SET first_name = $2, photo_url = $3',
            [user_id, first_name, photo_url]
        );

        // Get user ID from the database
        const result = await pool.query('SELECT id FROM users WHERE telegram_id = $1', [user_id]);
        const dbUserId = result.rows[0].id;

        // Insert waste entry
        await pool.query(
            'INSERT INTO waste_entries (user_id, waste_type, quantity, material, timestamp) VALUES ($1, $2, $3, $4, $5)',
            [dbUserId, wasteType, quantity, material, timestamp]
        );

        res.status(200).json({ success: true });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

export default handler;
