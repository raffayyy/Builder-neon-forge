import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  animate?: boolean;
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button' | 'chart';
  count?: number;
}

const shimmerVariants = {
  loading: {
    x: ['-100%', '100%'],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

const pulseVariants = {
  loading: {
    opacity: [0.5, 1, 0.5],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

const BaseSkeleton: React.FC<SkeletonProps> = ({
  className,
  animate = true,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-md bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50',
        className
      )}
      variants={animate ? pulseVariants : undefined}
      animate={animate ? 'loading' : undefined}
      {...props}
    >
      {animate && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          variants={shimmerVariants}
          animate="loading"
          style={{
            transformOrigin: 'left',
          }}
        />
      )}
    </motion.div>
  );
};

// Text Skeleton
export const SkeletonText: React.FC<SkeletonProps> = ({
  className,
  count = 1,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <BaseSkeleton
          key={i}
          className={cn('h-4', i === count - 1 && count > 1 ? 'w-3/4' : 'w-full', className)}
          {...props}
        />
      ))}
    </div>
  );
};

// Avatar Skeleton
export const SkeletonAvatar: React.FC<SkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <BaseSkeleton
      className={cn('w-12 h-12 rounded-full', className)}
      {...props}
    />
  );
};

// Button Skeleton
export const SkeletonButton: React.FC<SkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <BaseSkeleton
      className={cn('h-10 w-24 rounded-md', className)}
      {...props}
    />
  );
};

// Card Skeleton
export const SkeletonCard: React.FC<SkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        'bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 space-y-4',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center space-x-4">
        <SkeletonAvatar />
        <div className="space-y-2 flex-1">
          <BaseSkeleton className="h-4 w-1/3" {...props} />
          <BaseSkeleton className="h-3 w-1/2" {...props} />
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-2">
        <BaseSkeleton className="h-4 w-full" {...props} />
        <BaseSkeleton className="h-4 w-4/5" {...props} />
        <BaseSkeleton className="h-4 w-3/5" {...props} />
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex space-x-2">
          <BaseSkeleton className="h-6 w-16 rounded-full" {...props} />
          <BaseSkeleton className="h-6 w-20 rounded-full" {...props} />
        </div>
        <SkeletonButton className="w-16 h-8" {...props} />
      </div>
    </motion.div>
  );
};

// Chart Skeleton
export const SkeletonChart: React.FC<SkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        'bg-gray-900/50 border border-gray-700/50 rounded-lg p-6',
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <BaseSkeleton className="h-6 w-32" {...props} />
        <BaseSkeleton className="h-4 w-16 rounded-full" {...props} />
      </div>
      
      {/* Chart Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2 text-center">
            <BaseSkeleton className="h-3 w-12 mx-auto" {...props} />
            <BaseSkeleton className="h-6 w-16 mx-auto" {...props} />
          </div>
        ))}
      </div>
      
      {/* Chart Area */}
      <BaseSkeleton className="h-64 w-full rounded-lg" {...props} />
      
      {/* Chart Legend */}
      <div className="flex justify-center space-x-4 mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <BaseSkeleton className="w-3 h-3 rounded-full" {...props} />
            <BaseSkeleton className="h-3 w-12" {...props} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Project Card Skeleton
export const SkeletonProjectCard: React.FC<SkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        'bg-gray-900/50 border border-gray-700/50 rounded-lg overflow-hidden',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <BaseSkeleton className="h-48 w-full rounded-none" {...props} />
      
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title and Status */}
        <div className="flex items-start justify-between">
          <BaseSkeleton className="h-6 w-2/3" {...props} />
          <BaseSkeleton className="h-5 w-16 rounded-full" {...props} />
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <BaseSkeleton className="h-4 w-full" {...props} />
          <BaseSkeleton className="h-4 w-4/5" {...props} />
        </div>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <BaseSkeleton
              key={i}
              className="h-6 w-16 rounded-full"
              {...props}
            />
          ))}
        </div>
        
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-700/50">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="text-center space-y-1">
              <BaseSkeleton className="h-5 w-8 mx-auto" {...props} />
              <BaseSkeleton className="h-3 w-12 mx-auto" {...props} />
            </div>
          ))}
        </div>
        
        {/* Buttons */}
        <div className="flex gap-3">
          <SkeletonButton className="flex-1" {...props} />
          <SkeletonButton className="w-10 h-10" {...props} />
        </div>
      </div>
    </motion.div>
  );
};

