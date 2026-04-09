'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    document.body.classList.add('admin-dashboard');
    // Force dark mode for admin
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    setIsMounted(true);

    return () => {
      document.body.classList.remove('admin-dashboard');
      // Restore user's theme preference when leaving admin
      const stored = localStorage.getItem('wafa-theme');
      if (stored === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    };
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated' && isMounted && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [status, router, isMounted, pathname]);

  if (!isMounted || status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="text-center">
          <div className="mb-4 inline-block">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#0a0a0a] border-t-[#4ADE80]"></div>
          </div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' && pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="border-b border-gray-800 bg-[#111111] px-8 py-4 flex items-center justify-between">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-200">
                {session?.user?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4ADE80] to-green-600 flex items-center justify-center text-white font-semibold">
              {session?.user?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
