import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Clock,
  MousePointer,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Activity,
  BarChart3,
  PieChart,
  Settings,
  RefreshCw,
  Download,
  Share2,
  Calendar,
  MapPin,
  Star,
  Award,
  Code,
  Zap,
  Target,
  Coffee,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import InteractiveChart, { generateSampleData } from './InteractiveChart';
import soundManager from '@/lib/soundManager';
import hapticManager from '@/lib/hapticManager';

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  avgTimeOnSite: number;
  bounceRate: number;
  conversionRate: number;
  deviceBreakdown: { device: string; percentage: number; count: number }[];
  topPages: { page: string; views: number; avgTime: number }[];
  geographicData: { country: string; visitors: number; percentage: number }[];
  dailyViews: { date: string; views: number; visitors: number }[];
  skillInteractions: { skill: string; hovers: number; clicks: number }[];
  projectEngagement: { project: string; views: number; demos: number; github: number }[];
}

const generateMockAnalytics = (): AnalyticsData => ({
  totalViews: 15420,
  uniqueVisitors: 8937,
  avgTimeOnSite: 342, // seconds
  bounceRate: 24.5,
  conversionRate: 8.2,
  deviceBreakdown: [
    { device: 'Desktop', percentage: 65, count: 5821 },
    { device: 'Mobile', percentage: 28, count: 2502 },
    { device: 'Tablet', percentage: 7, count: 614 },
  ],
  topPages: [
    { page: 'Portfolio', views: 6842, avgTime: 456 },
    { page: 'Projects', views: 4231, avgTime: 523 },
    { page: 'Resume', views: 3847, avgTime: 723 },
    { page: 'Blog', views: 2156, avgTime: 312 },
    { page: 'Contact', views: 1234, avgTime: 189 },
  ],
  geographicData: [
    { country: 'United States', visitors: 3247, percentage: 36.3 },
    { country: 'Germany', visitors: 1564, percentage: 17.5 },
    { country: 'United Kingdom', visitors: 1234, percentage: 13.8 },
    { country: 'Canada', visitors: 987, percentage: 11.0 },
    { country: 'India', visitors: 654, percentage: 7.3 },
    { country: 'Others', visitors: 1251, percentage: 14.1 },
  ],
  dailyViews: [
    { date: '2024-01-01', views: 234, visitors: 156 },
    { date: '2024-01-02', views: 321, visitors: 203 },
    { date: '2024-01-03', views: 456, visitors: 298 },
    { date: '2024-01-04', views: 398, visitors: 245 },
    { date: '2024-01-05', views: 567, visitors: 356 },
    { date: '2024-01-06', views: 432, visitors: 278 },
    { date: '2024-01-07', views: 389, visitors: 234 },
  ],
  skillInteractions: [
    { skill: 'React', hovers: 1247, clicks: 89 },
    { skill: 'TypeScript', hovers: 934, clicks: 67 },
    { skill: 'Node.js', hovers: 823, clicks: 54 },
    { skill: 'Python', hovers: 756, clicks: 43 },
    { skill: 'AWS', hovers: 645, clicks: 38 },
  ],
  projectEngagement: [
    { project: 'AI Code Reviewer', views: 2341, demos: 456, github: 123 },
    { project: '3D Portfolio', views: 1987, demos: 389, github: 98 },
    { project: 'Smart LMS', views: 1654, demos: 278, github: 76 },
    { project: 'E-commerce Platform', views: 1234, demos: 198, github: 54 },
  ],
});

