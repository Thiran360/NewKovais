with open(r'd:\New folder (2)\NewKovais\src\components\Home.js', 'r', encoding='utf-8') as f:
    content = f.read()

# I will add the imports before gal_hotel
content = content.replace("import gal_hotel from '../img/gallery_hotel.jpg';", "import premium_dining from '../img/premium_dining.jpg';\nimport premium_pool from '../img/premium_pool.jpg';\nimport gal_hotel from '../img/gallery_hotel.jpg';")

with open(r'd:\New folder (2)\NewKovais\src\components\Home.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed imports in Home.js")
