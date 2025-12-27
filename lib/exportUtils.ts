// lib/exportUtils.ts - Export inventory to XLSX with formatting
import { InventoryItem, CATEGORY } from '@/types/inventory';
import { Platform } from 'react-native';

/**
 * Export inventory to XLSX format with formatting
 * Creates an HTML table that Excel can open as .xlsx with preserved formatting
 */
export async function exportToXLSX(items: InventoryItem[]): Promise<string> {
    const categories: CATEGORY[] = [
        'DAIRY',
        'REFRIGERATED',
        'BEVERAGES',
        'SAUCES',
        'BAKED GOODS',
        'TOPPINGS',
        'INGREDIENTS'
    ];

    let html = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <meta charset="UTF-8">
    <xml>
        <x:ExcelWorkbook>
            <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                    <x:Name>Inventory</x:Name>
                    <x:WorksheetOptions>
                        <x:Print>
                            <x:ValidPrinterInfo/>
                        </x:Print>
                    </x:WorksheetOptions>
                </x:ExcelWorksheet>
            </x:ExcelWorksheets>
        </x:ExcelWorkbook>
    </xml>
    <style>
        table { 
            border-collapse: collapse; 
            width: 100%; 
            font-family: Arial, sans-serif; 
            font-size: 11pt;
        }
        th, td { 
            border: 1px solid #000000; 
            padding: 8px; 
            text-align: left; 
        }
        .header { 
            background-color: #4472C4; 
            color: white; 
            font-weight: bold; 
            text-align: center; 
            font-size: 12pt;
        }
        .category-row { 
            background-color: #D9D9D9; 
            font-weight: bold; 
        }
        .category-header { 
            text-align: center; 
            font-weight: bold; 
        }
        td { 
            vertical-align: middle; 
        }
        .number { 
            text-align: center; 
        }
    </style>
</head>
<body>
    <table>
        <thead>
            <tr>
                <th class="header">ITEM</th>
                <th class="header">COUNT</th>
                <th class="header">SIZE/UNIT</th>
                <th class="header" colspan="2">INVENTORY NOTES</th>
            </tr>
        </thead>
        <tbody>
`;

    // Process each category
    for (const category of categories) {
        const categoryItems = items
            .filter(item => item.category === category)
            .sort((a, b) => a.name.localeCompare(b.name));

        if (categoryItems.length === 0) continue;

        // Category header row - with FOH/BOH or Fridge/Freezer labels
        const isFridgeFreezer = category === 'SAUCES' || category === 'BAKED GOODS';
        const label1 = isFridgeFreezer ? 'Fridge' : 'FOH';
        const label2 = isFridgeFreezer ? 'Freezer' : 'BOH';

        html += `
            <tr class="category-row">
                <td><strong>${category}</strong></td>
                <td></td>
                <td></td>
                <td class="category-header">${label1}</td>
                <td class="category-header">${label2}</td>
            </tr>
`;

        // Add items in this category
        for (const item of categoryItems) {
            const totalCount = item.foh_quantity + item.boh_quantity;
            const itemName = item.name;
            const units = item.units || '';
            const foh = item.foh_quantity;
            const boh = item.boh_quantity;

            html += `
            <tr>
                <td>${itemName}</td>
                <td class="number">${totalCount}</td>
                <td>${units}</td>
                <td class="number">${foh}</td>
                <td class="number">${boh}</td>
            </tr>
`;
        }
    }

    html += `
        </tbody>
    </table>
</body>
</html>`;

    return html;
}

export async function saveAndShareXLSX(items: InventoryItem[]): Promise<void> {
    try {
        const xlsxContent = await exportToXLSX(items);

        // Generate filename with timestamp
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const filename = `inventory_${dateStr}.xls`; // Use .xls extension for HTML-based Excel file

        if (Platform.OS === 'web') {
            // Create blob and trigger download
            const blob = new Blob([xlsxContent], {
                type: 'application/vnd.ms-excel'
            });
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
            // Mobile: Log content
            console.log('XLSX Export created');
            alert(`Export ready with ${items.length} items.\n\nUse the web version for full file download with formatting.`);
        }
    } catch (error) {
        console.error('Error exporting XLSX:', error);
        if (Platform.OS === 'web') {
            window.alert('Error: Failed to export inventory.');
        } else {
            alert('Error: Failed to export inventory.');
        }
        throw error;
    }
}