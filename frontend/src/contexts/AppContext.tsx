import { createContext, useContext, type ReactNode } from 'react';
import type { AppContextValue } from '../types';

const appContextValue: AppContextValue = {
  brandName: 'YCDC',
  fullName: 'Yogiraj Centre for Dermatology & Cosmetology',
  phone: '+917593864264',
  whatsapp: '+918884254545',
  email: 'info@ycdc.in',
  workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
  branches: [
    {
      id: 'trivandrum',
      name: 'Pattom, Trivandrum',
      city: 'Trivandrum',
      address: 'Marappalam Road, Opp. IndusInd Bank, Pattom'
    },
    {
      id: 'bangalore',
      name: 'Whitefield, Bangalore',
      city: 'Bangalore',
      address: '4th Floor, Premium Square, Whitefield Main Road'
    }
  ],
  socialLinks: {
    instagram: 'https://www.instagram.com/ycdc_india?igsh=MXFmYnBwdnFqdDltaA==',
    youtube: 'https://www.youtube.com/@YCDC_INDIA',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  }
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
}
