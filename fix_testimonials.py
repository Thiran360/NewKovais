import re

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the Testimonials Section maps
old_test = r'''successStories\.map\(\(story, index\) => \(
                <Col md=\{4\} key=\{index\} className="mb-4">
                  <Card
                    className="h-100 border-0 shadow-lg success-story-card glass-card"
                    data-aos="fade-up"
                    data-aos-delay=\{index \* 200\}
                  >
                    <Card\.Img
                      variant="top"
                      src=\{story\.image\}
                      className="success-story-img"
                    />
                    <Card\.Body className="text-center">
                      <Card\.Title className="h5 mb-2">\{story\.name\}</Card\.Title>
                      <Badge className="premium-badge" className="mb-3">\{story\.achievement\}</Badge>
                      <Card\.Text className="text-muted fst-italic">
                        "\{story\.testimonial\}"
                      </Card\.Text>
                      <div className="rating text-warning mb-2">
                        \{'★'\.repeat\(5\)\}
                      </div>
                    </Card\.Body>
                  </Card>
                </Col>
              \)\)'''

new_test = '''successStories.map((story, index) => (
                <Col md={4} key={index} className="mb-4">
                  <div
                    className="premium-testimonial-card"
                    data-aos="fade-up"
                    data-aos-delay={index * 200}
                  >
                    <img
                      src={story.image}
                      alt={story.name}
                      className="premium-testimonial-img"
                    />
                    <div className="premium-testimonial-body">
                      <h5 className="premium-testimonial-title">{story.name}</h5>
                      <span className="premium-badge mb-3">{story.achievement}</span>
                      <p className="premium-testimonial-text">
                        "{story.testimonial}"
                      </p>
                      <div className="premium-rating mb-2">
                        {'★'.repeat(5)}
                      </div>
                    </div>
                  </div>
                </Col>
              ))'''

content = re.sub(old_test, new_test, content, flags=re.DOTALL)

# Fix duplicate className in headers
content = content.replace(
    'className="display-6 fw-bold mb-4" data-aos="fade-up" className=\'premium-price-card-title\'',
    'className="display-6 fw-bold mb-4 premium-price-card-title" data-aos="fade-up"'
)
content = content.replace(
    'className="display-6 fw-bold mb-4" className=\'premium-price-card-title\'',
    'className="display-6 fw-bold mb-4 premium-price-card-title"'
)

# Fix "Real transformations from our amazing members" text visibility
# Change text-muted to premium-section-subtitle
content = content.replace(
    '<p className="lead text-muted" data-aos="fade-up" data-aos-delay="200">\n                  Real transformations from our amazing members\n                </p>',
    '<p className="lead premium-section-subtitle" data-aos="fade-up" data-aos-delay="200">\n                  Real transformations from our amazing members\n                </p>'
)

# Also fix the call to action background from bg-warning to premium-dark
content = content.replace('className="py-5 bg-warning text-white"', 'className="py-5 premium-cta text-white"')

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'w', encoding='utf-8') as f:
    f.write(content)

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.css', 'a', encoding='utf-8') as f:
    f.write("""

.premium-section-subtitle {
  color: #1A1A1A !important;
  font-family: 'DM Sans', sans-serif !important;
  font-weight: 500 !important;
}

.premium-rating {
  color: #C9A84C !important;
  font-size: 1.2rem !important;
  letter-spacing: 2px !important;
}

.premium-cta {
  background-color: #1A1A1A !important;
  border-top: 2px solid #C9A84C !important;
}
""")

print("Successfully replaced Testimonial JSX")
