'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import {
  FiHome,
  FiUsers,
  FiFolder,
  FiGrid,
  FiFileText,
  FiMail,
  FiSettings,
  FiMenu,
  FiX,
  FiLogOut,
  FiStar,
} from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: FiHome },
  { label: 'Team', href: '/admin/team', icon: FiUsers },
  { label: 'Projects', href: '/admin/projects', icon: FiFolder },
  { label: 'Services', href: '/admin/services', icon: FiGrid },
  { label: 'Testimonials', href: '/admin/testimonials', icon: FiStar },
  { label: 'Blog', href: '/admin/blog', icon: FiFileText },
  { label: 'Leads', href: '/admin/leads', icon: FiMail },
  { label: 'Settings', href: '/admin/settings', icon: FiSettings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-[#16a34a] transition-colors shadow-sm"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-[260px] bg-white border-r border-gray-200 flex flex-col z-40 transition-transform md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-2">
            <img
              src="https://assets.cdn.filesafe.space/j53xn6YJHwIdPImV00rn/media/69d764e6ebf1a6084361a27e.webp"
              alt="Wafa Technology"
              className="h-8 w-auto"
            />
          </Link>
          <p className="text-[10px] text-gray-400 mt-1.5 uppercase tracking-widest">Admin Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href + '/'));

            return (
              <Link key={item.href} href={item.href}>
                <span
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-600 font-medium'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User section and logout */}
        <div className="border-t border-gray-100 px-3 py-4 space-y-2">
          <div className="px-3 py-2.5 bg-gray-50 rounded-lg">
            <p className="text-[10px] text-gray-400 mb-0.5">Logged in as</p>
            <p className="text-sm text-gray-700 truncate font-medium">
              {session?.user?.name || 'Admin'}
            </p>
          </div>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/admin/login' })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all text-sm"
          >
            <FiLogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
