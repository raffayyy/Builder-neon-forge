import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  FileText,
  User,
  BarChart3,
  Eye,
  Shield,
  RefreshCw,
  Layout,
  Database,
  Palette,
  Bell,
  LogOut,
  Menu,
  X,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLogin from "@/components/admin/AdminLogin";
import ContentManager from "@/components/admin/ContentManager";
import LayoutManager from "@/components/admin/LayoutManager";
import SEOManager from "@/components/admin/SEOManager";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import IntegrationsManager from "@/components/admin/IntegrationsManager";
import SecuritySettings from "@/components/admin/SecuritySettings";
import PreviewMode from "@/components/admin/PreviewMode";

interface AdminState {
  isAuthenticated: boolean;
  user: {
    name: string;
    role: string;
    lastLogin: string;
  } | null;
  activeTab: string;
  notifications: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    timestamp: Date;
  }>;
  isPreviewMode: boolean;
  isDarkMode: boolean;
}

const sidebarItems = [
  {
    id: "content",
    label: "Content Manager",
    icon: FileText,
    description: "Manage projects, blogs, testimonials",
    color: "text-blue-400",
  },
  {
    id: "layout",
    label: "Layout & Visibility",
    icon: Layout,
    description: "Section visibility, reordering",
    color: "text-purple-400",
  },
  {
    id: "seo",
    label: "SEO & Meta",
    icon: BarChart3,
    description: "Meta tags, keywords, Open Graph",
    color: "text-emerald-400",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: Database,
    description: "Real-time metrics and insights",
    color: "text-orange-400",
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: RefreshCw,
    description: "GitHub, LinkedIn, APIs",
    color: "text-cyan-400",
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    description: "Access control, passwords",
    color: "text-red-400",
  },
  {
    id: "preview",
    label: "Preview Mode",
    icon: Eye,
    description: "Test changes before going live",
    color: "text-pink-400",
  },
];

export default function Admin() {
  const [adminState, setAdminState] = useState<AdminState>({
    isAuthenticated: false,
    user: null,
    activeTab: "content",
    notifications: [],
    isPreviewMode: false,
    isDarkMode: true,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Authentication check
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("admin_token");
      const userData = localStorage.getItem("admin_user");
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          setAdminState(prev => ({
            ...prev,
            isAuthenticated: true,
            user,
          }));
        } catch (error) {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_user");
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      if (credentials.username === "admin" && credentials.password === "admin123") {
        const user = {
          name: "Portfolio Admin",
          role: "Administrator",
          lastLogin: new Date().toISOString(),
        };
        
        localStorage.setItem("admin_token", "admin_token_" + Date.now());
        localStorage.setItem("admin_user", JSON.stringify(user));
        
        setAdminState(prev => ({
          ...prev,
          isAuthenticated: true,
          user,
        }));
        
        addNotification({
          type: "success",
          message: "Successfully logged in to Admin Panel",
        });
      } else {
        addNotification({
          type: "error",
          message: "Invalid credentials. Please try again.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setAdminState(prev => ({
      ...prev,
      isAuthenticated: false,
      user: null,
    }));
    addNotification({
      type: "info",
      message: "Successfully logged out",
    });
  };

  const addNotification = (notification: Omit<AdminState["notifications"][0], "id" | "timestamp">) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    
    setAdminState(prev => ({
      ...prev,
      notifications: [newNotification, ...prev.notifications.slice(0, 4)],
    }));

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setAdminState(prev => ({
        ...prev,
        notifications: prev.notifications.filter(n => n.id !== newNotification.id),
      }));
    }, 5000);
  };

  const togglePreviewMode = () => {
    setAdminState(prev => ({
      ...prev,
      isPreviewMode: !prev.isPreviewMode,
    }));
    addNotification({
      type: "info",
      message: `Preview mode ${adminState.isPreviewMode ? "disabled" : "enabled"}`,
    });
  };

  // Show login if not authenticated
  if (!adminState.isAuthenticated) {
    return (
      <AdminLogin
        onLogin={handleLogin}
        isLoading={isLoading}
        darkMode={adminState.isDarkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen ${adminState.isDarkMode ? "dark" : ""} bg-gray-950`}>
      {/* Notifications */}
      <AnimatePresence>
        {adminState.notifications.length > 0 && (
          <div className="fixed top-4 right-4 z-50 space-y-2">
            {adminState.notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className={`p-4 rounded-lg shadow-lg backdrop-blur-sm border ${
                  notification.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : notification.type === "error"
                    ? "bg-red-500/10 border-red-500/20 text-red-400"
                    : notification.type === "warning"
                    ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                    : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm font-medium">{notification.message}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Preview Mode Banner */}
      {adminState.isPreviewMode && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-40 bg-yellow-500/20 border-b border-yellow-500/30 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">Preview Mode Active</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePreviewMode}
              className="text-yellow-400 hover:bg-yellow-500/10"
            >
              Exit Preview
            </Button>
          </div>
        </motion.div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className={`fixed left-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 z-30 ${
                adminState.isPreviewMode ? "mt-12" : ""
              }`}
            >
              {/* Sidebar Header */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-white font-bold text-lg">Admin Panel</h1>
                    <p className="text-gray-400 text-sm">Portfolio Manager</p>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{adminState.user?.name}</p>
                    <p className="text-gray-400 text-xs">{adminState.user?.role}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4 space-y-2">
                {sidebarItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAdminState(prev => ({ ...prev, activeTab: item.id }))}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      adminState.activeTab === item.id
                        ? "bg-blue-500/20 border border-blue-500/30"
                        : "hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{item.label}</p>
                        <p className="text-gray-400 text-xs">{item.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </nav>

              {/* Preview Mode Toggle */}
              <div className="absolute bottom-4 left-4 right-4">
                <Button
                  onClick={togglePreviewMode}
                  variant={adminState.isPreviewMode ? "default" : "outline"}
                  className="w-full"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {adminState.isPreviewMode ? "Exit Preview" : "Preview Mode"}
                </Button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-80" : "ml-0"
        } ${adminState.isPreviewMode ? "pt-12" : ""}`}>
          {/* Top Bar */}
          <header className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="text-gray-400 hover:text-white"
                >
                  {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
                <div>
                  <h2 className="text-white font-semibold">
                    {sidebarItems.find(item => item.id === adminState.activeTab)?.label}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {sidebarItems.find(item => item.id === adminState.activeTab)?.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
                  Online
                </Badge>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Lock className="w-4 h-4" />
                  <span>Secure Session</span>
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={adminState.activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {adminState.activeTab === "content" && (
                  <ContentManager addNotification={addNotification} />
                )}
                {adminState.activeTab === "layout" && (
                  <LayoutManager addNotification={addNotification} />
                )}
                {adminState.activeTab === "seo" && (
                  <SEOManager addNotification={addNotification} />
                )}
                {adminState.activeTab === "analytics" && (
                  <AnalyticsDashboard addNotification={addNotification} />
                )}
                {adminState.activeTab === "integrations" && (
                  <IntegrationsManager addNotification={addNotification} />
                )}
                {adminState.activeTab === "security" && (
                  <SecuritySettings addNotification={addNotification} />
                )}
                {adminState.activeTab === "preview" && (
                  <PreviewMode 
                    addNotification={addNotification}
                    isPreviewMode={adminState.isPreviewMode}
                    togglePreviewMode={togglePreviewMode}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
