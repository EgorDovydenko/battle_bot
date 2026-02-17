import pool from './index.js';

export const getAvailableEvents = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM events WHERE tickets_left > 0 ORDER BY event_date'
  );
  return rows;
};

export const decrementTicket = async (eventId) => {
  return pool.query(
    `
    UPDATE events
    SET tickets_left = tickets_left - 1
    WHERE id = $1 AND tickets_left > 0
    `,
    [eventId]
  );
};
