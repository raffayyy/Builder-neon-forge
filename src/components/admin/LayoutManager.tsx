import { useState, useEffect } from "react";
import { motion, Reorder } from "framer-motion";
import {
  Eye,
  EyeOff,
  GripVertical,
  Settings,
  Monitor,
  Smartphone,
  Tablet,
  Save,
  RotateCcw,
  Layout,
  Home,
  User,
  Briefcase,
  FileText,
  MessageSquare,
  BarChart3,
  Mail,
  Github,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

interface Section {
  id: string;
  name: string;
  icon: any;
  visible: boolean;
  order: number;
  description: string;
  isCore: boolean; // Core sections can't be hidden
}

interface LayoutSettings {
  sections: Section[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  layout: {
    containerWidth: number;
    sectionSpacing: number;
    borderRadius: number;
  };
  animations: {
    enabled: boolean;
    duration: number;
    stagger: number;
  };
}

interface LayoutManagerProps {
  addNotification: (notification: { type: "success" | "error" | "warning" | "info"; message: string }) => void;
}

const defaultSections: Section[] = [
  { id: "hero", name: "Hero Section", icon: Home, visible: true, order: 1, description: "Main landing section", isCore: true },
  { id: "about", name: "About Me", icon: User, visible: true, order: 2, description: "Personal introduction", isCore: false },
  { id: "experience", name: "Experience", icon: Briefcase, visible: true, order: 3, description: "Work experience timeline", isCore: false },
  { id: "projects", name: "Projects", icon: Layout, visible: true, order: 4, description: "Featured projects showcase", isCore: false },
  { id: "skills", name: "Skills & Tech Stack", icon: Settings, visible: true, order: 5, description: "Technical skills overview", isCore: false },
  { id: "blog", name: "Blog Posts", icon: FileText, visible: true, order: 6, description: "Recent articles and posts", isCore: false },
  { id: "testimonials", name: "Testimonials", icon: MessageSquare, visible: true, order: 7, description: "Client testimonials", isCore: false },
  { id: "github", name: "GitHub Activity", icon: Github, visible: true, order: 8, description: "GitHub contributions graph", isCore: false },
  { id: "achievements", name: "Achievements", icon: Award, visible: true, order: 9, description: "Awards and certifications", isCore: false },
  { id: "analytics", name: "Analytics", icon: BarChart3, visible: false, order: 10, description: "Portfolio analytics", isCore: false },
  { id: "contact", name: "Contact", icon: Mail, visible: true, order: 11, description: "Contact form and information", isCore: true },
];

export default function LayoutManager({ addNotification }: LayoutManagerProps) {
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
    sections: defaultSections,
    theme: {
      primaryColor: "#3b82f6",
      secondaryColor: "#8b5cf6",
      accentColor: "#10b981",
    },
    layout: {
      containerWidth: 1200,
      sectionSpacing: 80,
      borderRadius: 12,
    },
    animations: {
      enabled: true,
      duration: 0.6,
      stagger: 0.1,
    },
  });

  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load layout settings on component mount
  useEffect(() => {
    loadLayoutSettings();
  }, []);

  const loadLayoutSettings = async () => {
    try {
      const savedSettings = localStorage.getItem("layout_settings");
      if (savedSettings) {
        setLayoutSettings(JSON.parse(savedSettings));
      }
      addNotification({
        type: "success",
        message: "Layout settings loaded",
      });
    } catch (error) {
      addNotification({
        type: "error",
        message: "Failed to load layout settings",
      });
    }
  };

  const saveLayoutSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem("layout_settings", JSON.stringify(layoutSettings));
      setHasUnsavedChanges(false);
      
      addNotification({
        type: "success",
        message: "Layout settings saved successfully",
      });
    } catch (error) {
      addNotification({
        type: "error",
        message: "Failed to save layout settings",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetToDefaults = () => {
    setLayoutSettings({
      sections: defaultSections,
      theme: {
        primaryColor: "#3b82f6",
        secondaryColor: "#8b5cf6",
        accentColor: "#10b981",
      },
      layout: {
        containerWidth: 1200,
        sectionSpacing: 80,
        borderRadius: 12,
      },
      animations: {
        enabled: true,
        duration: 0.6,
        stagger: 0.1,
      },
    });
    setHasUnsavedChanges(true);
    addNotification({
      type: "info",
      message: "Settings reset to defaults",
    });
  };

  const toggleSectionVisibility = (sectionId: string) => {
    setLayoutSettings(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, visible: !section.visible } : section
      ),
    }));
    setHasUnsavedChanges(true);
  };

  const updateSectionOrder = (newOrder: Section[]) => {
    const reorderedSections = newOrder.map((section, index) => ({
      ...section,
      order: index + 1,
    }));
    
    setLayoutSettings(prev => ({
      ...prev,
      sections: reorderedSections,
    }));
    setHasUnsavedChanges(true);
  };

  const getDevicePreviewClass = () => {
    switch (previewDevice) {
      case "tablet":
        return "max-w-3xl";
      case "mobile":
        return "max-w-sm";
      default:
        return "max-w-6xl";
    }
  };

  const visibleSections = layoutSettings.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);

  const hiddenSections = layoutSettings.sections.filter(section => !section.visible);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Layout & Visibility</h1>
          <p className="text-gray-400">Customize section visibility and page layout</p>
        </div>
        <div className="flex items-center gap-3">
          {hasUnsavedChanges && (
            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
              Unsaved Changes
            </Badge>
          )}
          <Button
            onClick={resetToDefaults}
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={saveLayoutSettings}
            disabled={isLoading || !hasUnsavedChanges}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sections" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="sections">Section Management</TabsTrigger>
          <TabsTrigger value="layout">Layout Settings</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
        </TabsList>

        {/* Section Management */}
        <TabsContent value="sections" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visible Sections */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-emerald-400" />
                  Visible Sections ({visibleSections.length})
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Drag to reorder sections. Toggle visibility with the switch.
                </p>
              </CardHeader>
              <CardContent>
                <Reorder.Group
                  axis="y"
                  values={visibleSections}
                  onReorder={updateSectionOrder}
                  className="space-y-2"
                >
                  {visibleSections.map((section) => (
                    <Reorder.Item
                      key={section.id}
                      value={section}
                      className="bg-gray-900/50 border border-gray-600 rounded-lg p-4 cursor-move hover:border-gray-500 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <section.icon className="w-5 h-5 text-blue-400" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-white font-medium">{section.name}</h4>
                            {section.isCore && (
                              <Badge variant="outline" className="text-xs text-orange-400 border-orange-400">
                                Core
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">{section.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">#{section.order}</span>
                          <Switch
                            checked={section.visible}
                            onCheckedChange={() => toggleSectionVisibility(section.id)}
                            disabled={section.isCore}
                          />
                        </div>
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </CardContent>
            </Card>

            {/* Hidden Sections */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <EyeOff className="w-5 h-5 text-red-400" />
                  Hidden Sections ({hiddenSections.length})
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Click the switch to make sections visible on your portfolio.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {hiddenSections.map((section) => (
                    <div
                      key={section.id}
                      className="bg-gray-900/30 border border-gray-700 rounded-lg p-4 opacity-60"
                    >
                      <div className="flex items-center gap-3">
                        <section.icon className="w-5 h-5 text-gray-500" />
                        <div className="flex-1">
                          <h4 className="text-gray-300 font-medium">{section.name}</h4>
                          <p className="text-gray-500 text-sm">{section.description}</p>
                        </div>
                        <Switch
                          checked={section.visible}
                          onCheckedChange={() => toggleSectionVisibility(section.id)}
                        />
                      </div>
                    </div>
                  ))}
                  {hiddenSections.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <EyeOff className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>All sections are currently visible</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Layout Settings */}
        <TabsContent value="layout" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Theme Colors */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Theme Colors</CardTitle>
                <p className="text-gray-400 text-sm">Customize the color scheme</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Primary Color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={layoutSettings.theme.primaryColor}
                      onChange={(e) => {
                        setLayoutSettings(prev => ({
                          ...prev,
                          theme: { ...prev.theme, primaryColor: e.target.value }
                        }));
                        setHasUnsavedChanges(true);
                      }}
                      className="w-12 h-8 rounded border border-gray-600"
                    />
                    <span className="text-gray-300 font-mono text-sm">
                      {layoutSettings.theme.primaryColor}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Secondary Color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={layoutSettings.theme.secondaryColor}
                      onChange={(e) => {
                        setLayoutSettings(prev => ({
                          ...prev,
                          theme: { ...prev.theme, secondaryColor: e.target.value }
                        }));
                        setHasUnsavedChanges(true);
                      }}
                      className="w-12 h-8 rounded border border-gray-600"
                    />
                    <span className="text-gray-300 font-mono text-sm">
                      {layoutSettings.theme.secondaryColor}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Accent Color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={layoutSettings.theme.accentColor}
                      onChange={(e) => {
                        setLayoutSettings(prev => ({
                          ...prev,
                          theme: { ...prev.theme, accentColor: e.target.value }
                        }));
                        setHasUnsavedChanges(true);
                      }}
                      className="w-12 h-8 rounded border border-gray-600"
                    />
                    <span className="text-gray-300 font-mono text-sm">
                      {layoutSettings.theme.accentColor}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layout Properties */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Layout Properties</CardTitle>
                <p className="text-gray-400 text-sm">Adjust spacing and dimensions</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Container Width</Label>
                    <span className="text-gray-400 text-sm">{layoutSettings.layout.containerWidth}px</span>
                  </div>
                  <Slider
                    value={[layoutSettings.layout.containerWidth]}
                    onValueChange={([value]) => {
                      setLayoutSettings(prev => ({
                        ...prev,
                        layout: { ...prev.layout, containerWidth: value }
                      }));
                      setHasUnsavedChanges(true);
                    }}
                    min={800}
                    max={1600}
                    step={50}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Section Spacing</Label>
                    <span className="text-gray-400 text-sm">{layoutSettings.layout.sectionSpacing}px</span>
                  </div>
                  <Slider
                    value={[layoutSettings.layout.sectionSpacing]}
                    onValueChange={([value]) => {
                      setLayoutSettings(prev => ({
                        ...prev,
                        layout: { ...prev.layout, sectionSpacing: value }
                      }));
                      setHasUnsavedChanges(true);
                    }}
                    min={40}
                    max={120}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Border Radius</Label>
                    <span className="text-gray-400 text-sm">{layoutSettings.layout.borderRadius}px</span>
                  </div>
                  <Slider
                    value={[layoutSettings.layout.borderRadius]}
                    onValueChange={([value]) => {
                      setLayoutSettings(prev => ({
                        ...prev,
                        layout: { ...prev.layout, borderRadius: value }
                      }));
                      setHasUnsavedChanges(true);
                    }}
                    min={0}
                    max={24}
                    step={2}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Animation Settings */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Animation Settings</CardTitle>
                <p className="text-gray-400 text-sm">Configure page animations</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Enable Animations</Label>
                  <Switch
                    checked={layoutSettings.animations.enabled}
                    onCheckedChange={(checked) => {
                      setLayoutSettings(prev => ({
                        ...prev,
                        animations: { ...prev.animations, enabled: checked }
                      }));
                      setHasUnsavedChanges(true);
                    }}
                  />
                </div>

                {layoutSettings.animations.enabled && (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-white">Animation Duration</Label>
                        <span className="text-gray-400 text-sm">{layoutSettings.animations.duration}s</span>
                      </div>
                      <Slider
                        value={[layoutSettings.animations.duration]}
                        onValueChange={([value]) => {
                          setLayoutSettings(prev => ({
                            ...prev,
                            animations: { ...prev.animations, duration: value }
                          }));
                          setHasUnsavedChanges(true);
                        }}
                        min={0.2}
                        max={2.0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-white">Stagger Delay</Label>
                        <span className="text-gray-400 text-sm">{layoutSettings.animations.stagger}s</span>
                      </div>
                      <Slider
                        value={[layoutSettings.animations.stagger]}
                        onValueChange={([value]) => {
                          setLayoutSettings(prev => ({
                            ...prev,
                            animations: { ...prev.animations, stagger: value }
                          }));
                          setHasUnsavedChanges(true);
                        }}
                        min={0.05}
                        max={0.3}
                        step={0.05}
                        className="w-full"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Live Preview */}
        <TabsContent value="preview" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Live Preview</h2>
            <div className="flex items-center gap-2">
              <Button
                variant={previewDevice === "desktop" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewDevice("desktop")}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={previewDevice === "tablet" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewDevice("tablet")}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={previewDevice === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewDevice("mobile")}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className={`mx-auto transition-all duration-300 ${getDevicePreviewClass()}`}>
                <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center text-gray-400 text-sm">
                      Portfolio Preview - {previewDevice}
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                    {visibleSections.map((section, index) => (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: index * layoutSettings.animations.stagger,
                          duration: layoutSettings.animations.duration 
                        }}
                        className="bg-gray-700/30 rounded-lg p-4 border border-gray-600"
                        style={{ 
                          borderRadius: `${layoutSettings.layout.borderRadius}px`,
                          marginBottom: `${layoutSettings.layout.sectionSpacing / 4}px`
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <section.icon 
                            className="w-5 h-5" 
                            style={{ color: layoutSettings.theme.primaryColor }}
                          />
                          <div>
                            <h3 className="text-white font-medium">{section.name}</h3>
                            <p className="text-gray-400 text-sm">{section.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center text-gray-500 text-sm">
                This preview shows the section order and visibility. Actual content and styling may differ.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
