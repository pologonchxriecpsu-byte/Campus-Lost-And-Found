import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

/**
 * Single source of truth for the Lost & Found items.
 *
 * Every page that shows items (Dashboard overview, Product Management, sidebar
 * counters, ...) calls this hook, so they always show what is in the DATABASE:
 *   - the list is loaded from  GET    /items
 *   - add / edit / delete call POST / PUT / DELETE /items  (see routes/web.php)
 *   - the local list is updated after each successful request, so the stat tiles,
 *     charts, sidebar badge and the table all change at the same moment
 *   - it also re-fetches when the browser tab gets focus and every 15 seconds,
 *     so changes made in another tab / by another user show up too.
 */
export default function useItems({ pollMs = 15000 } = {}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const refresh = useCallback(async () => {
        try {
            const { data } = await axios.get(route('items.index'));
            setItems(data);
            setError('');
        } catch (e) {
            setError('Could not load items from the server.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
        const timer = setInterval(refresh, pollMs);
        window.addEventListener('focus', refresh);
        return () => {
            clearInterval(timer);
            window.removeEventListener('focus', refresh);
        };
    }, [refresh, pollMs]);

    // CREATE
    const createItem = async (payload) => {
        const { data } = await axios.post(route('items.store'), payload);
        setItems((prev) => [data, ...prev]);
        return data;
    };

    // UPDATE
    const updateItem = async (id, payload) => {
        const { data } = await axios.put(route('items.update', id), payload);
        setItems((prev) => prev.map((it) => (it.id === id ? data : it)));
        return data;
    };

    // DELETE
    const deleteItem = async (id) => {
        await axios.delete(route('items.destroy', id));
        setItems((prev) => prev.filter((it) => it.id !== id));
    };

    return { items, loading, error, refresh, createItem, updateItem, deleteItem };
}
