import os

with open('src/components/HomeSection.tsx', 'r') as f:
    content = f.read()

# Make home hero height consistent and slightly more robust, using unified padding
# Currently min-h-[90vh] lg:min-h-screen
# And the button uses #7F203D with px-8 py-4.
# Let's ensure the rounded corners on buttons in HomeSection are consistent (rounded-none instead of rounded-sm to match the premium aesthetic we might want, or keep rounded-sm consistently everywhere. 
# Current ContactSection has `rounded-sm` or `rounded-none`? 
# "px-12 py-5 bg-[#302D28] hover:bg-[#181614] text-white text-xs sm:text-sm uppercase tracking-widest font-bold transition-all disabled:opacity-70 w-full sm:w-auto cursor-pointer focus-visible:ring-2 focus-visible:ring-[#302D28] focus-visible:ring-offset-2" (ContactSection, no rounded class -> rounded-none by default).
# In HomeSection: "w-full px-8 py-4 bg-[#7F203D] text-white font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-[#691931]"
# Let's remove rounded-sm from HomeSection buttons to unify with Contact.

content = content.replace("rounded-sm", "")

with open('src/components/HomeSection.tsx', 'w') as f:
    f.write(content)
