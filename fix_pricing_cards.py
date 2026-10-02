import re

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the entire Pricing Section with clean divs to bypass Bootstrap <Card> bugs
old_pricing_block = r'''          <Row className="justify-content-center">
            \{/\* Monthly \*/\}
.*?
              </Col>
            </Row>'''

# I'll just write a script to replace the <Card ...> tags inside the pricing block.
# Actually it's easier to use a regex to replace all <Card and </Card> within the pricing section.

# Wait, let's just grab the whole block from `{/* Monthly */}` to `{/* Annual */}` end and replace it entirely.
