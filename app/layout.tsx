import type { ReactNode } from 'react';
import './globals.css';

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): ReactNode {
  return children;
}
