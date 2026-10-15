import useItems from '@/Hooks/useItems';
import CampusDashboardLayout from '@/Layouts/CampusDashboardLayout';
import { Head } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import DeleteModal from './DeleteModal';
import ItemModal from './ItemModal';
import OverviewView, { getRecentReports } from './OverviewView';
import ProductsView from './ProductsView';
import Toast from './Toast';

/**
 * dashboard.html + products.html in one React component.
 *
 * ONE useItems() call feeds BOTH views, the sidebar badge and the stat tiles,
 * so adding / editing / deleting a product updates the Dashboard and the
 * Product Management table at the same time (and it is all saved in the database).
 *
 * /dashboard opens with  initialView="overview"
 * /products  opens with  initialView="products"
 */
export default function CampusApp({ initialView = 'overview' }) {
    const { items, loading, error, createItem, updateItem, deleteItem } = useItems();

    const [view, setView] = useState(initialView);
    const [search, setSearch] = useState('');
    const [editor, setEditor] = useState({ open: false, item: null });
    const [deleting, setDeleting] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', tone: 'success' });
    const timer = useRef();

    useEffect(() => () => clearTimeout(timer.current), []);

    const showToast = (message, tone = 'success') => {
        setToast({ show: true, message, tone });
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2500);
    };

    const openCreate = () => setEditor({ open: true, item: null });
    const openEdit = (item) => setEditor({ open: true, item });
    const closeEditor = useCallback(() => setEditor((e) => ({ ...e, open: false })), []);
    const closeDelete = useCallback(() => setDeleting(null), []);

    // called by <ItemModal>; if the API fails the error is thrown back so the modal can show it
    const handleSave = async (payload) => {
        if (editor.item) {
            await updateItem(editor.item.id, payload);
            showToast('Item updated successfully');
        } else {
            await createItem(payload);
            showToast('Item created successfully');
        }
        closeEditor();
    };

    const handleDelete = async () => {
        try {
            await deleteItem(deleting.id);
            showToast('Item deleted');
        } catch (e) {
            showToast('Could not delete the item', 'error');
        }
        setDeleting(null);
    };

    return (
        <CampusDashboardLayout
            view={view}
            setView={setView}
            itemCount={items.length}
            recentCount={getRecentReports(items).length}
            search={search}
            onSearch={setSearch}
            onReportItem={() => {
                setView('products');
                openCreate();
            }}
        >
            <Head title={view === 'products' ? 'Product Management' : 'Dashboard'} />

            {view === 'products' ? (
                <ProductsView
                    items={items}
                    loading={loading}
                    error={error}
                    search={search}
                    onSearch={setSearch}
                    onAdd={openCreate}
                    onEdit={openEdit}
                    onDelete={setDeleting}
                />
            ) : (
                <OverviewView items={items} onManage={() => setView('products')} />
            )}

            <ItemModal open={editor.open} item={editor.item} onClose={closeEditor} onSave={handleSave} />
            <DeleteModal item={deleting} onClose={closeDelete} onConfirm={handleDelete} />
            <Toast toast={toast} />
        </CampusDashboardLayout>
    );
}
