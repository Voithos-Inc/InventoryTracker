import { categories } from '@/app/_layout';
import {InventoryItem } from '@/types/inventory';
import {Platform} from 'react-native';

let FileSystem: any = null;
let Sharing: any = null;

if (Platform.OS !== 'web') {
  try {
    // Use the legacy entrypoint so writeAsStringAsync is available and doesn't throw
    // (avoids the runtime "deprecated" error)
    const fsModule = require('expo-file-system/legacy');
    FileSystem = fsModule && fsModule.default ? fsModule.default : fsModule;

    const sharingModule = require('expo-sharing');
    Sharing = sharingModule && sharingModule.default ? sharingModule.default : sharingModule;
  } catch (e) {
    console.warn('FileSystem (legacy) or Sharing not available', e);
  }
}


/**
 * Export inventory to XLSX format with formatting
 * Creates an HTML table that Excel can open as .xlsx with preserved formatting
 */
export async function exportToXLSX(items: InventoryItem[]): Promise<string> {
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

  for (const category of categories ?? []) {
    const categoryItems = items
        .filter(item => item.category === category)
        .sort((a, b) => a.name.localeCompare(b.name));

    if (categoryItems.length === 0) continue;

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

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const filename = `inventory_${dateStr}.xls`; // Use .xls extension for HTML-based Excel file

    if (Platform.OS === 'web') {
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
      if (!FileSystem || !Sharing) {
        alert('File system not available. Please install expo-file-system and expo-sharing.');
        return;
      }

      const fileUri = `${(FileSystem && (FileSystem.documentDirectory || FileSystem.cacheDirectory)) || ''}${filename}`;

      const encoding =
          FileSystem && FileSystem.EncodingType && (FileSystem.EncodingType.UTF8 ?? FileSystem.EncodingType.UTF_8)
              ? (FileSystem.EncodingType.UTF8 ?? FileSystem.EncodingType.UTF_8)
              : 'utf8';

      await FileSystem.writeAsStringAsync(fileUri, xlsxContent, {encoding});


      const isAvailable = await Sharing.isAvailableAsync();

      if (isAvailable) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/vnd.ms-excel',
          dialogTitle: 'Export Inventory',
          UTI: 'com.microsoft.excel.xls'
        });
      } else {
        alert(`Export saved to: ${fileUri}\n\nYou can find it in your Files app.`);
      }
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
