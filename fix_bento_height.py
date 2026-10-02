with open(r'd:\New folder (2)\NewKovais\src\components\Home.css', 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace the .image-box and .manifesto-box to add max-height
content = content.replace(
    '.image-box {\n  grid-column: span 5;\n  grid-row: span 1;\n  padding: 0;\n}',
    '.image-box {\n  grid-column: span 5;\n  grid-row: span 1;\n  padding: 0;\n  max-height: 380px !important;\n}'
)

content = content.replace(
    '.manifesto-box {\n  grid-column: span 7;\n  grid-row: span 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(253,251,247,0.9));\n}',
    '.manifesto-box {\n  grid-column: span 7;\n  grid-row: span 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(253,251,247,0.9));\n  max-height: 380px !important;\n}'
)

# And reduce title size slightly to fit nicely
content = content.replace(
    '.bento-title {\n  font-size: clamp(1.4rem, 2.5vw, 2.2rem);\n  font-weight: 700;\n  line-height: 1.1;\n  margin-bottom: 12px;\n  color: #2C2825;\n}',
    '.bento-title {\n  font-size: clamp(1.2rem, 2.2vw, 2rem);\n  font-weight: 700;\n  line-height: 1.2;\n  margin-bottom: 12px;\n  color: #2C2825;\n}'
)

# Also ensure bento-img is properly bounded
content = content.replace(
    '.bento-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.8s ease;\n}',
    '.bento-img {\n  width: 100%;\n  height: 100%;\n  max-height: 380px !important;\n  object-fit: cover;\n  transition: transform 0.8s ease;\n}'
)

with open(r'd:\New folder (2)\NewKovais\src\components\Home.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed bento box heights")
