with open(r'd:\New folder (2)\NewKovais\src\components\Home.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("import img1 from '../img/img (1).jpeg';", "import img1 from '../img/premium_hotel.jpg';")
content = content.replace("import img2 from '../img/img (2).jpeg';", "import img2 from '../img/premium_spa.jpg';")
content = content.replace("import img3 from '../img/img (3).jpeg';", "import img3 from '../img/premium_barber.jpg';")

with open(r'd:\New folder (2)\NewKovais\src\components\Home.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated Home.js image paths")
