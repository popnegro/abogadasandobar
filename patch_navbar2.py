with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

import_statement = "import { ActiveTab } from '../types';\nimport { ASSETS } from '../data/lawyerData';"
if "import { ASSETS" not in content:
    content = content.replace("import { ActiveTab } from '../types';", import_statement)

logo_old = """<div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-sm flex items-center justify-center font-serif font-bold text-lg sm:text-xl transition-colors ${isScrolled ? 'bg-[#7F203D] text-[#FFF8F2] group-hover:bg-[#691931]' : 'bg-white text-[#302D28] group-hover:bg-[#F4EFE8]'}`}>ES</div>"""
logo_new = """<div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-sm overflow-hidden bg-transparent"><img src={ASSETS.logoMonogram} alt="ES Logo" className="w-full h-full object-contain" /></div>"""

content = content.replace(logo_old, logo_new)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)
