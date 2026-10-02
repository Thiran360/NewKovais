import re

with open(r'd:\New folder (2)\NewKovais\src\barber\barber.js', 'r', encoding='utf-8') as f:
    content = f.read()

bridal_package_regex = re.compile(r'\s*\{\s*id:\s*\'w3\',\s*category:\s*\'Women\',\s*name:\s*\'Bridal Package\',\s*description:\s*\'Complete wedding day styling\',\s*price:\s*200,\s*image:\s*\'[^\']+\',\s*duration:\s*\'240 min\'\s*\},', re.DOTALL)

content = bridal_package_regex.sub('', content)

with open(r'd:\New folder (2)\NewKovais\src\barber\barber.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Bridal Package removed successfully")
