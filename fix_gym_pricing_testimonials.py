import re

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Testimonials Section
old_test_block = r'''successStories\.map\(\(story, index\) => \(
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
                      <Badge bg="success" className="mb-3">\{story\.achievement\}</Badge>
                      <Card\.Text className="text-muted fst-italic">
                        "\{story\.testimonial\}"
                      </Card\.Text>
                    </Card\.Body>
                  </Card>
                </Col>
              \)\)'''

new_test_block = '''successStories.map((story, index) => (
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
                    </div>
                  </div>
                </Col>
              ))'''

content = re.sub(old_test_block, new_test_block, content)

# 2. Pricing Section - Since the pricing cards are hardcoded individually and there are multiple,
# it's easiest to replace their class names globally within the file.
content = content.replace('gym-membership-card glass-card', 'premium-price-card')
content = content.replace('<h1 className="price">', '<h1 className="premium-price">')
content = content.replace('<span className="period">', '<span className="premium-period">')
content = content.replace('bg="success"', 'className="premium-badge"') # In case there are other badges
content = content.replace("bg='success'", 'className="premium-badge"')

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'w', encoding='utf-8') as f:
    f.write(content)

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.css', 'a', encoding='utf-8') as f:
    f.write("""

/* ──────────────────────────────────────────────
   PREMIUM TESTIMONIALS & PRICING
   ────────────────────────────────────────────── */

.premium-testimonial-card {
  background-color: #1A1A1A !important;
  border: 1px solid rgba(201,168,76,0.2) !important;
  border-radius: 16px !important;
  overflow: hidden !important;
  height: 100% !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
  transition: all 0.3s ease !important;
}

.premium-testimonial-card:hover {
  transform: translateY(-8px) !important;
  border-color: #C9A84C !important;
}

.premium-testimonial-img {
  width: 100% !important;
  height: 220px !important;
  object-fit: cover !important;
  border-bottom: 2px solid #C9A84C !important;
}

.premium-testimonial-body {
  padding: 25px !important;
  text-align: center !important;
}

.premium-testimonial-title {
  color: #FDFAF4 !important; /* Ivory, NOT Green! */
  font-family: 'Cormorant Garamond', serif !important;
  font-size: 1.6rem !important;
  margin-bottom: 10px !important;
}

.premium-badge {
  background-color: #C9A84C !important;
  color: #1A1A1A !important;
  padding: 6px 14px !important;
  border-radius: 30px !important;
  font-family: 'DM Sans', sans-serif !important;
  font-weight: 600 !important;
  font-size: 0.85rem !important;
  display: inline-block !important;
}

.premium-testimonial-text {
  color: #F5ECD7 !important; /* Pale Gold */
  font-style: italic !important;
  margin-top: 15px !important;
}

/* Pricing Cards */
.premium-price-card {
  background-color: #1A1A1A !important;
  border: 1px solid rgba(201,168,76,0.2) !important;
  border-radius: 16px !important;
  padding: 30px !important;
  text-align: center !important;
  transition: all 0.3s ease !important;
  color: #FDFAF4 !important;
}

.premium-price-card h4 {
  color: #FDFAF4 !important; /* Make "Monthly Plan" white/ivory instead of dark */
  font-family: 'Cormorant Garamond', serif !important;
  font-size: 1.8rem !important;
  margin-bottom: 20px !important;
}

.premium-price-card .premium-price {
  color: #C9A84C !important;
  font-family: 'Cormorant Garamond', serif !important;
  font-size: 3.5rem !important;
  font-weight: 600 !important;
  margin-bottom: 20px !important;
}

.premium-price-card .premium-period {
  font-size: 1.2rem !important;
  color: #F5ECD7 !important;
  font-family: 'DM Sans', sans-serif !important;
}

.premium-price-card:hover, .premium-price-card.selected {
  border-color: #C9A84C !important;
  box-shadow: 0 16px 40px rgba(201,168,76,0.2) !important;
  transform: translateY(-8px) !important;
}

/* Fix any remaining green text inside pricing */
.premium-price-card .text-success, 
.premium-price-card .text-danger {
  color: #C9A84C !important;
}
""")

print("Successfully replaced Testimonial and Pricing styles")
