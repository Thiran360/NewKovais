with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Content updates for premium feel
content = content.replace(
    'Transform Your <span className="pp">Body</span>',
    'Redefine Your <span className="pp">Limits</span>'
)

content = content.replace(
    'Join KOVAIS Gym and embark on your fitness journey with modern equipment,\n                  expert trainers, and a supportive community in Gobichettipalayam.',
    'Experience absolute luxury and elite performance. Join KOVAIS Gym for state-of-the-art equipment, master trainers, and an exclusive fitness sanctuary.'
)
content = content.replace(
    'Join KOVAIS Gym and embark on your fitness journey with modern equipment, expert trainers, and a supportive community in Gobichettipalayam.',
    'Experience absolute luxury and elite performance. Join KOVAIS Gym for state-of-the-art equipment, master trainers, and an exclusive fitness sanctuary.'
)

content = content.replace(
    'Why Choose KOVAIS Gym?',
    'The Premium Standard'
)

content = content.replace(
    'Experience fitness like never before with our premium facilities and expert guidance',
    'Unparalleled luxury and state-of-the-art equipment designed for elite performance.'
)

with open(r'd:\New folder (2)\NewKovais\src\gym\gym.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Gym content updated")
