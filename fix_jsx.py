with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'r', encoding='utf-8') as f:
    content = f.read()

# The error happened because the closing tags for Card and Card.Body were globally replaced.
# The broken elements are:
# <Card.Title className="h5" style={{ color: "black", fontWeight: "bolder", fontSize: "25px" }}>Under 18</Card.Title>
# </div>
# </div>
# I'll just restore the </div></div> to </Card.Body></Card> for these specific cards.

content = content.replace(
    '</Card.Title>\n                  </div>\n                </div>',
    '</Card.Title>\n                  </Card.Body>\n                </Card>'
)

content = content.replace(
    '</Card.Title>\n                </div>\n              </div>',
    '</Card.Title>\n                </Card.Body>\n              </Card>'
)

# And wait, the first one might have different indentation. Let's do it using regex.
import re
content = re.sub(
    r'(<Card\.Title.*?</Card\.Title>)\s*</div>\s*</div>',
    r'\1\n                  </Card.Body>\n                </Card>',
    content
)

# Let's also fix the duplicate className I accidentally added:
# className="text-center display-6 fw-bold mb-5" id="target-section" data-aos="fade-up" className='premium-price-card-title'
content = content.replace(
    'className="text-center display-6 fw-bold mb-5" id="target-section" data-aos="fade-up" className=\'premium-price-card-title\'',
    'className="premium-price-card-title text-center display-6 fw-bold mb-5" id="target-section" data-aos="fade-up"'
)
content = content.replace(
    'className="pp" className=\'premium-price-card-title\'',
    'className="pp premium-price-card-title"'
)

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed JSX Syntax Errors")
