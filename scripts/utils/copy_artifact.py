
import shutil
import os

src = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate/march_2026_recipes.md'
dst = '/Users/ashisgautam/.gemini/antigravity/brain/548b7496-fd31-498d-b457-6a4ccf9012fa/march_2026_recipes.md'

try:
    shutil.copy2(src, dst)
    print(f"Successfully copied to {dst}")
except Exception as e:
    print(f"Error copying: {e}")
