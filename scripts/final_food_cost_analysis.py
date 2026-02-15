#!/usr/bin/env python3
"""
COMPREHENSIVE FOOD COST ANALYSIS
Using account codes to properly categorize expenses
"""

import pandas as pd
import numpy as np
import glob
import os

# Load files using glob to handle encoding
data_dir = 'scripts/DATA_2026_FEB'
xlsx_files = glob.glob(os.path.join(data_dir, 'Posteringer*.xlsx'))
current_file = xlsx_files[0] if xlsx_files else None

historical_files = glob.glob(os.path.join(data_dir, 'Rådata*.xlsx'))
historical_file = historical_files[0] if historical_files else None

if not current_file:
    print("❌ Could not find Posteringer file")
    exit(1)

print('\n' + '=' * 80)
print('🍽️  COMPREHENSIVE FOOD COST ANALYSIS')
print('Using Account Codes for Proper Categorization')
print('=' * 80)

# Read current data
df_current = pd.read_excel(current_file)

# Clean numeric
def clean_kr(val):
    if pd.isna(val):
        return 0
    if isinstance(val, str):
        return float(val.replace('.', '').replace(',', '.'))
    return float(val)

df_current['NettoKR'] = df_current['Nettobeløb'].apply(clean_kr)

# Filter to actual transactions (not summary rows)
df_trans = df_current[df_current['Kontonr'].notna()].copy()

# Account code categorization
# 527-32-070-09 appears to be kitchen costs
# Let's analyze by account and description

print(f'\n📊 Data Overview:')
print(f'  Total rows: {len(df_trans):,}')
print(f'  Date range: {df_trans["Bogført dato"].min()} to {df_trans["Bogført dato"].max()}')

# Get unique accounts
accounts = df_trans['Kontonr'].value_counts()
print(f'\n🏦 Account Codes Found: {len(accounts)}')
print(accounts.head(10))

# Filter to kitchen account (527-32-070-09 seems to be the main one)
kitchen_account = '527-32-070-09'
df_kitchen = df_trans[df_trans['Kontonr'] == kitchen_account].copy()

print(f'\n💰 Kitchen Account ({kitchen_account}):')
print(f'  Transactions: {len(df_kitchen)}')
print(f'  Total Amount: {df_kitchen["NettoKR"].sum():,.2f} kr')

# Group by month (from description)
monthly = df_kitchen.groupby('Posteringstekst')['NettoKR'].sum().sort_index()

print(f'\n📅 Monthly Breakdown:')
for month, amount in monthly.items():
    print(f'  {month:30} {abs(amount):>15,.2f} kr')

# Calculate averages
total_kitchen = abs(df_kitchen['NettoKR'].sum())
num_months = len(monthly)

if num_months > 0:
    avg_monthly = total_kitchen / num_months
    avg_daily = avg_monthly / 30
    avg_per_serving = avg_daily / 450
    
    print(f'\n' + '=' * 80)
    print(f'📊 REAL FOOD COST ANALYSIS ({num_months} months average):')
    print('=' * 80)
    print(f'  Total period cost: {total_kitchen:,.2f} kr')
    print(f'  Average monthly: {avg_monthly:,.2f} kr')
    print(f'  Average daily (450 pax): {avg_daily:,.2f} kr')
    print(f'  Average per serving: {avg_per_serving:,.2f} kr')
    
    # Compare to projection
    projected = 15.69
    variance = ((avg_per_serving - projected) / projected * 100)
    
    print(f'\n🎯 vs PROJECTED:')
    print(f'  Projected: 15.69 kr/serving')
    print(f'  Actual: {avg_per_serving:.2f} kr/serving')
    print(f'  Variance: {variance:+.1f}%')
    
    if abs(variance) < 5:
        status = '✅ EXCELLENT'
    elif abs(variance) < 10:
        status = '✅ VERY GOOD'
    elif abs(variance) < 20:
        status = '✅ GOOD'
    else:
        status = '⚠️  NEEDS REVIEW'
    
    print(f'  Status: {status}')
    
    # Annual projection
    annual = avg_monthly * 12
    print(f'\n📈 ANNUAL PROJECTION (Real Data Based):')
    print(f'  {annual:,.2f} kr/year')
    print(f'  vs Hørkram Model: 2,577,052 kr')
    print(f'  Difference: {(annual - 2577052):+,.2f} kr')
    
    # Weekly breakdown
    weekly = avg_monthly / 4.33
    print(f'\n📊 DETAILED BREAKDOWN:')
    print(f'  Weekly (450 pax × 7 days): {weekly:,.2f} kr')
    print(f'  Daily (450 pax): {avg_daily:,.2f} kr')
    print(f'  Per serving: {avg_per_serving:.2f} kr')

print('\n' + '=' * 80 + '\n')
