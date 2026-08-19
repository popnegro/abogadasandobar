import { AlertCircle, Building2, Briefcase, FileCheck, Lock, Scale, Search, ShieldAlert } from 'lucide-react';
import type { ReactElement } from 'react';

export function getServiceIcon(iconName: string, className: string): ReactElement {
  switch (iconName) {
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'Scale': return <Scale className={className} />;
    case 'FileCheck': return <FileCheck className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Lock': return <Lock className={className} />;
    case 'AlertCircle': return <AlertCircle className={className} />;
    case 'Search': return <Search className={className} />;
    case 'Building2': return <Building2 className={className} />;
    default: return <Scale className={className} />;
  }
}
