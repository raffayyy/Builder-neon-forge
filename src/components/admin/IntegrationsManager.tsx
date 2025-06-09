import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Database,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  Key,
  RefreshCcw,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  Download,
  Upload,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

interface Integration {
  id: string;
  name: string;
  type: "social" | "analytics" | "storage" | "api" | "automation";
  icon: any;
  status: "connected" | "disconnected" | "error";
  description: string;
  isEnabled: boolean;
  lastSync?: Date;
  config?: Record<string, any>;
  features: string[];
}

interface SyncJob {
  id: string;
  integration: string;
  type: "manual" | "automatic";
  status: "running" | "completed" | "failed";
  progress: number;
  startTime: Date;
  endTime?: Date;
  itemsProcessed: number;
  totalItems: number;
  errors?: string[];
}

const IntegrationsManager = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "github",
      name: "GitHub",
      type: "social",
      icon: Github,
      status: "connected",
      description: "Sync repositories and project data",
      isEnabled: true,
      lastSync: new Date(Date.now() - 3600000),
      config: {
        username: "johndoe",
        token: "ghp_****",
        repos: ["portfolio", "admin-panel", "react-components"],
      },
      features: ["Repository sync", "Project import", "Commit history", "README parsing"],
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      type: "social",
      icon: Linkedin,
      status: "connected",
      description: "Share projects and updates",
      isEnabled: true,
      lastSync: new Date(Date.now() - 7200000),
      config: {
        profile: "john-doe-dev",
      },
      features: ["Profile sync", "Auto-post projects", "Experience import"],
    },
    {
      id: "twitter",
      name: "Twitter",
      type: "social",
      icon: Twitter,
      status: "disconnected",
      description: "Share portfolio updates",
      isEnabled: false,
      features: ["Tweet projects", "Portfolio updates", "Engagement tracking"],
    },
    {
      id: "analytics",
      name: "Google Analytics",
      type: "analytics",
      icon: BarChart3,
      status: "connected",
      description: "Track website performance",
      isEnabled: true,
      lastSync: new Date(Date.now() - 900000),
      config: {
        propertyId: "GA4-XXXXXXX",
      },
      features: ["Real-time data", "Custom events", "Conversion tracking"],
    },
    {
      id: "cloudinary",
      name: "Cloudinary",
      type: "storage",
      icon: Upload,
      status: "error",
      description: "Image and video management",
      isEnabled: true,
      config: {
        cloudName: "portfolio-assets",
      },
      features: ["Auto-optimization", "Responsive images", "Video streaming"],
    },
  ]);

  const [syncJobs, setSyncJobs] = useState<SyncJob[]>([
    {
      id: "sync-1",
      integration: "github",
      type: "automatic",
      status: "completed",
      progress: 100,
      startTime: new Date(Date.now() - 3600000),
      endTime: new Date(Date.now() - 3590000),
      itemsProcessed: 15,
      totalItems: 15,
    },
    {
      id: "sync-2",
      integration: "linkedin",
      type: "manual",
      status: "running",
      progress: 67,
      startTime: new Date(Date.now() - 120000),
      itemsProcessed: 2,
      totalItems: 3,
    },
  ]);

  const [newIntegration, setNewIntegration] = useState({
    type: "",
    config: {},
  });

  const [showAddModal, setShowAddModal] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-600";
      case "error":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const handleSync = async (integrationId: string) => {
    const newJob: SyncJob = {
      id: `sync-${Date.now()}`,
      integration: integrationId,
      type: "manual",
      status: "running",
      progress: 0,
      startTime: new Date(),
      itemsProcessed: 0,
      totalItems: 10, // Mock total
    };

    setSyncJobs(prev => [newJob, ...prev]);

    // Simulate sync progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setSyncJobs(prev => 
        prev.map(job => 
          job.id === newJob.id 
            ? { ...job, progress: i, itemsProcessed: Math.floor((i / 100) * job.totalItems) }
            : job
        )
      );
    }

    // Complete the job
    setSyncJobs(prev => 
      prev.map(job => 
        job.id === newJob.id 
          ? { ...job, status: "completed", endTime: new Date() }
          : job
      )
    );

    // Update integration last sync
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, lastSync: new Date() }
          : integration
      )
    );
  };

  const toggleIntegration = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, isEnabled: !integration.isEnabled }
          : integration
      )
    );
  };

  const disconnectIntegration = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: "disconnected", isEnabled: false }
          : integration
      )
    );
  };

  const connectIntegration = (integrationId: string) => {
    // In real app, this would open OAuth flow or config modal
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: "connected", isEnabled: true, lastSync: new Date() }
          : integration
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Integrations</h2>
          <p className="text-gray-400">Manage external services and data synchronization</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      <Tabs defaultValue="connected" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:flex">
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="sync">Sync Jobs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Connected Integrations */}
        <TabsContent value="connected" className="space-y-4">
          {integrations
            .filter(integration => integration.status === "connected" || integration.status === "error")
            .map((integration) => {
              const IconComponent = integration.icon;
              return (
                <Card key={integration.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-800 rounded-lg">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{integration.name}</span>
                            {getStatusIcon(integration.status)}
                          </CardTitle>
                          <p className="text-sm text-gray-400">{integration.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={integration.isEnabled}
                          onCheckedChange={() => toggleIntegration(integration.id)}
                        />
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div>
                      <h4 className="font-medium mb-2">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {integration.features.map((feature, index) => (
                          <Badge key={index} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Last Sync */}
                    {integration.lastSync && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                          Last sync: {integration.lastSync.toLocaleString()}
                        </span>
                        <Button
                          onClick={() => handleSync(integration.id)}
                          variant="outline"
                          size="sm"
                          disabled={integration.status !== "connected"}
                        >
                          <RefreshCcw className="h-4 w-4 mr-2" />
                          Sync Now
                        </Button>
                      </div>
                    )}

                    {/* Configuration */}
                    {integration.config && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Configuration</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(integration.config).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                              <label className="text-xs text-gray-400 uppercase tracking-wide">
                                {key}
                              </label>
                              <Input
                                value={typeof value === "string" ? value : JSON.stringify(value)}
                                readOnly
                                className="text-sm"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Docs
                        </Button>
                      </div>
                      <Button
                        onClick={() => disconnectIntegration(integration.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-400 hover:text-red-300"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Disconnect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </TabsContent>

        {/* Available Integrations */}
        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter(integration => integration.status === "disconnected")
              .map((integration) => {
                const IconComponent = integration.icon;
                return (
                  <Card key={integration.id} className="hover:bg-gray-800/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-800 rounded-lg">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle>{integration.name}</CardTitle>
                          <p className="text-sm text-gray-400">{integration.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {integration.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {integration.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{integration.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <Button
                        onClick={() => connectIntegration(integration.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Connect {integration.name}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}

            {/* Add Custom Integration Card */}
            <Card className="border-dashed border-gray-600 hover:border-gray-500 transition-colors">
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                <div className="p-3 bg-gray-800 rounded-full">
                  <Plus className="h-6 w-6 text-gray-400" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium">Custom Integration</h3>
                  <p className="text-sm text-gray-400">Add your own API integration</p>
                </div>
                <Button variant="outline" onClick={() => setShowAddModal(true)}>
                  Create Integration
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sync Jobs */}
        <TabsContent value="sync" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Sync Jobs</h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>

          <div className="space-y-4">
            {syncJobs.map((job) => {
              const integration = integrations.find(i => i.id === job.integration);
              const IconComponent = integration?.icon || Database;
              
              return (
                <Card key={job.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-800 rounded-lg">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {integration?.name || "Unknown"} Sync
                          </div>
                          <div className="text-sm text-gray-400">
                            {job.type === "manual" ? "Manual" : "Automatic"} • 
                            Started {job.startTime.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          className={
                            job.status === "completed" ? "bg-green-600" :
                            job.status === "failed" ? "bg-red-600" :
                            "bg-blue-600"
                          }
                        >
                          {job.status}
                        </Badge>
                        {job.status === "running" && (
                          <RefreshCcw className="h-4 w-4 animate-spin text-blue-500" />
                        )}
                      </div>
                    </div>

                    {job.status === "running" && (
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{job.itemsProcessed}/{job.totalItems} items</span>
                        </div>
                        <Progress value={job.progress} className="h-2" />
                      </div>
                    )}

                    {job.status === "completed" && job.endTime && (
                      <div className="mt-2 text-sm text-gray-400">
                        Completed in {Math.floor((job.endTime.getTime() - job.startTime.getTime()) / 1000)}s
                      </div>
                    )}

                    {job.errors && job.errors.length > 0 && (
                      <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                        <div className="text-sm font-medium text-red-400">Errors:</div>
                        <ul className="text-sm text-red-300 mt-1 space-y-1">
                          {job.errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Auto-sync enabled</div>
                  <div className="text-sm text-gray-400">
                    Automatically sync data at regular intervals
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Sync frequency</div>
                  <div className="text-sm text-gray-400">How often to sync data</div>
                </div>
                <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
                  <option>Every hour</option>
                  <option>Every 6 hours</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Retry failed syncs</div>
                  <div className="text-sm text-gray-400">
                    Automatically retry failed synchronizations
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Keys & Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub Personal Access Token</label>
                <div className="flex space-x-2">
                  <Input type="password" value="ghp_****" readOnly />
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Google Analytics API Key</label>
                <div className="flex space-x-2">
                  <Input type="password" value="AIza****" readOnly />
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cloudinary API Secret</label>
                <div className="flex space-x-2">
                  <Input type="password" value="****" readOnly />
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export All Integration Data
              </Button>
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Import Integration Config
              </Button>
              <Button variant="outline" className="w-full text-red-400 hover:text-red-300">
                <Trash2 className="h-4 w-4 mr-2" />
                Reset All Integrations
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default IntegrationsManager;
