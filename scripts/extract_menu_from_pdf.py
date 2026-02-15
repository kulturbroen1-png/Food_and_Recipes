
import pypdf
import sys

pdf_path = '/Users/ashisgautam/Documents/Food_and_Recipes/KØKKEN_PRINT_READY_2026/MARTS/Martsmenuplan 2026 - Rettet v3.pdf'

try:
    reader = pypdf.PdfReader(pdf_path)
    print(f"Loaded PDF: {pdf_path}")
    print(f"Pages: {len(reader.pages)}")
    
    full_text = ""
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        full_text += f"\n--- Page {i+1} ---\n{text}"
        
    print(full_text)
    
except Exception as e:
    print(f"Error reading PDF: {e}")
