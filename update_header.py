import sys
import re

filepath = r'c:\Users\ADMIN\Downloads\KovaisWeb-main\KovaisWeb-main\src\components\Header.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Icons
if 'FaInfoCircle' not in content:
    content = content.replace('FaChevronDown', 'FaChevronDown, FaInfoCircle, FaShieldAlt, FaFileContract, FaMoneyBillWave')

# 2. States
state_repl = '''  const [showMobileProfile, setShowMobileProfile] = useState(false);
  const [showDesktopInfo, setShowDesktopInfo] = useState(false);
  const [showMobileInfo, setShowMobileInfo] = useState(false);'''
content = content.replace('  const [showMobileProfile, setShowMobileProfile] = useState(false);', state_repl)

# 3. Refs
ref_repl = '''  const profileRef = useRef(null);
  const infoRef = useRef(null);'''
content = content.replace('  const profileRef = useRef(null);', ref_repl)

# 4. Click outside
click_repl = '''      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDesktopProfile(false);
      }
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setShowDesktopInfo(false);
      }'''
content = content.replace('''      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDesktopProfile(false);
      }''', click_repl)

# 5. Reset Dropdowns
reset_repl = '''    setShowDesktopProfile(false);
    setShowDesktopInfo(false);'''
content = content.replace('    setShowDesktopProfile(false);', reset_repl)

reset_repl_mob = '''    setShowMobileProfile(false);
    setShowMobileInfo(false);'''
content = content.replace('    setShowMobileProfile(false);', reset_repl_mob)

# 6. Toggles
desktop_booking_repl = '''    setShowDesktopBooking(!showDesktopBooking);
    setShowDesktopProfile(false);
    setShowDesktopInfo(false);'''
content = content.replace('''    setShowDesktopBooking(!showDesktopBooking);
    setShowDesktopProfile(false);''', desktop_booking_repl)

desktop_profile_repl = '''    setShowDesktopProfile(!showDesktopProfile);
    setShowDesktopBooking(false);
    setShowDesktopInfo(false);'''
content = content.replace('''    setShowDesktopProfile(!showDesktopProfile);
    setShowDesktopBooking(false);''', desktop_profile_repl)

toggle_info = '''  const toggleDesktopInfo = (e) => {
    e.preventDefault();
    setShowDesktopInfo(!showDesktopInfo);
    setShowDesktopBooking(false);
    setShowDesktopProfile(false);
  };
'''
if 'toggleDesktopInfo' not in content:
    content = content.replace('  const toggleMobileDropdown = (type) => {', toggle_info + '\n  const toggleMobileDropdown = (type) => {')

mobile_toggle_repl = '''  const toggleMobileDropdown = (type) => {
    if (type === 'booking') {
      setShowMobileBooking(!showMobileBooking);
      setShowMobileProfile(false);
      setShowMobileInfo(false);
    } else if (type === 'profile') {
      setShowMobileProfile(!showMobileProfile);
      setShowMobileBooking(false);
      setShowMobileInfo(false);
    } else if (type === 'info') {
      setShowMobileInfo(!showMobileInfo);
      setShowMobileBooking(false);
      setShowMobileProfile(false);
    }
  };'''

content = re.sub(r'  const toggleMobileDropdown = \(type\) => \{.*?  \};', mobile_toggle_repl, content, flags=re.DOTALL)

# 7. Data arrays
info_items = '''
  const infoItems = [
    { path: "/contact", icon: FaPhoneAlt, label: "Contact Us" },
    { path: "/policy", icon: FaShieldAlt, label: "Privacy Policy" },
    { path: "/terms", icon: FaFileContract, label: "Terms & Conditions" },
    { path: "/refund", icon: FaMoneyBillWave, label: "Refund Policy" }
  ];
'''
if 'infoItems =' not in content:
    content = content.replace('  const bookingItems = [', info_items + '\n  const bookingItems = [')

# 8. Nav HTML replacement
if 'Contact Us' in content:
    old_nav = '''              <button onClick={() => handleNavigation("/contact")} className="nav-item-link">
                <span className="link-text">Contact Us</span>
                <span className="link-underline"></span>
              </button>

              <button onClick={() => handleNavigation("/policy")} className="nav-item-link">
                <span className="link-text">Privacy Policy</span>
                <span className="link-underline"></span>
              </button>'''
    content = content.replace(old_nav, '')

# Inserting new Info Dropdown HTML after Desktop Booking Dropdown
info_desktop_html = '''              {/* Desktop Info Dropdown */}
              <div className="dropdown-wrapper d-none d-lg-block" ref={infoRef}>
                <button 
                  className={`nav-item-link dropdown-trigger ${showDesktopInfo ? 'active' : ''}`}
                  onClick={toggleDesktopInfo}
                >
                  <span className="link-text">Info</span>
                  <FaChevronDown className={`dropdown-arrow ${showDesktopInfo ? 'rotated' : ''}`} />
                  <span className="link-underline"></span>
                </button>
                <div className={`mega-dropdown profile-dropdown ${showDesktopInfo ? 'show' : ''}`}>
                  <div className="dropdown-list">
                    {infoItems.map((item, index) => (
                      <button key={index} className="dropdown-list-item" onClick={() => handleNavigation(item.path)}>
                        <item.icon className="list-icon" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
'''

if 'Desktop Info Dropdown' not in content:
    content = content.replace('              {/* Desktop Booking Dropdown (Click Based) */}', info_desktop_html + '\n              {/* Desktop Booking Dropdown (Click Based) */}')

# Inserting new Info Mobile Dropdown after Mobile Booking Dropdown
info_mobile_html = '''              {/* Mobile Info Dropdown */}
              <div className="d-lg-none mobile-dropdown-section">
                <button className="mobile-dropdown-trigger" onClick={() => toggleMobileDropdown('info')}>
                  <span>Info</span>
                  <FaChevronDown className={`mobile-arrow ${showMobileInfo ? 'rotated' : ''}`} />
                </button>
                <div className={`mobile-dropdown-content ${showMobileInfo ? 'show' : ''}`}>
                  {infoItems.map((item, index) => (
                    <button key={index} className="mobile-dropdown-item" onClick={() => handleNavigation(item.path)}>
                      <item.icon className="mobile-item-icon" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
'''

if 'Mobile Info Dropdown' not in content:
    content = content.replace('              {/* Mobile Booking Dropdown */}', info_mobile_html + '\n              {/* Mobile Booking Dropdown */}')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
