'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  onClick,
  disabled = false,
}: ButtonProps) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary:
      'bg-green-500 text-dark font-semibold hover:bg-green-400 shadow-lg shadow-green-500/50 hover:shadow-green-400/70 disabled:opacity-50 disabled:cursor-not-allowed',
    outline:
      'border-2 border-green-500 text-green-400 font-semibold hover:bg-green-500/10 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost:
      'text-green-400 font-semibold hover:bg-green-500/10 disabled:opacity-50 disabled:cursor-not-allowed',
  };

  const baseClasses =
    'rounded-lg font-space-grotesk font-semibold transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap';

  const fullClassName = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const motionProps = {
    whileHover: !disabled ? { scale: 1.05 } : undefined,
    whileTap: !disabled ? { scale: 0.98 } : undefined,
  };

  if (href) {
    return (
      <Link href={href}>
        <motion.button
          {...motionProps}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className={fullClassName}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </motion.button>
      </Link>
    );
  }

  return (
    <motion.button
      {...motionProps}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={fullClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;
