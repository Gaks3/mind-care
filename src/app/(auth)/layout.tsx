import type { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <div className='h-screen flex flex-col items-center justify-center'>
        {children}
      </div>
    </main>
  );
}
