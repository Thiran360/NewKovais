import re

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the Card mapping block
old_block = r'''              \{gymFeatures\.map\(\(feature, index\) => \(
                <Col md=\{6\} lg=\{3\} key=\{index\} className="mb-4">
                  <Card
                    className="h-100 border-0 shadow-sm gym-feature-card glass-card"
                    data-aos="fade-up"
                    data-aos-delay=\{index \* 100\}
                  >
                    <Card\.Body className="text-center p-4">
                      <div className="feature-icon mb-3">
                        \{feature\.icon\}
                      </div>
                      <Card\.Title className="feature-title h5 mb-3">\{feature\.title\}</Card\.Title>
                      <Card\.Text className="text-muted">
                        \{feature\.description\}
                      </Card\.Text>
                    </Card\.Body>
                  </Card>
                </Col>
              \)\)\}'''

new_block = '''              {gymFeatures.map((feature, index) => (
                <Col md={6} lg={3} key={index} className="mb-4">
                  <div
                    className="premium-feature-card"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="premium-feature-icon">
                      {feature.icon}
                    </div>
                    <h5 className="premium-feature-title">{feature.title}</h5>
                    <p className="premium-feature-desc">
                      {feature.description}
                    </p>
                  </div>
                </Col>
              ))}'''

content = re.sub(old_block, new_block, content)

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'w', encoding='utf-8') as f:
    f.write(content)

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.css', 'a', encoding='utf-8') as f:
    f.write("""
/* Hard replacement for the feature cards to completely avoid legacy overrides */
.premium-feature-card {
  background-color: #1A1A1A !important; /* Force Charcoal background */
  border: 1px solid rgba(201,168,76,0.3) !important; /* Gold border */
  border-radius: 12px !important;
  padding: 30px 20px !important;
  text-align: center !important;
  height: 100% !important;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2) !important;
  transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94) !important;
  position: relative !important;
  z-index: 10 !important;
}

.premium-feature-card:hover {
  transform: translateY(-10px) !important;
  border-color: #C9A84C !important;
  box-shadow: 0 16px 48px rgba(201,168,76,0.25) !important;
}

.premium-feature-icon {
  margin-bottom: 20px !important;
}

.premium-feature-icon svg {
  color: #C9A84C !important;
  font-size: 3rem !important;
  filter: drop-shadow(0 4px 6px rgba(201,168,76,0.3)) !important;
}

.premium-feature-title {
  color: #C9A84C !important; /* Force Gold text */
  font-family: 'Cormorant Garamond', serif !important;
  font-size: 1.8rem !important;
  margin-bottom: 15px !important;
  font-weight: 600 !important;
}

.premium-feature-desc {
  color: #F5ECD7 !important; /* Force Pale Gold text */
  font-family: 'DM Sans', sans-serif !important;
  font-size: 1rem !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}
""")

print("Successfully replaced JSX and added isolated premium styles")
