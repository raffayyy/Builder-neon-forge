import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Monitor,
  Smartphone,
  Tablet,
  RotateCcw,
  Settings,
  Save,
  X,
  ExternalLink,
  RefreshCcw,
  Share,
  Download,
  Code,
  Layers,
  Grid,
  Type,
  Palette,
  MousePointer,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface PreviewSettings {
  device: "desktop" | "tablet" | "mobile";
  zoom: number;
  showGrid: boolean;
  showSpacing: boolean;
  showBreakpoints: boolean;
  showComponents: boolean;
  interactiveMode: boolean;
  darkMode: boolean;
  reducedMotion: boolean;
}

interface Change {
  id: string;
  type: "layout" | "content" | "style" | "component";
  description: string;
  timestamp: Date;
  isLive: boolean;
  component?: string;
  before?: any;
  after?: any;
}

const PreviewMode = () => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewSettings, setPreviewSettings] = useState<PreviewSettings>({
    device: "desktop",
    zoom: 100,
    showGrid: false,
    showSpacing: false,
    showBreakpoints: false,
    showComponents: false,
    interactiveMode: true,
    darkMode: true,
    reducedMotion: false,
  });

  const [changes, setChanges] = useState<Change[]>([
    {
      id: "1",
      type: "layout",
      description: "Reordered hero and about sections",
      timestamp: new Date(Date.now() - 3600000),
      isLive: false,
      component: "Hero Section",
    },
    {
      id: "2",
      type: "content",
      description: "Updated project descriptions",
      timestamp: new Date(Date.now() - 7200000),
      isLive: true,
      component: "Projects",
    },
    {
      id: "3",
      type: "style",
      description: "Changed primary color to blue",
      timestamp: new Date(Date.now() - 10800000),
      isLive: false,
      component: "Theme",
    },
  ]);

  const [pendingChanges, setPendingChanges] = useState(2);

  const devicePresets = {
    desktop: { width: 1920, height: 1080 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 375, height: 812 },
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "tablet":
        return Tablet;
      case "mobile":
        return Smartphone;
      default:
        return Monitor;
    }
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "layout":
        return Layers;
      case "content":
        return Type;
      case "style":
        return Palette;
      case "component":
        return Grid;
      default:
        return Settings;
    }
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const publishChanges = () => {
    setChanges(prev => 
      prev.map(change => ({ ...change, isLive: true }))
    );
    setPendingChanges(0);
  };

  const discardChanges = () => {
    setChanges(prev => 
      prev.filter(change => change.isLive)
    );
    setPendingChanges(0);
  };

  const revertChange = (changeId: string) => {
    setChanges(prev => 
      prev.filter(change => change.id !== changeId)
    );
    setPendingChanges(prev => Math.max(0, prev - 1));
  };

  const sharePreview = () => {
    // In real app, this would generate a shareable preview link
    const previewUrl = `${window.location.origin}/preview?token=abc123`;
    navigator.clipboard.writeText(previewUrl);
    // Show toast notification
  };

  const exportChanges = () => {
    // In real app, this would export the changes as JSON/config
    const changesData = {
      changes: changes.filter(change => !change.isLive),
      settings: previewSettings,
      timestamp: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(changesData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `preview-changes-${Date.now()}.json`;
    link.click();
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
          <h2 className="text-2xl font-bold">Preview Mode</h2>
          <p className="text-gray-400">Test layout changes before going live</p>
        </div>
        <div className="flex items-center space-x-2">
          {pendingChanges > 0 && (
            <Badge variant="outline" className="bg-yellow-600">
              {pendingChanges} pending changes
            </Badge>
          )}
          <Button
            onClick={togglePreviewMode}
            className={
              isPreviewMode 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-blue-600 hover:bg-blue-700"
            }
          >
            {isPreviewMode ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Exit Preview
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Enter Preview
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Preview Banner */}
      <AnimatePresence>
        {isPreviewMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-blue-600 text-white p-4 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <Eye className="h-5 w-5" />
              <div>
                <div className="font-medium">Preview Mode Active</div>
                <div className="text-sm text-blue-100">
                  You're viewing unpublished changes. Visitors see the live version.
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-blue-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Live Site
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-white hover:bg-blue-700"
                onClick={sharePreview}
              >
                <Share className="h-4 w-4 mr-2" />
                Share Preview
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Device & Display Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Device Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Device Selection */}
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(devicePresets).map((device) => {
                  const IconComponent = getDeviceIcon(device);
                  return (
                    <Button
                      key={device}
                      variant={previewSettings.device === device ? "default" : "outline"}
                      className="flex flex-col items-center p-3 h-auto"
                      onClick={() => setPreviewSettings(prev => ({ ...prev, device: device as any }))}
                    >
                      <IconComponent className="h-4 w-4 mb-1" />
                      <span className="text-xs capitalize">{device}</span>
                    </Button>
                  );
                })}
              </div>

              {/* Zoom Control */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Zoom</label>
                  <span className="text-sm text-gray-400">{previewSettings.zoom}%</span>
                </div>
                <Slider
                  value={[previewSettings.zoom]}
                  onValueChange={(value) => setPreviewSettings(prev => ({ ...prev, zoom: value[0] }))}
                  max={200}
                  min={25}
                  step={25}
                  className="w-full"
                />
              </div>

              {/* Display Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show grid</span>
                  <Switch
                    checked={previewSettings.showGrid}
                    onCheckedChange={(checked) => setPreviewSettings(prev => ({ ...prev, showGrid: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show spacing</span>
                  <Switch
                    checked={previewSettings.showSpacing}
                    onCheckedChange={(checked) => setPreviewSettings(prev => ({ ...prev, showSpacing: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show breakpoints</span>
                  <Switch
                    checked={previewSettings.showBreakpoints}
                    onCheckedChange={(checked) => setPreviewSettings(prev => ({ ...prev, showBreakpoints: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Highlight components</span>
                  <Switch
                    checked={previewSettings.showComponents}
                    onCheckedChange={(checked) => setPreviewSettings(prev => ({ ...prev, showComponents: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interaction Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Interaction Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Interactive mode</span>
                <Switch
                  checked={previewSettings.interactiveMode}
                  onCheckedChange={(checked) => setPreviewSettings(prev => ({ ...prev, interactiveMode: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dark mode</span>
                <Switch
                  checked={previewSettings.darkMode}
                  onCheckedChange={(checked) => setPreviewSettings(prev => ({ ...prev, darkMode: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Reduced motion</span>
                <Switch
                  checked={previewSettings.reducedMotion}
                  onCheckedChange={(checked) => setPreviewSettings(prev => ({ ...prev, reducedMotion: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={publishChanges}>
                <Save className="h-4 w-4 mr-2" />
                Publish Changes
              </Button>
              <Button variant="outline" className="w-full" onClick={discardChanges}>
                <X className="h-4 w-4 mr-2" />
                Discard Changes
              </Button>
              <Button variant="outline" className="w-full" onClick={exportChanges}>
                <Download className="h-4 w-4 mr-2" />
                Export Changes
              </Button>
              <Button variant="outline" className="w-full">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Reset Preview
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Frame & Changes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preview Frame */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Preview Frame</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    {devicePresets[previewSettings.device].width} × {devicePresets[previewSettings.device].height}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Code className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mock Browser Frame */}
              <div className="bg-gray-800 p-2">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-gray-700 rounded px-3 py-1 text-sm text-gray-300">
                    https://yourportfolio.com
                  </div>
                  <Button variant="ghost" size="sm">
                    <RefreshCcw className="h-3 w-3" />
                  </Button>
                </div>
                
                {/* Preview Content */}
                <div 
                  className="bg-gray-900 rounded overflow-hidden relative"
                  style={{
                    width: devicePresets[previewSettings.device].width * (previewSettings.zoom / 100),
                    height: devicePresets[previewSettings.device].height * (previewSettings.zoom / 100),
                    maxWidth: "100%",
                    maxHeight: "60vh",
                  }}
                >
                  {/* Grid Overlay */}
                  {previewSettings.showGrid && (
                    <div 
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px",
                      }}
                    />
                  )}

                  {/* Mock Website Content */}
                  <div className="p-6 text-white">
                    <div className="text-2xl font-bold mb-4">Your Portfolio</div>
                    <div className="space-y-4">
                      <div className={`p-4 bg-gray-800 rounded ${previewSettings.showComponents ? 'ring-2 ring-blue-500' : ''}`}>
                        <div className="text-lg font-semibold">Hero Section</div>
                        <div className="text-sm text-gray-400">Introduction and main CTA</div>
                      </div>
                      <div className={`p-4 bg-gray-800 rounded ${previewSettings.showComponents ? 'ring-2 ring-green-500' : ''}`}>
                        <div className="text-lg font-semibold">About Section</div>
                        <div className="text-sm text-gray-400">Personal information and skills</div>
                      </div>
                      <div className={`p-4 bg-gray-800 rounded ${previewSettings.showComponents ? 'ring-2 ring-purple-500' : ''}`}>
                        <div className="text-lg font-semibold">Projects Section</div>
                        <div className="text-sm text-gray-400">Portfolio projects showcase</div>
                      </div>
                    </div>
                  </div>

                  {/* Spacing Indicators */}
                  {previewSettings.showSpacing && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-6 left-6 w-4 h-4 border-l-2 border-t-2 border-yellow-400"></div>
                      <div className="absolute top-6 right-6 w-4 h-4 border-r-2 border-t-2 border-yellow-400"></div>
                      <div className="absolute bottom-6 left-6 w-4 h-4 border-l-2 border-b-2 border-yellow-400"></div>
                      <div className="absolute bottom-6 right-6 w-4 h-4 border-r-2 border-b-2 border-yellow-400"></div>
                    </div>
                  )}

                  {/* Breakpoint Indicators */}
                  {previewSettings.showBreakpoints && (
                    <div className="absolute top-2 left-2 right-2 flex justify-between text-xs text-blue-400">
                      <span>sm: 640px</span>
                      <span>md: 768px</span>
                      <span>lg: 1024px</span>
                      <span>xl: 1280px</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Changes List */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {changes.filter(change => !change.isLive).map((change) => {
                  const IconComponent = getChangeIcon(change.type);
                  return (
                    <div key={change.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-700 rounded">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{change.description}</div>
                          <div className="text-sm text-gray-400">
                            {change.component} • {change.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="capitalize">
                          {change.type}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => revertChange(change.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}

                {changes.filter(change => !change.isLive).length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <div>No pending changes</div>
                    <div className="text-sm">All changes are live</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default PreviewMode;
