import re

# Refactor Funeral.css
css_path = r'd:\New folder (2)\NewKovais\src\Funeral\Funeral.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('background-color: #121212', 'background-color: #faf8f5')
css = css.replace('color: #e0e0e0', 'color: #1c1712')
css = css.replace('color: #ffffff', 'color: #1c1712')
css = css.replace('background-color: #1a1a1a', 'background-color: #ffffff')

# Keep hero section dark
css = css.replace('.hero-main-title { color: #1c1712 !important;', '.hero-main-title { color: #ffffff !important;')
css = css.replace('.stat-value-number { color: #1c1712 !important;', '.stat-value-number { color: #ffffff !important;')

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

# Refactor Funeral.js
js_path = r'd:\New folder (2)\NewKovais\src\Funeral\Funeral.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace("'#1a1a1a'", "'#ffffff'")
js = js.replace('"#1a1a1a"', '"#ffffff"')
js = js.replace("'#121212'", "'#faf8f5'")

def replace_white_text(match):
    return match.group(0).replace("'#fff'", "'#1c1712'").replace("'#ffffff'", "'#1c1712'")

js = re.sub(r'style=\{\{.*?\}\}', replace_white_text, js)

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js)
print('Styles updated!')
