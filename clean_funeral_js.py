import re

js_path = r'd:\New folder (2)\NewKovais\src\Funeral\Funeral.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

# Remove inline background, color, and border styles to let CSS take over
js = re.sub(r"backgroundColor:\s*['\"][^'\"]+['\"]", "", js)
js = re.sub(r"background:\s*['\"][^'\"]+['\"]", "", js)
js = re.sub(r"color:\s*['\"][^'\"]+['\"]", "", js)
js = re.sub(r"borderColor:\s*['\"][^'\"]+['\"]", "", js)
js = re.sub(r"border:\s*['\"][^'\"]+['\"]", "", js)
js = re.sub(r"boxShadow:\s*['\"][^'\"]+['\"]", "", js)

# Clean up empty style objects or trailing commas
js = re.sub(r",\s*}", " }", js)
js = re.sub(r"style=\{\{\s*\}\}", "", js)
js = re.sub(r"style=\{\{\s*,\s*", "style={{ ", js)

# Add custom classes to elements based on their current bootstrap classes
# Services card
js = js.replace('className={`card h-100 shadow ${booking.services.some(s => s.id === service.id)', 'className={`funeral-service-card card h-100 shadow-sm border-0 ${booking.services.some(s => s.id === service.id)')
js = js.replace("className={`card h-100 shadow", "className={`funeral-service-card card h-100 shadow-sm border-0")

# Location card
js = js.replace('className={`card h-100 text-center cursor-pointer ${booking.location === \'Door Step\' ? \'shadow-lg\' : \'\'}`}', 'className={`funeral-location-card card h-100 text-center cursor-pointer border-0 shadow-sm ${booking.location === \'Door Step\' ? \'selected\' : \'\'}`}')
js = js.replace('className={`card h-100 text-center cursor-pointer ${booking.location === \'Memorial Function\' ? \'shadow-lg\' : \'\'}`}', 'className={`funeral-location-card card h-100 text-center cursor-pointer border-0 shadow-sm ${booking.location === \'Memorial Function\' ? \'selected\' : \'\'}`}')

# Main booking container
js = js.replace('className="card shadow-lg"', 'className="funeral-booking-container card shadow-lg border-0"')
js = js.replace('className="card-header"', 'className="funeral-booking-header card-header border-0"')

# Employee card
js = js.replace('className={`card border cursor-pointer ${booking.employee?.id === employee.id', 'className={`funeral-specialist-card card border-0 shadow-sm cursor-pointer ${booking.employee?.id === employee.id')

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js)
print("Funeral.js cleaned and classed up.")
