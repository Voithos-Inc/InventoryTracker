// lib/exportUtils.ts - Export inventory to CSV
import { InventoryItem } from '@/types/inventory';
import { Platform } from 'react-native';

/**
 * Export inventory to CSV format
 */
export async function exportToCSV(items: InventoryItem[]): Promise<string> {
    // CSV Headers
    const headers = [
        'Category',
        'Item Name',
        'FOH Quantity',
        'BOH Quantity',
        'Total Quantity',
        'Units',
        'Low Stock Threshold'
    ];

    // Generate CSV rows
    const rows = items
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => a.category.localeCompare(b.category))
        .map(item => {
        const totalQty = item.foh_quantity + item.boh_quantity;
        return [
            item.category,
            `"${item.name}"`,
            item.foh_quantity,
            item.boh_quantity,
            totalQty,
            item.units,
            item.low_stock_threshold || ""
        ];
    });

    // Combine headers and rows
    return [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');
}
export async function saveAndShareCSV(items: InventoryItem[]): Promise<void> {
    try {
        const csvContent = await exportToCSV(items);

        // Generate filename with timestamp
        const timestamp = new Date().toISOString();
        const filename = `inventory_${timestamp}.csv`;

        if (Platform.OS === 'web') {
            // Create blob and trigger download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);

            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);

            window.alert(`✓ Successfully exported ${items.length} items to ${filename}`);
        } else {
            // Mobile: Log CSV (you can enhance this with expo-sharing if needed)
            console.log('CSV Export:\n', csvContent);
            alert(`Export ready with ${items.length} items.\n\nCheck console for CSV data, or use the web version for full file download.`);
        }
    } catch (error) {
        console.error('Error exporting CSV:', error);
        if (Platform.OS === 'web') {
            window.alert('Error: Failed to export inventory.');
        } else {
            alert('Error: Failed to export inventory.');
        }
        throw error;
    }
}