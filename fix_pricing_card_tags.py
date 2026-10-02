import re

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace <Card and <Card.Body globally but ONLY inside the pricing section.
# Actually, the easiest way is just to replace the specific substrings globally for these classes.

content = content.replace('<Card\n                  className={`premium-price-card h-100 ${selectedAmount === \'399\' ? \'selected\' : \'\'}`}', '<div\n                  className={`premium-price-card h-100 ${selectedAmount === \'399\' ? \'selected\' : \'\'}`}')
content = content.replace('<Card\n                  className={`gym-membership-card h-100 ${selectedAmount === \'1099\' ? \'selected\' : \'\'}`}', '<div\n                  className={`premium-price-card h-100 ${selectedAmount === \'1099\' ? \'selected\' : \'\'}`}')
content = content.replace('<Card\n                  className={`gym-membership-card h-100 ${selectedAmount === \'2199\' ? \'selected\' : \'\'}`}', '<div\n                  className={`premium-price-card h-100 ${selectedAmount === \'2199\' ? \'selected\' : \'\'}`}')
content = content.replace('<Card\n                  className={`gym-membership-card best-value h-100 ${selectedAmount === \'4099\' ? \'selected\' : \'\'}`}', '<div\n                  className={`premium-price-card h-100 ${selectedAmount === \'4099\' ? \'selected\' : \'\'}`}')

content = content.replace('<Card.Body className="d-flex flex-column">', '<div className="d-flex flex-column h-100">')
content = content.replace('<Card.Body className="d-flex flex-column ">', '<div className="d-flex flex-column h-100">')
content = content.replace('</Card.Body>\n                </Card>', '</div>\n                </div>')
content = content.replace('</Card.Body>\n                </Card>', '</div>\n                </div>')

# Fix inline text colors that might remain
content = content.replace("style={{ fontFamily: 'Playfair Display, serif' }}", "className='premium-price-card-title'")

# Also fix the styling of ul/li to not have default generic styling
content = content.replace('className="plan-features text-start flex-grow-1"', 'className="premium-plan-features text-start flex-grow-1"')

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'w', encoding='utf-8') as f:
    f.write(content)

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.css', 'a', encoding='utf-8') as f:
    f.write("""

.premium-price-card-title {
  color: #FDFAF4 !important;
  font-family: 'Cormorant Garamond', serif !important;
  font-size: 1.8rem !important;
  margin-bottom: 10px !important;
}

.premium-plan-features {
  list-style: none !important;
  padding: 0 !important;
  margin: 20px 0 !important;
  color: #F5ECD7 !important;
}

.premium-plan-features li {
  margin-bottom: 10px !important;
  font-family: 'DM Sans', sans-serif !important;
}
""")

print("Successfully replaced <Card> with <div> in Pricing")
