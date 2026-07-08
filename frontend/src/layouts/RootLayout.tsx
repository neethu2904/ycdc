import { BrowserRouter } from 'react-router-dom';
import type { RootLayoutProps } from '../types';

export default function RootLayout({ children }: RootLayoutProps) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
