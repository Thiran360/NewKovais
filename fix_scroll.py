with open(r'd:\New folder (2)\NewKovais\src\barber\barber.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'onClick={handleScrollDown}', 
    "onClick={() => document.getElementById('booking-sectionn')?.scrollIntoView({ behavior: 'smooth' })}"
)

with open(r'd:\New folder (2)\NewKovais\src\barber\barber.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed handleScrollDown error")
