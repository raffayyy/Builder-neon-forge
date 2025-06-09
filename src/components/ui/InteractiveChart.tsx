import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Zap,
  Eye,
  MousePointer,
  Clock,
  Star,
  Award,
  Code,
} from 'lucide-react';
import soundManager from '@/lib/soundManager';
import hapticManager from '@/lib/hapticManager';

interface ChartDataPoint {
  name: string;
  value: number;
  category?: string;
  color?: string;
  trend?: number;
}

interface InteractiveChartProps {
  title: string;
  data: ChartDataPoint[];
  type: 'line' | 'area' | 'bar' | 'pie' | 'radar';
  showControls?: boolean;
  animated?: boolean;
  className?: string;
}

const CHART_COLORS = [
  '#3B82F6', // Blue
  '#8B5CF6', // Purple  
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16', // Lime
];

const CustomTooltip = ({ active, payload, label, type }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-lg p-3 shadow-xl"
      >
        <p className="text-white font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-300 text-sm">
              {entry.name}: <span className="text-white font-medium">{entry.value}</span>
              {type === 'pie' && (
                <span className="text-gray-400 ml-1">
                  ({((entry.value / payload.reduce((sum, p) => sum + p.value, 0)) * 100).toFixed(1)}%)
                </span>
              )}
            </span>
          </div>
        ))}
      </motion.div>
    );
  }
  return null;
};

const ChartControls = ({ type, onTypeChange, animated, onAnimatedToggle }) => {
  const chartTypes = [
    { type: 'line', icon: Activity, label: 'Line' },
    { type: 'area', icon: TrendingUp, label: 'Area' },
    { type: 'bar', icon: BarChart3, label: 'Bar' },
    { type: 'pie', icon: PieChartIcon, label: 'Pie' },
    { type: 'radar', icon: Zap, label: 'Radar' },
  ];

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1">
        {chartTypes.map(({ type: chartType, icon: Icon, label }) => (
          <motion.button
            key={chartType}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
              type === chartType
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
            onClick={() => {
              onTypeChange(chartType);
              soundManager.playClick();
              hapticManager.impact('light');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-3 h-3" />
            {label}
          </motion.button>
        ))}
      </div>
      
      <motion.button
        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
          animated
            ? 'bg-purple-500 text-white'
            : 'bg-gray-700/50 text-gray-400 hover:text-white'
        }`}
        onClick={() => {
          onAnimatedToggle(!animated);
          soundManager.playClick();
          hapticManager.impact('light');
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Zap className="w-3 h-3" />
        Animated
      </motion.button>
    </div>
  );
};

const renderChart = (type: string, data: ChartDataPoint[], animated: boolean) => {
  const commonProps = {
    data,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  };

  switch (type) {
    case 'line':
      return (
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} />
          <Tooltip content={<CustomTooltip type={type} />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
            animationDuration={animated ? 1500 : 0}
          />
        </LineChart>
      );

    case 'area':
      return (
        <AreaChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} />
          <Tooltip content={<CustomTooltip type={type} />} />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            fill="url(#colorGradient)"
            strokeWidth={2}
            animationDuration={animated ? 1500 : 0}
          />
        </AreaChart>
      );

    case 'bar':
      return (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} />
          <Tooltip content={<CustomTooltip type={type} />} />
          <Bar
            dataKey="value"
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
            animationDuration={animated ? 1000 : 0}
          />
        </BarChart>
      );

    case 'pie':
      return (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            animationDuration={animated ? 1000 : 0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip type={type} />} />
        </PieChart>
      );

    case 'radar':
      return (
        <RadarChart width={400} height={300} data={data}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
          <PolarRadiusAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} />
          <Radar
            name="Value"
            dataKey="value"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.3}
            strokeWidth={2}
            animationDuration={animated ? 1000 : 0}
          />
          <Tooltip content={<CustomTooltip type={type} />} />
        </RadarChart>
      );

    default:
      return null;
  }
};

export default function InteractiveChart({
  title,
  data,
  type: initialType = 'line',
  showControls = true,
  animated = true,
  className = '',
}: InteractiveChartProps) {
  const [chartType, setChartType] = useState(initialType);
  const [isAnimated, setIsAnimated] = useState(animated);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Calculate statistics
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const average = total / data.length;
  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const growth = data.length > 1 ? 
    ((data[data.length - 1].value - data[0].value) / data[0].value * 100) : 0;

  const stats = [
    { label: 'Total', value: total.toLocaleString(), icon: BarChart3, color: 'text-blue-400' },
    { label: 'Average', value: average.toFixed(1), icon: Activity, color: 'text-purple-400' },
    { label: 'Max', value: maxValue.toLocaleString(), icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Growth', value: `${growth > 0 ? '+' : ''}${growth.toFixed(1)}%`, 
      icon: growth >= 0 ? TrendingUp : TrendingDown, 
      color: growth >= 0 ? 'text-emerald-400' : 'text-red-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-4 ${className}`}
    >
      <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </motion.div>
              {title}
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {data.length} data points
            </Badge>
          </div>
          
          {/* Statistics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30"
                whileHover={{ scale: 1.02, borderColor: '#3B82F6' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs text-gray-400">{stat.label}</span>
                </div>
                <div className={`text-lg font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          {showControls && (
            <ChartControls
              type={chartType}
              onTypeChange={setChartType}
              animated={isAnimated}
              onAnimatedToggle={setIsAnimated}
            />
          )}

          <motion.div
            key={chartType}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-80 bg-gray-800/30 rounded-lg p-4 border border-gray-700/30"
          >
            <ResponsiveContainer width="100%" height="100%">
              {renderChart(chartType, data, isAnimated)}
            </ResponsiveContainer>
          </motion.div>

          {/* Data Points Preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {data.slice(0, 6).map((point, index) => (
              <motion.div
                key={point.name}
                className={`px-3 py-1 rounded-full text-xs border transition-all duration-200 cursor-pointer ${
                  hoveredPoint === index
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                    : 'bg-gray-800/50 border-gray-700/50 text-gray-400'
                }`}
                onMouseEnter={() => {
                  setHoveredPoint(index);
                  soundManager.playHover();
                  hapticManager.impact('light');
                }}
                onMouseLeave={() => setHoveredPoint(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {point.name}: {point.value}
              </motion.div>
            ))}
            {data.length > 6 && (
              <div className="px-3 py-1 rounded-full text-xs bg-gray-700/50 border border-gray-600/50 text-gray-400">
                +{data.length - 6} more
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Export sample data generators for easy testing
export const generateSampleData = {
  revenue: () => [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
  ],
  
  skills: () => [
    { name: 'React', value: 95 },
    { name: 'TypeScript', value: 90 },
    { name: 'Node.js', value: 85 },
    { name: 'Python', value: 80 },
    { name: 'AWS', value: 75 },
    { name: 'Docker', value: 70 },
  ],
  
  projects: () => [
    { name: 'Frontend', value: 35 },
    { name: 'Backend', value: 25 },
    { name: 'Full Stack', value: 30 },
    { name: 'Mobile', value: 10 },
  ],
};
