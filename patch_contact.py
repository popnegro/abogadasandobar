import os

with open('src/components/ContactSection.tsx', 'r') as f:
    content = f.read()

# We need to add a hidden input for practiceArea so that the test passes and the form works cleanly if we were using a native form submission.
hidden_input = """<p className="mt-1 text-xs sm:text-sm text-[#302D28]/60 font-light">Esta área se enviará asociada a su consulta.</p>\n              <input type="hidden" name="practiceArea" value={formData.practiceArea} />"""

content = content.replace("""<p className="mt-1 text-xs sm:text-sm text-[#302D28]/60 font-light">Esta área se enviará asociada a su consulta.</p>""", hidden_input)

with open('src/components/ContactSection.tsx', 'w') as f:
    f.write(content)
