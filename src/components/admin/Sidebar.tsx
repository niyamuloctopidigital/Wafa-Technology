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
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-[#111111] border border-gray-800 text-gray-400 hover:text-[#4ADE80] transition-colors"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-[280px] bg-[#0a0a0a] border-r border-gray-800 flex flex-col z-40 transition-transform md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-8 border-b border-gray-800">
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-[#4ADE80] to-green-400 bg-clip-text text-transparent">
              Wafa
            </span>
            <span className="text-gray-200"> Technology</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Admin Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link key={item.href} href={item.href}>
                <span
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#4ADE80] bg-opacity-10 text-[#4ADE80] border border-[#4ADE80] border-opacity-30'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-[#111111]'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User section and logout */}
        <div className="border-t border-gray-800 px-4 py-4 space-y-3">
          <div className="px-4 py-3 bg-[#111111] rounded-lg border border-gray-800">
            <p className="text-xs text-gray-500 mb-1">Logged in as</p>
            <p className="text-sm text-gray-200 truncate font-medium">
              {session?.user?.name || 'Admin'}
            </p>
          </div>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/admin/login' })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400 hover:bg-opacity-5 transition-all border border-gray-800 hover:border-red-400 hover:border-opacity-30"
          >
            <FiLogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
