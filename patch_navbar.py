with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

import_statement = "import { ActiveTab } from '../types';\nimport { ASSETS } from '../data/lawyerData';"
content = content.replace("import { ActiveTab } from '../types';", import_statement)

logo_old = """<div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-sm flex items-center justify-center font-serif font-bold text-lg sm:text-xl transition-colors ${isScrolled ? 'bg-[#7F203D] text-[#FFF8F2] group-hover:bg-[#691931]' : 'bg-white text-[#302D28] group-hover:bg-[#F4EFE8]'}`}>ES</div>"""
logo_new = """<div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-sm overflow-hidden bg-transparent"><img src={ASSETS.logoMonogram} alt="ES Logo" className={`w-full h-full object-contain transition-all ${isScrolled ? 'invert-[.15] sepia-[.7] saturate-[6] hue-rotate-[320deg] brightness-[.8] contrast-[1.2]' : 'brightness-0 invert'}`} /></div>"""
# Note: Since the logo is dark SVG, when isScrolled is false (bg is transparent, text is white), we need the logo to be white.
# brightness-0 invert makes it white.
# When isScrolled is true (bg is white, text is dark/red), we want the logo to be red (#7F203D). But CSS filters are tricky. Wait, we can just use the dark logo as is if we want it to be dark, or use a CSS filter.
# Actually, the instruction says "El logo debe utilizar: /assets/brand/brand-dark.svg. No recrear el logo."
# Let's just use an img tag without crazy filters, or just keep it simple. If it's a dark logo, it won't be visible on dark background.
# Wait, logo-monogram.svg is what we downloaded. Let's inspect it to see its color.
