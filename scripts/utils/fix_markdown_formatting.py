
import re
import os

file_path = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate/march_2026_recipes.md'

with open(file_path, 'r') as f:
    content = f.read()

# 1. Convert subheadings to bold to avoid MD024 (Duplicate headings) and simplify structure
# Also adds newlines to help with spacing
content = re.sub(r'(?m)^###\s+(.*?)\s*$', r'\n**\1**\n', content)

# 2. Ensure blank lines around Level 2 headings (MD022)
# Replace "## Title" with "\n\n## Title\n\n" (cleaning up existing extra newlines later)
content = re.sub(r'(?m)^##\s+(.*?)\s*$', r'\n\n## \1\n\n', content)

# 3. Ensure blank lines before lists (MD032)
# Look for a line that is NOT a list item, followed by a list item
# We use a lookahead to find the start of a list block
# converting "- Item" to "\n- Item" if preceded by non-newline and non-list
content = re.sub(r'(?m)^([^-*\n].*)\n(-\s)', r'\1\n\n\2', content)

# 4. Collapse multiple newlines to max 2
content = re.sub(r'\n{3,}', '\n\n', content)

# 5. Fix specific "1. 1." patterns if possible (MD029/MD030)
# The extraction often output "1. 1. Text". Let's clean to "1. Text"
content = re.sub(r'(?m)^1\.\s+\d+\.?\s*', '1. ', content)

# Write back
with open(file_path, 'w') as f:
    f.write(content)

print("Markdown formatting fixed.")