// Timeline Skeleton
export const SkeletonTimeline: React.FC<SkeletonProps> = ({
  className,
  count = 3,
  ...props
}) => {
  return (
    <div className={cn('space-y-8', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="flex gap-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          {/* Timeline dot */}
          <div className="flex flex-col items-center">
            <BaseSkeleton className="w-4 h-4 rounded-full" {...props} />
            {i < count - 1 && (
              <BaseSkeleton className="w-0.5 h-16 mt-2" {...props} />
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <BaseSkeleton className="h-5 w-48" {...props} />
              <BaseSkeleton className="h-4 w-24" {...props} />
            </div>
            <BaseSkeleton className="h-4 w-32" {...props} />
            <div className="space-y-2">
              <BaseSkeleton className="h-3 w-full" {...props} />
              <BaseSkeleton className="h-3 w-3/4" {...props} />
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <BaseSkeleton
                  key={j}
                  className="h-5 w-12 rounded-full"
                  {...props}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Stats Grid Skeleton
export const SkeletonStatsGrid: React.FC<SkeletonProps> = ({
  className,
  count = 4,
  ...props
}) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 text-center space-y-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <BaseSkeleton className="w-12 h-12 rounded-xl mx-auto" {...props} />
          <BaseSkeleton className="h-8 w-16 mx-auto" {...props} />
          <BaseSkeleton className="h-4 w-20 mx-auto" {...props} />
        </motion.div>
      ))}
    </div>
  );
};

// Blog Post Skeleton
export const SkeletonBlogPost: React.FC<SkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        'bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 space-y-4',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BaseSkeleton className="h-4 w-16 rounded-full" {...props} />
          <BaseSkeleton className="h-3 w-20" {...props} />
        </div>
        <BaseSkeleton className="h-3 w-16" {...props} />
      </div>
      
      {/* Title */}
      <BaseSkeleton className="h-6 w-3/4" {...props} />
      
      {/* Summary */}
      <div className="space-y-2">
        <BaseSkeleton className="h-4 w-full" {...props} />
        <BaseSkeleton className="h-4 w-5/6" {...props} />
      </div>
      
      {/* Tags */}
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <BaseSkeleton
            key={i}
            className="h-5 w-12 rounded-full"
            {...props}
          />
        ))}
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
        <BaseSkeleton className="h-4 w-24" {...props} />
        <SkeletonButton className="w-20 h-8" {...props} />
      </div>
    </motion.div>
  );
};

// Page Loading Skeleton
export const SkeletonPageLoading: React.FC<{ type: 'portfolio' | 'resume' | 'blog' }> = ({
  type,
}) => {
  switch (type) {
    case 'portfolio':
      return (
        <div className="min-h-screen bg-gray-950 p-6 space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-6 py-20">
            <SkeletonAvatar className="w-32 h-32 mx-auto" />
            <SkeletonText count={2} className="max-w-md mx-auto" />
            <div className="flex justify-center gap-4">
              <SkeletonButton />
              <SkeletonButton />
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonProjectCard key={i} />
            ))}
          </div>
        </div>
      );
      
    case 'resume':
      return (
        <div className="min-h-screen bg-gray-950 p-6 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 py-12">
            <SkeletonText className="h-8 w-64 mx-auto" />
            <SkeletonText count={2} className="max-w-lg mx-auto" />
          </div>
          
          {/* Timeline */}
          <SkeletonTimeline count={4} />
          
          {/* Skills Grid */}
          <SkeletonStatsGrid count={8} />
        </div>
      );
      
    case 'blog':
      return (
        <div className="min-h-screen bg-gray-950 p-6 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 py-12">
            <SkeletonText className="h-8 w-48 mx-auto" />
            <SkeletonText className="max-w-md mx-auto" />
          </div>
          
          {/* Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonBlogPost key={i} />
            ))}
          </div>
        </div>
      );
      
    default:
      return null;
  }
};

export default BaseSkeleton;
