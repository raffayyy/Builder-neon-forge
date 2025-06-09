import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Globe,
  Clock,
  Download,
  RefreshCcw,
  Calendar,
  Target,
  MousePointer,
  ArrowUp,
  ArrowDown,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface AnalyticsData {
  overview: {
    totalVisitors: number;
    pageViews: number;
    bounceRate: number;
    averageSessionDuration: string;
    newVisitors: number;
    returningVisitors: number;
  };
  traffic: {
    sources: Array<{
      source: string;
      visitors: number;
      percentage: number;
      change: number;
    }>;
    topPages: Array<{
      page: string;
      views: number;
      uniqueViews: number;
      bounceRate: number;
    }>;
    devices: Array<{
      device: string;
      percentage: number;
      sessions: number;
    }>;
  };
  performance: {
    loadTime: number;
    coreWebVitals: {
      lcp: number; // Largest Contentful Paint
      fid: number; // First Input Delay
      cls: number; // Cumulative Layout Shift
    };
    conversionRate: number;
  };
  realTime: {
    activeUsers: number;
    topActivePages: Array<{
      page: string;
      users: number;
    }>;
    events: Array<{
      event: string;
      timestamp: Date;
      page: string;
    }>;
  };
}

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock analytics data - in real app, this would come from Google Analytics API
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalyticsData({
        overview: {
          totalVisitors: 12547,
          pageViews: 23891,
          bounceRate: 34.2,
          averageSessionDuration: "2m 45s",
          newVisitors: 8321,
          returningVisitors: 4226,
        },
        traffic: {
          sources: [
            { source: "Direct", visitors: 5432, percentage: 43.3, change: 12.5 },
            { source: "Google", visitors: 3981, percentage: 31.7, change: -5.2 },
            { source: "LinkedIn", visitors: 1876, percentage: 14.9, change: 23.1 },
            { source: "GitHub", visitors: 892, percentage: 7.1, change: 8.7 },
            { source: "Twitter", visitors: 366, percentage: 2.9, change: -12.3 },
          ],
          topPages: [
            { page: "/", views: 8543, uniqueViews: 6721, bounceRate: 28.4 },
            { page: "/projects", views: 5632, uniqueViews: 4891, bounceRate: 22.1 },
            { page: "/about", views: 3421, uniqueViews: 2987, bounceRate: 35.6 },
            { page: "/contact", views: 2134, uniqueViews: 1876, bounceRate: 41.2 },
            { page: "/blog", views: 1987, uniqueViews: 1654, bounceRate: 33.8 },
          ],
          devices: [
            { device: "Desktop", percentage: 65.4, sessions: 8213 },
            { device: "Mobile", percentage: 28.7, sessions: 3601 },
            { device: "Tablet", percentage: 5.9, sessions: 733 },
          ],
        },
        performance: {
          loadTime: 1.2,
          coreWebVitals: {
            lcp: 1.8,
            fid: 95,
            cls: 0.08,
          },
          conversionRate: 3.4,
        },
        realTime: {
          activeUsers: 23,
          topActivePages: [
            { page: "/", users: 12 },
            { page: "/projects", users: 7 },
            { page: "/about", users: 4 },
          ],
          events: [
            { event: "Page View", timestamp: new Date(Date.now() - 30000), page: "/" },
            { event: "Contact Form", timestamp: new Date(Date.now() - 45000), page: "/contact" },
            { event: "Project Click", timestamp: new Date(Date.now() - 60000), page: "/projects" },
          ],
        },
      });
      
      setLoading(false);
      setLastUpdated(new Date());
    };

    fetchAnalytics();
  }, [timeRange]);

  const refreshData = () => {
    setAnalyticsData(null);
    setLoading(true);
    // Trigger refetch
    setTimeRange(prev => prev);
  };

  const exportData = () => {
    // In real app, this would export analytics data as CSV/PDF
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${timeRange}-${Date.now()}.json`;
    link.click();
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <div className="flex items-center space-x-2">
            <RefreshCcw className="animate-spin h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-400">Loading analytics...</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-gray-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button onClick={refreshData} variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.totalVisitors.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +12.5% from last period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                <Eye className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.pageViews.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +8.2% from last period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                <MousePointer className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.bounceRate}%</div>
                <div className="flex items-center text-xs text-red-500">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  -2.1% from last period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
                <Clock className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.averageSessionDuration}</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +15.3% from last period
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visitor Types */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>New Visitors</span>
                    <span className="font-semibold">{analyticsData.overview.newVisitors.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={(analyticsData.overview.newVisitors / analyticsData.overview.totalVisitors) * 100} 
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Returning Visitors</span>
                    <span className="font-semibold">{analyticsData.overview.returningVisitors.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={(analyticsData.overview.returningVisitors / analyticsData.overview.totalVisitors) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Google Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Set Conversion Goals
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Traffic Tab */}
        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.traffic.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500" style={{ 
                          backgroundColor: `hsl(${index * 60}, 70%, 50%)` 
                        }}></div>
                        <span>{source.source}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold">{source.visitors.toLocaleString()}</span>
                        <Badge 
                          variant={source.change > 0 ? "default" : "secondary"}
                          className={source.change > 0 ? "bg-green-600" : "bg-red-600"}
                        >
                          {source.change > 0 ? "+" : ""}{source.change}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.traffic.devices.map((device, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{device.device}</span>
                        <span className="font-semibold">{device.percentage}%</span>
                      </div>
                      <Progress value={device.percentage} className="h-2" />
                      <p className="text-xs text-gray-400">{device.sessions.toLocaleString()} sessions</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.traffic.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div>
                      <div className="font-medium">{page.page}</div>
                      <div className="text-sm text-gray-400">
                        {page.views.toLocaleString()} views • {page.uniqueViews.toLocaleString()} unique
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{page.bounceRate}%</div>
                      <div className="text-sm text-gray-400">bounce rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Core Web Vitals */}
            <Card>
              <CardHeader>
                <CardTitle>Core Web Vitals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Largest Contentful Paint (LCP)</span>
                    <Badge variant={analyticsData.performance.coreWebVitals.lcp <= 2.5 ? "default" : "destructive"}>
                      {analyticsData.performance.coreWebVitals.lcp}s
                    </Badge>
                  </div>
                  <Progress 
                    value={Math.min((analyticsData.performance.coreWebVitals.lcp / 4) * 100, 100)} 
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>First Input Delay (FID)</span>
                    <Badge variant={analyticsData.performance.coreWebVitals.fid <= 100 ? "default" : "destructive"}>
                      {analyticsData.performance.coreWebVitals.fid}ms
                    </Badge>
                  </div>
                  <Progress 
                    value={Math.min((analyticsData.performance.coreWebVitals.fid / 300) * 100, 100)} 
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Cumulative Layout Shift (CLS)</span>
                    <Badge variant={analyticsData.performance.coreWebVitals.cls <= 0.1 ? "default" : "destructive"}>
                      {analyticsData.performance.coreWebVitals.cls}
                    </Badge>
                  </div>
                  <Progress 
                    value={Math.min((analyticsData.performance.coreWebVitals.cls / 0.25) * 100, 100)} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Average Load Time</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{analyticsData.performance.loadTime}s</span>
                    <Badge variant="default" className="bg-green-600">Good</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Conversion Rate</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{analyticsData.performance.conversionRate}%</span>
                    <div className="flex items-center text-xs text-green-500">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      +0.3%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Real-time Tab */}
        <TabsContent value="realtime" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Active Users</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">{analyticsData.realTime.activeUsers}</div>
                <div className="space-y-2">
                  {analyticsData.realTime.topActivePages.map((page, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{page.page}</span>
                      <span className="font-semibold">{page.users} users</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.realTime.events.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                      <div>
                        <div className="font-medium">{event.event}</div>
                        <div className="text-sm text-gray-400">{event.page}</div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {Math.floor((Date.now() - event.timestamp.getTime()) / 1000)}s ago
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AnalyticsDashboard;
