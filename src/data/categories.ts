import { Category } from '../types';
import { 
  ShieldCheck, 
  Scale, 
  AlertTriangle, 
  Stethoscope, 
  LineChart,
  Code
} from 'lucide-react';

export const categories: Category[] = [
  {
    id: 'quality',
    title: 'Quality Management',
    description: 'ISO 13485:2016 requirements, quality system implementation, and best practices',
    icon: ShieldCheck,
    color: 'blue'
  },
  {
    id: 'regulatory',
    title: 'Regulatory Compliance',
    description: 'Global regulatory requirements, submissions, and compliance strategies',
    icon: Scale,
    color: 'purple'
  },
  {
    id: 'risk',
    title: 'Risk Management',
    description: 'ISO 14971, risk analysis, and risk management planning',
    icon: AlertTriangle,
    color: 'amber'
  },
  {
    id: 'clinical',
    title: 'Clinical Evaluation',
    description: 'Clinical studies, evidence gathering, and evaluation reports',
    icon: Stethoscope,
    color: 'green'
  },
  {
    id: 'postmarket',
    title: 'Post-Market Surveillance',
    description: 'Vigilance, PMCF, and safety monitoring systems',
    icon: LineChart,
    color: 'rose'
  },
  {
    id: 'software',
    title: 'Medical Software',
    description: 'IEC 62304, software validation, and cybersecurity requirements',
    icon: Code,
    color: 'indigo'
  }
];