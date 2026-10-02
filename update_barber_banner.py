import re

with open(r'd:\New folder (2)\NewKovais\src\barber\barber.js', 'r', encoding='utf-8') as f:
    content = f.read()

imports = """import "./barber.css";
import banner1 from './images/barber_banner_1.jpg';
import banner2 from './images/barber_banner_2.jpg';
import banner3 from './images/barber_banner_3.jpg';"""
content = content.replace('import "./barber.css";', imports)

old_slides_regex = re.compile(r'const slides = \[.*?\];', re.DOTALL)
new_slides = """const slides = [
    {
      title: "The Fine Art of Barbering",
      subtitle: "PREMIUM CRAFTSMANSHIP",
      description: "Experience absolute luxury with our master barbers. Precision cuts, hot towel shaves, and unparalleled grooming.",
      image: banner1,
    },
    {
      title: "Masterful Straight Razors",
      subtitle: "CLASSIC & REFINED",
      description: "Step back in time with our signature straight razor shave. Impeccable attention to detail in a truly cinematic atmosphere.",
      image: banner2,
    },
    {
      title: "Elevated Grooming",
      subtitle: "GOLD STANDARD",
      description: "Where tradition meets modern luxury. Discover the pinnacle of men's grooming with our premium treatments.",
      image: banner3,
    },
  ];"""
content = old_slides_regex.sub(new_slides, content)

with open(r'd:\New folder (2)\NewKovais\src\barber\barber.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Barber.js updated with new banners")