const MetricCard = ({ icon: Icon, title, value, change, trend, color = 'blue' }) => {
  const isPositive = change > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-400',
    purple: 'from-purple-500 to-pink-400',
    emerald: 'from-emerald-500 to-green-400',
    amber: 'from-amber-500 to-orange-400',
    red: 'from-red-500 to-pink-400',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="group cursor-pointer"
      onClick={() => {
        soundManager.playClick();
        hapticManager.impact('light');
      }}
    >
      <Card className="bg-gray-900/50 border-gray-700/50 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} p-0.5`}
              whileHover={{ rotate: 5 }}
            >
              <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            
            <motion.div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                isPositive
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <TrendIcon className="w-3 h-3" />
              {Math.abs(change)}%
            </motion.div>
          </div>
          
          <motion.div
            className="text-3xl font-bold text-white mb-1"
            whileHover={{ scale: 1.05 }}
          >
            {value}
          </motion.div>
          
          <div className="text-gray-400 text-sm group-hover:text-white transition-colors">
            {title}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const DeviceBreakdownCard = ({ data }) => {
  const deviceIcons = {
    Desktop: Monitor,
    Mobile: Smartphone,
    Tablet: Tablet,
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-purple-400" />
          Device Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((device, index) => {
          const Icon = deviceIcons[device.device];
          return (
            <motion.div
              key={device.device}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center"
                >
                  <Icon className="w-4 h-4 text-purple-400" />
                </motion.div>
                <div>
                  <div className="text-white font-medium">{device.device}</div>
                  <div className="text-gray-400 text-sm">{device.count.toLocaleString()} users</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-white font-bold">{device.percentage}%</div>
                <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${device.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

const TopPagesCard = ({ data }) => {
  return (
    <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          Top Pages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((page, index) => (
            <motion.div
              key={page.page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors group"
              whileHover={{ x: 5 }}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{page.page}</span>
                  <span className="text-emerald-400 font-bold">{page.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Avg. time: {Math.floor(page.avgTime / 60)}m {page.avgTime % 60}s</span>
                  <div className="w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(page.views / Math.max(...data.map(p => p.views))) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const GeographicDataCard = ({ data }) => {
  return (
    <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-400" />
          Geographic Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((country, index) => (
            <motion.div
              key={country.country}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 flex-1">
                <motion.div
                  className="w-3 h-3 rounded-full bg-amber-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
                <span className="text-white font-medium">{country.country}</span>
              </div>
              
              <div className="text-right">
                <div className="text-amber-400 font-bold">{country.visitors.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">{country.percentage}%</div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const RealTimeMetrics = () => {
  const [realTimeData, setRealTimeData] = useState({
    currentVisitors: 23,
    sessionDuration: 342,
    pagesPerSession: 3.2,
    newSessions: 67,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        currentVisitors: prev.currentVisitors + Math.floor(Math.random() * 3) - 1,
        sessionDuration: prev.sessionDuration + Math.floor(Math.random() * 10) - 5,
        pagesPerSession: Math.max(1, prev.pagesPerSession + (Math.random() - 0.5) * 0.1),
        newSessions: prev.newSessions + Math.floor(Math.random() * 2),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: 'Active Users', value: realTimeData.currentVisitors, icon: Users, color: 'text-green-400' },
    { label: 'Avg. Session', value: `${Math.floor(realTimeData.sessionDuration / 60)}m`, icon: Clock, color: 'text-blue-400' },
    { label: 'Pages/Session', value: realTimeData.pagesPerSession.toFixed(1), icon: Eye, color: 'text-purple-400' },
    { label: 'New Sessions', value: `${realTimeData.newSessions}%`, icon: Activity, color: 'text-amber-400' },
  ];

  return (
    <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Activity className="w-5 h-5 text-green-400" />
          </motion.div>
          Real-time Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                <metric.icon className={`w-6 h-6 mx-auto mb-2 ${metric.color}`} />
              </motion.div>
              <div className="text-xl font-bold text-white">{metric.value}</div>
              <div className="text-xs text-gray-400">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function AnalyticsDashboard() {
  const [data] = useState<AnalyticsData>(generateMockAnalytics());
  const [timeRange, setTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    soundManager.playClick();
    hapticManager.impact('medium');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    soundManager.playSuccess();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const handleExport = () => {
    soundManager.playClick();
    hapticManager.impact('light');
    // Simulate export functionality
    console.log('Exporting analytics data...');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Track your portfolio performance and visitor engagement</p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <motion.button
                key={range}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => {
                  setTimeRange(range);
                  soundManager.playClick();
                  hapticManager.impact('light');
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {range}
              </motion.button>
            ))}
          </motion.div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50"
          >
            <motion.div
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
            >
              <RefreshCw className="w-4 h-4" />
            </motion.div>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          icon={Eye}
          title="Total Views"
          value={data.totalViews.toLocaleString()}
          change={12.5}
          color="blue"
        />
        <MetricCard
          icon={Users}
          title="Unique Visitors"
          value={data.uniqueVisitors.toLocaleString()}
          change={8.3}
          color="purple"
        />
        <MetricCard
          icon={Clock}
          title="Avg. Time on Site"
          value={formatTime(data.avgTimeOnSite)}
          change={-2.1}
          color="emerald"
        />
        <MetricCard
          icon={TrendingDown}
          title="Bounce Rate"
          value={`${data.bounceRate}%`}
          change={-5.2}
          color="amber"
        />
        <MetricCard
          icon={Target}
          title="Conversion Rate"
          value={`${data.conversionRate}%`}
          change={15.7}
          color="emerald"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart
          title="Daily Views & Visitors"
          data={data.dailyViews.map(item => ({ name: item.date.split('-')[2], value: item.views }))}
          type="area"
        />
        
        <InteractiveChart
          title="Skill Interactions"
          data={data.skillInteractions.map(item => ({ name: item.skill, value: item.hovers + item.clicks }))}
          type="bar"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RealTimeMetrics />
        <DeviceBreakdownCard data={data.deviceBreakdown} />
        <TopPagesCard data={data.topPages} />
      </div>

      {/* Geographic & Engagement Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GeographicDataCard data={data.geographicData} />
        
        <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-400" />
              Project Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.projectEngagement.map((project, index) => (
                <motion.div
                  key={project.project}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">{project.project}</h4>
                    <Badge variant="outline" className="text-xs">
                      {project.views} views
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-blue-400 font-bold">{project.demos}</div>
                      <div className="text-xs text-gray-400">Demos</div>
                    </div>
                    <div>
                      <div className="text-purple-400 font-bold">{project.github}</div>
                      <div className="text-xs text-gray-400">GitHub</div>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-bold">
                        {((project.demos + project.github) / project.views * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-400">Engagement</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center py-8 border-t border-gray-700/50"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Portfolio Score', value: '96/100', icon: Star },
            { label: 'SEO Score', value: '94/100', icon: TrendingUp },
            { label: 'Performance', value: '98/100', icon: Zap },
            { label: 'User Rating', value: '4.9/5', icon: Award },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              </motion.div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
