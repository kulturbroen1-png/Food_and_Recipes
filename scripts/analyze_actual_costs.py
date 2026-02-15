#!/usr/bin/env python3
"""
Analyze actual kitchen costs from February 2026 data
Compare against our budget projections
"""

import pandas as pd
import os
import glob

# Find the CSV file
data_dir = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate/scripts/DATA_2026_FEB'
csv_files = glob.glob(os.path.join(data_dir, '*.csv'))

if not csv_files:
    print("❌ No CSV files found")
    exit(1)

csv_file = csv_files[0]
print(f'📂 Loading: {os.path.basename(csv_file)}\n')

# Try different encodings
for encoding in ['utf-8', 'latin-1', 'iso-8859-1', 'cp1252']:
    try:
        df = pd.read_csv(csv_file, encoding=encoding, sep=';')
        print(f'✅ Successfully loaded with {encoding} encoding')
        break
    except:
        try:
            df = pd.read_csv(csv_file, encoding=encoding)
            print(f'✅ Successfully loaded with {encoding} encoding (comma separator)')
            break
        except:
            continue
else:
    print("❌ Could not load CSV with any encoding")
    exit(1)

print('\n' + '=' * 80)
print('📊 ACTUAL KITCHEN COSTS DATA')
print('=' * 80)

print(f'\n🔢 Basic Info:')
print(f'  Rows: {len(df):,}')
print(f'  Columns: {len(df.columns)}')

print(f'\n📋 Columns:')
for i, col in enumerate(df.columns, 1):
    print(f'  {i:2}. {col}')

print(f'\n👀 First 3 Rows:')
print(df.head(3).to_string())

# Look for amount/cost columns
cost_cols = [col for col in df.columns if any(word in col.lower() for word in ['beløb', 'amount', 'total', 'pris', 'kr', 'cost'])]
print(f'\n💰 Potential Cost Columns: {cost_cols}')

# Look for date columns
date_cols = [col for col in df.columns if any(word in col.lower() for word in ['dato', 'date', 'tid', 'time'])]
print(f'📅 Potential Date Columns: {date_cols}')

# Try to calculate total if we find a cost column
if cost_cols:
    for col in cost_cols:
        try:
            # Clean and convert
            if df[col].dtype == 'object':
                cleaned = df[col].str.replace(',', '.').str.replace('[^0-9.-]', '', regex=True)
                total = pd.to_numeric(cleaned, errors='coerce').sum()
            else:
                total = df[col].sum()
            
            print(f'\n💵 Total in "{col}": {total:,.2f} kr')
        except Exception as e:
            print(f'\n⚠️  Could not sum "{col}": {e}')

print('\n' + '=' * 80)
print('✅ Data preview complete\n')
