import React, { useEffect, useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { ActiveTab, ContactFormData } from '../types';
import { Breadcrumb } from './Breadcrumb';
import { PageHero } from './PageHero';
import { ASSETS } from '../data/lawyerData';
import { LAWYER_INFO } from '../data/lawyerData';
import { submitFormspree } from '../lib/formspree';

interface ContactSectionProps {
  setActiveTab?: (tab: ActiveTab) => void;
  initialPracticeArea?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ setActiveTab = () => {}, initialPracticeArea }) => {
  const [clientType, setClientType] = useState<'particular' | 'empresa'>('particular');
  const [formData, setFormData] = useState<ContactFormData>({ clientType: 'particular', fullName: '', email: '', phone: '', practiceArea: initialPracticeArea || 'Otra Consulta Penal / Corporativa', urgency: 'ordinaria', message: '', acceptedPrivacy: true });
  const [consultationMode, setConsultationMode] = useState<'presencial' | 'videollamada' | 'telefonica'>('telefonica');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<'fullName' | 'email' | 'phone' | 'message', string>>>({});
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => { if (initialPracticeArea) setFormData(prev => ({ ...prev, practiceArea: initialPracticeArea })); }, [initialPracticeArea]);

  const handleTabChange = (type: 'particular' | 'empresa') => {
    setClientType(type);
    setFormData(prev => ({ ...prev, clientType: type }));
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<'fullName' | 'email' | 'phone' | 'message', string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = clientType === 'particular' ? 'Por favor ingrese su nombre completo.' : 'Por favor ingrese el nombre de la empresa.';
    if (clientType === 'empresa' && (!formData.email.trim() || !formData.email.includes('@'))) newErrors.email = 'Por favor ingrese un correo electrónico válido.';
    if (!formData.phone.trim()) newErrors.phone = 'Por favor ingrese un teléfono (WhatsApp).';
    if (!formData.message.trim()) newErrors.message = 'Por favor describa brevemente el motivo de su consulta.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0] as keyof typeof newErrors;
      const errorElement = document.querySelector(`[name="${firstErrorKey}"]`) as HTMLElement | null;
      errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      errorElement?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    const urgency = isUrgent ? 'detencion_inmediata' : 'ordinaria';
    const result = await submitFormspree({ _subject: `Nueva consulta — ${formData.fullName}`, clientType, fullName: formData.fullName, email: formData.email || undefined, phone: formData.phone, practiceArea: formData.practiceArea, consultationMode, urgency, message: formData.message });
    setIsSubmitting(false);
    if (!result.ok) {
      setSubmitError(result.error || 'No fue posible enviar la consulta. Inténtelo nuevamente.');
      return;
    }
    setFormData(prev => ({ ...prev, urgency }));
    setSubmittedCode(`EXP-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleReset = () => {
    setSubmittedCode(null);
    setSubmitError(null);
    setFormData({ clientType, fullName: '', email: '', phone: '', practiceArea: 'Otra Consulta Penal / Corporativa', urgency: 'ordinaria', message: '', acceptedPrivacy: true });
    setConsultationMode('telefonica');
    setErrors({});
    setIsUrgent(false);
  };

  return (
    <div id="contact-section" className="w-full">
      <PageHero 
        title="Contacto y Evaluación de Caso" 
        subtitle="Utilice este canal para una evaluación técnica de su caso bajo estricto secreto profesional." 
        eyebrow="Canal Directo & Confidencial" 
        breadcrumbLabel="Contacto & Consulta" 
        backgroundImage={ASSETS.deskDocs} 
        setActiveTab={setActiveTab} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"><div className="max-w-3xl mx-auto">
        {submittedCode ? (
          <div id="contact-success-state" className="space-y-8 text-center py-12 animate-in fade-in duration-700" role="status" aria-live="polite"><div className="w-20 h-20 rounded-full bg-[#A3B09F]/20 flex items-center justify-center mx-auto" aria-hidden="true"><CheckCircle className="w-10 h-10 text-[#302D28]" /></div><div className="space-y-4"><span className="text-xs uppercase tracking-widest font-bold text-[#7F203D]">Solicitud recibida</span><h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#302D28]">Hemos recibido su consulta</h2><p className="text-base sm:text-lg text-[#302D28]/80 max-w-xl mx-auto leading-relaxed font-light">Su mensaje fue enviado correctamente. Nos pondremos en contacto para coordinar los próximos pasos.</p><p className="text-xs text-[#302D28]/60">Referencia: {submittedCode}</p></div><button type="button" onClick={handleReset} className="text-xs font-bold uppercase tracking-widest text-[#302D28]/60 hover:text-[#302D28] transition-colors">Volver al formulario</button></div>
        ) : (
          <>
            <div className="flex border-b border-[#302D28]/20 mb-12 sm:mb-16">{(['particular', 'empresa'] as const).map(type => <button key={type} type="button" onClick={() => handleTabChange(type)} aria-pressed={clientType === type} className={`flex-1 pb-4 sm:pb-5 text-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 ${clientType === type ? 'border-b-2 border-[#7F203D]' : 'opacity-50 hover:opacity-80'}`}><span className={`block text-xs sm:text-sm font-bold uppercase tracking-widest ${clientType === type ? 'text-[#7F203D]' : 'text-[#302D28]'}`}>{type === 'particular' ? 'Particular' : 'Empresa y Directivos'}</span><span className="block text-[10px] sm:text-xs text-[#302D28]/60 font-light mt-1">{type === 'particular' ? 'Defensa Penal & Asistencia Directa' : 'Empresas, Directivos & Compliance'}</span></button>)}</div>

            <div id="selected-practice-area" className="mb-10 rounded-md border border-[#7F203D]/20 bg-[#7F203D]/5 px-5 py-4 sm:px-6 sm:py-5" role="status" aria-live="polite">
              <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7F203D]">Área de consulta</span>
              <p className="mt-1 text-base sm:text-lg font-serif font-bold text-[#302D28]">{formData.practiceArea}</p>
              <p className="mt-1 text-xs sm:text-sm text-[#302D28]/60 font-light">Esta área se enviará asociada a su consulta.</p>
              <input type="hidden" name="practiceArea" value={formData.practiceArea} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12 animate-in fade-in duration-700">
              <div className="space-y-8 sm:space-y-10">
                <div className="space-y-2"><label htmlFor="contact-full-name" className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7F203D]">{clientType === 'particular' ? 'Nombre completo' : 'Empresa / Razón Social'}</label><input id="contact-full-name" name="fullName" type="text" autoComplete="name" value={formData.fullName} onChange={e => { setFormData(prev => ({ ...prev, fullName: e.target.value })); if (errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined })); }} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'contact-full-name-error' : undefined} className={`w-full bg-transparent border-b px-0 py-3 text-lg sm:text-2xl text-[#302D28] placeholder-[#302D28]/30 focus:outline-none focus:border-[#7F203D] focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 transition-colors font-light ${errors.fullName ? 'border-red-500' : 'border-[#302D28]/25'}`} placeholder={clientType === 'particular' ? 'Ej. Juan Pérez' : 'Ej. Corporación ABC'} />{errors.fullName && <p id="contact-full-name-error" className="text-xs text-red-600 pt-1" role="alert">{errors.fullName}</p>}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"><div className="space-y-2"><label htmlFor="contact-phone" className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7F203D]">WhatsApp / Teléfono</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={e => { setFormData(prev => ({ ...prev, phone: e.target.value })); if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined })); }} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'contact-phone-error' : undefined} className={`w-full bg-transparent border-b px-0 py-3 text-lg sm:text-2xl text-[#302D28] placeholder-[#302D28]/30 focus:outline-none focus:border-[#7F203D] focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 transition-colors font-light ${errors.phone ? 'border-red-500' : 'border-[#302D28]/25'}`} placeholder="+54 9 261 512-3456" />{errors.phone && <p id="contact-phone-error" className="text-xs text-red-600 pt-1" role="alert">{errors.phone}</p>}</div>{clientType === 'empresa' && <div className="space-y-2"><label htmlFor="contact-email" className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7F203D]">Correo Electrónico Corporativo</label><input id="contact-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={e => { setFormData(prev => ({ ...prev, email: e.target.value })); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })); }} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} className={`w-full bg-transparent border-b px-0 py-3 text-lg sm:text-2xl text-[#302D28] placeholder-[#302D28]/30 focus:outline-none focus:border-[#7F203D] focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 transition-colors font-light ${errors.email ? 'border-red-500' : 'border-[#302D28]/25'}`} placeholder="nombre@empresa.com" />{errors.email && <p id="contact-email-error" className="text-xs text-red-600 pt-1" role="alert">{errors.email}</p>}</div>}</div>
                <div className="space-y-3"><span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7F203D] block">Modalidad de consulta</span><div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{([['presencial','Presencial'],['videollamada','Videollamada'],['telefonica','Telefónica']] as const).map(([value,label]) => <button key={value} type="button" aria-pressed={consultationMode === value} onClick={() => setConsultationMode(value)} className={`py-3 px-3 border text-xs font-bold uppercase tracking-wider transition-colors ${consultationMode === value ? 'border-[#7F203D] bg-[#7F203D]/10 text-[#7F203D]' : 'border-[#302D28]/20 text-[#302D28]/70 hover:border-[#7F203D]/50'}`}>{label}</button>)}</div></div>
                <div className="space-y-2"><label htmlFor="contact-message" className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7F203D]">Motivo de consulta</label><textarea id="contact-message" name="message" rows={4} value={formData.message} onChange={e => { setFormData(prev => ({ ...prev, message: e.target.value })); if (errors.message) setErrors(prev => ({ ...prev, message: undefined })); }} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} className={`w-full bg-transparent border-b px-0 py-3 text-lg sm:text-2xl text-[#302D28] placeholder-[#302D28]/30 focus:outline-none focus:border-[#7F203D] focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 transition-colors font-light resize-none leading-relaxed ${errors.message ? 'border-red-500' : 'border-[#302D28]/25'}`} placeholder="Describa brevemente los hechos o la situación procesal..." />{errors.message && <p id="contact-message-error" className="text-xs text-red-600 pt-1" role="alert">{errors.message}</p>}</div>
                {clientType === 'particular' && <div className="pt-2 flex items-center gap-3.5 group"><input id="urgent-checkbox" name="urgent" type="checkbox" checked={isUrgent} onChange={e => setIsUrgent(e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-[#7F203D] focus:ring-[#7F203D] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2" /><label htmlFor="urgent-checkbox" className="text-sm text-[#302D28]/80 group-hover:text-[#302D28] font-light select-none cursor-pointer">Necesito asistencia penal urgente (citación judicial inminente o detención)</label></div>}
              </div>
              {submitError && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3" role="alert">{submitError}</p>}
              <div className="pt-4 space-y-6 text-center"><button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-4 px-12 py-5 bg-[#302D28] hover:bg-[#181614] text-white text-xs sm:text-sm uppercase tracking-widest font-bold transition-all disabled:opacity-70 w-full sm:w-auto cursor-pointer focus-visible:ring-2 focus-visible:ring-[#302D28] focus-visible:ring-offset-2">{isSubmitting ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" /><span>Enviando…</span></> : <><span>Solicitar consulta</span><Send className="w-4 h-4" aria-hidden="true" /></>}</button><div className="text-xs text-[#302D28]/80 font-light max-w-lg mx-auto leading-relaxed p-3 bg-[#F4EFE8] border border-[#DDD2C5] rounded-md">Todas las comunicaciones están estrictamente amparadas bajo el secreto profesional (Mat. {LAWYER_INFO.collegianNumber}).</div></div>
            </form>
          </>
        )}
      </div></div>
    </div>
  );
};