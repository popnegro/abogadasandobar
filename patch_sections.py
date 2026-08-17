import os

# Let's read components and replace their solid color heroes with PageHero

# 1. Update ContactSection
with open('src/components/ContactSection.tsx', 'r') as f:
    contact = f.read()

# Add import for PageHero and ASSETS if not present
if "PageHero" not in contact:
    contact = contact.replace("import { Breadcrumb } from './Breadcrumb';", "import { Breadcrumb } from './Breadcrumb';\nimport { PageHero } from './PageHero';\nimport { ASSETS } from '../data/lawyerData';")

hero_regex = """<section id="contact-interior-hero".*?</section>"""
import re
contact = re.sub(hero_regex, """<PageHero 
        title="Contacto y Evaluación de Caso" 
        subtitle="Utilice este canal para una evaluación técnica de su caso bajo estricto secreto profesional." 
        eyebrow="Canal Directo & Confidencial" 
        breadcrumbLabel="Contacto & Consulta" 
        backgroundImage={ASSETS.deskDocs} 
        setActiveTab={setActiveTab} 
      />""", contact, flags=re.DOTALL)

with open('src/components/ContactSection.tsx', 'w') as f:
    f.write(contact)


# 2. Update ServicesSection
with open('src/components/ServicesSection.tsx', 'r') as f:
    services = f.read()

if "PageHero" not in services:
    services = services.replace("import { Breadcrumb } from './Breadcrumb';", "import { Breadcrumb } from './Breadcrumb';\nimport { PageHero } from './PageHero';\nimport { ASSETS } from '../data/lawyerData';")

services = re.sub("""<section id="services-interior-hero".*?</section>""", """<PageHero 
        title="Especialización Jurídica Integral" 
        subtitle="Intervención jurídica rigurosa en todas las fases del proceso penal y consultoría de cumplimiento corporativo para prevenir contingencias de alto impacto." 
        eyebrow="Soluciones Legales & Especialización" 
        breadcrumbLabel="Servicios" 
        backgroundImage={ASSETS.library} 
        setActiveTab={setActiveTab} 
      />""", services, flags=re.DOTALL)

with open('src/components/ServicesSection.tsx', 'w') as f:
    f.write(services)

# 3. Update FAQSection
with open('src/components/FAQSection.tsx', 'r') as f:
    faq = f.read()

if "PageHero" not in faq:
    faq = faq.replace("import { Breadcrumb } from './Breadcrumb';", "import { Breadcrumb } from './Breadcrumb';\nimport { PageHero } from './PageHero';\nimport { ASSETS } from '../data/lawyerData';")

faq = re.sub("""<section id="faq-interior-hero".*?</section>""", """<PageHero 
        title="Preguntas Frecuentes" 
        subtitle="Información clave sobre nuestro proceso de trabajo, honorarios profesionales y garantías de confidencialidad en causas penales y corporativas." 
        eyebrow="Transparencia & Metodología" 
        breadcrumbLabel="Preguntas Frecuentes" 
        backgroundImage={ASSETS.stoneArch} 
        setActiveTab={setActiveTab} 
      />""", faq, flags=re.DOTALL)

with open('src/components/FAQSection.tsx', 'w') as f:
    f.write(faq)

# 4. Update AboutSection
with open('src/components/AboutSection.tsx', 'r') as f:
    about = f.read()

if "PageHero" not in about:
    about = about.replace("import { Breadcrumb } from './Breadcrumb';", "import { Breadcrumb } from './Breadcrumb';\nimport { PageHero } from './PageHero';\nimport { ASSETS } from '../data/lawyerData';")

about = re.sub("""<section id="about-interior-hero".*?</section>""", """<PageHero 
        title="Excelencia y Rigor Técnico" 
        subtitle="Dedicación exclusiva a la defensa penal estratégica y consultoría de alta dirección corporativa, garantizando lealtad procesal inquebrantable." 
        eyebrow="Trayectoria & Filosofía" 
        breadcrumbLabel="Experiencia & Perfil" 
        backgroundImage={ASSETS.stoneArch} 
        setActiveTab={setActiveTab} 
      />""", about, flags=re.DOTALL)

with open('src/components/AboutSection.tsx', 'w') as f:
    f.write(about)
