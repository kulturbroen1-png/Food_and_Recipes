
import pypdf
import sys

# Path to a known PDF
pdf_path = '/Users/ashisgautam/Documents/Food_and_Recipes/Opskrifter_Komplet_Samling/Booklets_Split/Samlet A Og B/Bankekød, Kød.pdf'

try:
    reader = pypdf.PdfReader(pdf_path)
    print(f"Analyzing: {pdf_path}")
    
    full_text = ""
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        full_text += f"\n--- Page {i+1} ---\n{text}"
    
    print(full_text)
    
except Exception as e:
    print(f"Error reading PDF: {e}")
