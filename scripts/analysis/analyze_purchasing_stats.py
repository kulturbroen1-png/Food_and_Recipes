#!/usr/bin/env python3
"""
Analyze purchasing statistics Excel file
This should have clean, categorized food cost data
"""

import pandas as pd
import glob
import os

data_dir = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate/scripts/DATA_2026_FEB'

# Find the xls file
xls_files = glob.glob(os.path.join(data_dir, '*.xls'))
if xls_files:
    xls_file = xls_files[0]
    print(f'📂 Loading: {os.path.basename(xls_file)}\n')
    
    try:
        xls = pd.ExcelFile(xls_file)
        print('=' * 80)
        print('📊 PURCHASING STATISTICS ANALYSIS')
        print('=' * 80)
        print(f'\nSheets found: {xls.sheet_names}\n')
        
        # Read each sheet
        for sheet_name in xls.sheet_names:
            print(f'\n📄 Sheet: {sheet_name}')
            print('-' * 80)
            df = pd.read_excel(xls, sheet_name=sheet_name)
            print(f'Rows: {len(df):,}')
            print(f'Columns: {list(df.columns)[:10]}...')
            print(f'\nFirst 5 rows:')
            print(df.head().to_string())
            print('\n')
            
            # Look for cost columns
            cost_cols = [col for col in df.columns if any(word in str(col).lower() for word in ['beløb', 'amount', 'total', 'pris', 'kr', 'cost', 'sum'])]
            if cost_cols:
                print(f'💰 Cost columns found: {cost_cols}')
                for col in cost_cols:
                    try:
                        total = pd.to_numeric(df[col], errors='coerce').sum()
                        print(f'  {col}: {total:,.2f} kr')
                    except:
                        pass
            print('='* 80)
            
    except Exception as e:
        print(f'❌ Error: {e}')
else:
    print('❌ No .xls files found')
