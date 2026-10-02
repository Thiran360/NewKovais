with open(r'd:\New folder (2)\NewKovais\src\components\Home.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports for the two new images
import_block_end = content.find("import '../components/Home.css';")
if import_block_end == -1:
    import_block_end = content.find("import './Home.css';")

if import_block_end != -1:
    content = content[:import_block_end] + "import premium_dining from '../img/premium_dining.jpg';\nimport premium_pool from '../img/premium_pool.jpg';\n" + content[import_block_end:]

# Add to galleryItems array
old_array = r'''const galleryItems = [
    { image: gal_hotel, caption: "Grand Suite" },
    { image: gal_salon, caption: "Grooming Studio" },
    { image: gal_gym_pic, caption: "Fitness Centre" },
    { image: gal_grooming, caption: "Spa Retreat" },
    { image: gal_special, caption: "Special Services" },
    { image: gal_function, caption: "Function Prep" },
  ];'''

new_array = '''const galleryItems = [
    { image: gal_hotel, caption: "Grand Suite" },
    { image: gal_salon, caption: "Grooming Studio" },
    { image: gal_gym_pic, caption: "Fitness Centre" },
    { image: gal_grooming, caption: "Spa Retreat" },
    { image: gal_special, caption: "Special Services" },
    { image: gal_function, caption: "Function Prep" },
    { image: premium_dining, caption: "Fine Dining" },
    { image: premium_pool, caption: "Wellness Pool" },
  ];'''

content = content.replace(old_array, new_array)

with open(r'd:\New folder (2)\NewKovais\src\components\Home.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated galleryItems in Home.js")
