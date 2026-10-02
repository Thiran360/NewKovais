with open(r'd:\New folder (2)\NewKovais\src\barber\barber.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace generic bootstrap/Playfair styles with our premium styles
content = content.replace('#f8f9fa', '#FDFAF4')
content = content.replace('#dc3545', '#C9A84C')
content = content.replace('#daa520', '#C9A84C')
content = content.replace('#000000', '#1A1A1A')
content = content.replace('#000', '#1A1A1A')
content = content.replace('Playfair Display', 'Cormorant Garamond')
content = content.replace('btn-danger', 'btn-barber-primary')
content = content.replace('text-danger', 'text-gold')
content = content.replace('border-danger', 'border-gold')
content = content.replace('bg-danger', 'bg-gold')

with open(r'd:\New folder (2)\NewKovais\src\barber\barber.js', 'w', encoding='utf-8') as f:
    f.write(content)

with open(r'd:\New folder (2)\NewKovais\src\barber\barber.css', 'a', encoding='utf-8') as f:
    f.write("""
.text-gold { color: var(--gold-primary) !important; }
.border-gold { border-color: var(--gold-primary) !important; }
.bg-gold { background-color: var(--gold-primary) !important; color: white !important; }
""")

print("Barber.js styles upgraded")
