import re

js_path = r'd:\New folder (2)\NewKovais\src\Funeral\Funeral.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

# Replace hardcoded dark colors
js = js.replace("'#333'", "'#e0dcd3'")
js = js.replace("'#aaa'", "'#6b5f4a'")
js = js.replace("'#6c757d'", "'#6b5f4a'")
js = js.replace("'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)'", "'linear-gradient(135deg, #fffcf5 0%, #f0ebe1 100%)'")
js = js.replace("'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)'", "'linear-gradient(135deg, rgba(0,0,0,0.05), transparent)'")
js = js.replace("backgroundColor: 'rgba(255,255,255,0.3)'", "backgroundColor: 'rgba(0,0,0,0.1)'")
js = js.replace("color: 'rgba(255,255,255,0.7)'", "color: 'rgba(0,0,0,0.6)'")
js = js.replace("border: `2px solid ${isActive ? '#1c1712' : 'rgba(255,255,255,0.5)'}`", "border: `2px solid ${isActive ? '#1c1712' : 'rgba(0,0,0,0.2)'}`")
js = js.replace("backgroundColor: 'rgba(255,255,255,0.3)'", "backgroundColor: 'rgba(0,0,0,0.1)'")

# Fix button colors
def fix_button(match):
    return match.group(0).replace("'#1c1712'", "'#ffffff'").replace("'#faf8f5'", "'#1c1712'")

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js)
print('Additional styles updated!')
