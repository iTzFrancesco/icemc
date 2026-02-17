import { neon } from '@neondatabase/serverless';

const sql = neon(import.meta.env.VITE_NEON_DATABASE_URL);

// Test function to verify connection
export const testConnection = async () => {
    try {
        const result = await sql`SELECT NOW()`;
        console.log('✅ Database connection successful:', result[0]);
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        return false;
    }
};

export default sql;