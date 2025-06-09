import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Globe,
  Image as ImageIcon,
  FileText,
  Link,
  BarChart3,
  Save,
  Eye,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Copy,
  RefreshCw,
  TrendingUp,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SEOData {
  page: string;
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  canonicalUrl: string;
  robotsMeta: string;
  structuredData: any;
}

interface SEOManagerProps {
  addNotification: (notification: { type: "success" | "error" | "warning" | "info"; message: string }) => void;
}

const defaultPages = [
  { id: "home", name: "Home", path: "/" },
  { id: "about", name: "About", path: "/about" },
  { id: "projects", name: "Projects", path: "/projects" },
  { id: "blog", name: "Blog", path: "/blog" },
  { id: "contact", name: "Contact", path: "/contact" },
  { id: "resume", name: "Resume", path: "/resume" },
];

const defaultSEOData: Record<string, SEOData> = {
  home: {
    page: "home",
    title: "Your Name - Full Stack Developer & AI Engineer",
    description: "Experienced full-stack developer and AI engineer specializing in modern web technologies, machine learning, and scalable applications.",
    keywords: ["full stack developer", "AI engineer", "React", "Node.js", "machine learning", "web development"],
    ogTitle: "Your Name - Full Stack Developer & AI Engineer",
    ogDescription: "Experienced full-stack developer and AI engineer specializing in modern web technologies, machine learning, and scalable applications.",
    ogImage: "/og-image-home.jpg",
    twitterTitle: "Your Name - Full Stack Developer & AI Engineer",
    twitterDescription: "Experienced full-stack developer and AI engineer specializing in modern web technologies.",
    twitterImage: "/twitter-image-home.jpg",
    canonicalUrl: "https://yourportfolio.com/",
    robotsMeta: "index,follow",
    structuredData: {
      "@type": "Person",
      "name": "Your Name",
      "jobTitle": "Full Stack Developer",
      "url": "https://yourportfolio.com"
    }
  },
  // ... other pages
};

export default function SEOManager({ addNotification }: SEOManagerProps) {
  const [selectedPage, setSelectedPage] = useState("home");
  const [seoData, setSeoData] = useState<Record<string, SEOData>>(defaultSEOData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [seoScore, setSeoScore] = useState(0);
  const [seoIssues, setSeoIssues] = useState<Array<{ type: "error" | "warning" | "info"; message: string }>>([]);

  useEffect(() => {
    calculateSEOScore();
  }, [seoData, selectedPage]);

  const calculateSEOScore = () => {
    const currentData = seoData[selectedPage];
    if (!currentData) return;

    let score = 0;
    const issues: Array<{ type: "error" | "warning" | "info"; message: string }> = [];

    // Title checks
    if (currentData.title) {
      score += 15;
      if (currentData.title.length >= 30 && currentData.title.length <= 60) {
        score += 10;
      } else {
        issues.push({
          type: "warning",
          message: `Title should be 30-60 characters (current: ${currentData.title.length})`
        });
      }
    } else {
      issues.push({ type: "error", message: "Missing page title" });
    }

    // Description checks
    if (currentData.description) {
      score += 15;
      if (currentData.description.length >= 120 && currentData.description.length <= 160) {
        score += 10;
      } else {
        issues.push({
          type: "warning",
          message: `Description should be 120-160 characters (current: ${currentData.description.length})`
        });
      }
    } else {
      issues.push({ type: "error", message: "Missing meta description" });
    }

    // Keywords checks
    if (currentData.keywords.length > 0) {
      score += 10;
      if (currentData.keywords.length >= 3 && currentData.keywords.length <= 10) {
        score += 5;
      } else {
        issues.push({
          type: "warning",
          message: `Recommended 3-10 keywords (current: ${currentData.keywords.length})`
        });
      }
    } else {
      issues.push({ type: "warning", message: "No keywords defined" });
    }

    // Open Graph checks
    if (currentData.ogTitle && currentData.ogDescription) {
      score += 15;
    } else {
      issues.push({ type: "warning", message: "Missing Open Graph data" });
    }

    if (currentData.ogImage) {
      score += 10;
    } else {
      issues.push({ type: "warning", message: "Missing Open Graph image" });
    }

    // Twitter Card checks
    if (currentData.twitterTitle && currentData.twitterDescription) {
      score += 10;
    } else {
      issues.push({ type: "info", message: "Consider adding Twitter Card data" });
    }

    // Technical checks
    if (currentData.canonicalUrl) {
      score += 10;
    } else {
      issues.push({ type: "warning", message: "Missing canonical URL" });
    }

    if (currentData.structuredData && Object.keys(currentData.structuredData).length > 0) {
      score += 15;
    } else {
      issues.push({ type: "info", message: "Consider adding structured data" });
    }

    setSeoScore(Math.min(score, 100));
    setSeoIssues(issues);
  };

  const updateSEOData = (field: string, value: any) => {
    setSeoData(prev => ({
      ...prev,
      [selectedPage]: {
        ...prev[selectedPage],
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const saveSEOData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem("seo_data", JSON.stringify(seoData));
      setHasUnsavedChanges(false);
      
      addNotification({
        type: "success",
        message: "SEO settings saved successfully",
      });
    } catch (error) {
      addNotification({
        type: "error",
        message: "Failed to save SEO settings",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateSEOSuggestions = async () => {
    setIsLoading(true);
    try {
      // Simulate AI-powered SEO suggestions
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const suggestions = {
        title: "Consider including your location and main technology stack in the title",
        description: "Add specific technologies and years of experience to make it more compelling",
        keywords: ["portfolio", "developer", "your-city", "remote", "freelance"]
      };
      
      addNotification({
        type: "info",
        message: "SEO suggestions generated. Check the recommendations tab.",
      });
    } catch (error) {
      addNotification({
        type: "error",
        message: "Failed to generate SEO suggestions",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentData = seoData[selectedPage] || defaultSEOData.home;

  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getSEOScoreStatus = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Improvement";
    return "Poor";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">SEO & Meta Tags</h1>
          <p className="text-gray-400">Optimize your portfolio for search engines and social media</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={generateSEOSuggestions}
            variant="outline"
            disabled={isLoading}
            className="border-gray-600 text-gray-300"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Get AI Suggestions
          </Button>
          <Button
            onClick={saveSEOData}
            disabled={isLoading || !hasUnsavedChanges}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Page Selector */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Label className="text-white">Select Page:</Label>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {defaultPages.map((page) => (
                  <SelectItem key={page.id} value={page.id}>
                    {page.name} ({page.path})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* SEO Score */}
            <div className="flex items-center gap-3 ml-auto">
              <div className="text-right">
                <div className={`text-lg font-bold ${getSEOScoreColor(seoScore)}`}>
                  {seoScore}/100
                </div>
                <div className="text-xs text-gray-400">
                  {getSEOScoreStatus(seoScore)}
                </div>
              </div>
              <div className="w-16">
                <Progress value={seoScore} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="basic">Basic SEO</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        {/* Basic SEO */}
        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-400" />
                  Page Title & Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Page Title *</Label>
                  <Input
                    value={currentData.title}
                    onChange={(e) => updateSEOData("title", e.target.value)}
                    placeholder="Enter page title (30-60 characters)"
                    className="bg-gray-700 border-gray-600 text-white"
                    maxLength={70}
                  />
                  <div className="flex justify-between text-xs">
                    <span className={currentData.title.length < 30 || currentData.title.length > 60 ? "text-yellow-400" : "text-green-400"}>
                      {currentData.title.length}/60 characters
                    </span>
                    <span className="text-gray-400">Optimal: 30-60</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Meta Description *</Label>
                  <Textarea
                    value={currentData.description}
                    onChange={(e) => updateSEOData("description", e.target.value)}
                    placeholder="Enter meta description (120-160 characters)"
                    className="bg-gray-700 border-gray-600 text-white"
                    rows={3}
                    maxLength={180}
                  />
                  <div className="flex justify-between text-xs">
                    <span className={currentData.description.length < 120 || currentData.description.length > 160 ? "text-yellow-400" : "text-green-400"}>
                      {currentData.description.length}/160 characters
                    </span>
                    <span className="text-gray-400">Optimal: 120-160</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Keywords</Label>
                  <Input
                    value={currentData.keywords.join(", ")}
                    onChange={(e) => updateSEOData("keywords", e.target.value.split(",").map(k => k.trim()).filter(Boolean))}
                    placeholder="keyword1, keyword2, keyword3"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">
                      {currentData.keywords.length} keywords
                    </span>
                    <span className="text-gray-400">Recommended: 3-10</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Preview */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-emerald-400" />
                  Search Result Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Google Preview */}
                  <div className="border border-gray-600 rounded-lg p-4 bg-white">
                    <div className="text-xs text-gray-600 mb-1">
                      https://yourportfolio.com{defaultPages.find(p => p.id === selectedPage)?.path}
                    </div>
                    <div className="text-blue-600 text-lg hover:underline cursor-pointer line-clamp-1">
                      {currentData.title || "Your Page Title"}
                    </div>
                    <div className="text-gray-700 text-sm mt-1 line-clamp-2">
                      {currentData.description || "Your meta description will appear here..."}
                    </div>
                  </div>

                  {/* Mobile Preview */}
                  <div className="border border-gray-600 rounded-lg p-3 bg-gray-900 text-white text-sm">
                    <div className="text-xs text-gray-400 mb-1">Mobile Result</div>
                    <div className="text-blue-400 font-medium line-clamp-2 text-sm">
                      {currentData.title || "Your Page Title"}
                    </div>
                    <div className="text-gray-300 text-xs mt-1 line-clamp-3">
                      {currentData.description || "Your meta description..."}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Social Media */}
        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Open Graph */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  Open Graph (Facebook, LinkedIn)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">OG Title</Label>
                  <Input
                    value={currentData.ogTitle}
                    onChange={(e) => updateSEOData("ogTitle", e.target.value)}
                    placeholder="Open Graph title"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">OG Description</Label>
                  <Textarea
                    value={currentData.ogDescription}
                    onChange={(e) => updateSEOData("ogDescription", e.target.value)}
                    placeholder="Open Graph description"
                    className="bg-gray-700 border-gray-600 text-white"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">OG Image URL</Label>
                  <Input
                    value={currentData.ogImage}
                    onChange={(e) => updateSEOData("ogImage", e.target.value)}
                    placeholder="https://yoursite.com/og-image.jpg"
                    className="bg-gray-700 border-gray-600 text-white"
                    type="url"
                  />
                  <div className="text-xs text-gray-400">
                    Recommended size: 1200x630px
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Twitter Cards */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  Twitter Cards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Twitter Title</Label>
                  <Input
                    value={currentData.twitterTitle}
                    onChange={(e) => updateSEOData("twitterTitle", e.target.value)}
                    placeholder="Twitter card title"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Twitter Description</Label>
                  <Textarea
                    value={currentData.twitterDescription}
                    onChange={(e) => updateSEOData("twitterDescription", e.target.value)}
                    placeholder="Twitter card description"
                    className="bg-gray-700 border-gray-600 text-white"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Twitter Image URL</Label>
                  <Input
                    value={currentData.twitterImage}
                    onChange={(e) => updateSEOData("twitterImage", e.target.value)}
                    placeholder="https://yoursite.com/twitter-image.jpg"
                    className="bg-gray-700 border-gray-600 text-white"
                    type="url"
                  />
                  <div className="text-xs text-gray-400">
                    Recommended size: 1200x600px
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Preview */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Social Media Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Facebook/LinkedIn Preview */}
                <div className="space-y-2">
                  <h4 className="text-white font-medium">Facebook/LinkedIn</h4>
                  <div className="border border-gray-600 rounded-lg overflow-hidden bg-white">
                    <div className="h-32 bg-gray-200 flex items-center justify-center">
                      {currentData.ogImage ? (
                        <img src={currentData.ogImage} alt="OG Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">
                        {currentData.ogTitle || currentData.title || "Your Page Title"}
                      </div>
                      <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {currentData.ogDescription || currentData.description || "Description..."}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        yourportfolio.com
                      </div>
                    </div>
                  </div>
                </div>

                {/* Twitter Preview */}
                <div className="space-y-2">
                  <h4 className="text-white font-medium">Twitter</h4>
                  <div className="border border-gray-600 rounded-xl overflow-hidden bg-white">
                    <div className="h-28 bg-gray-200 flex items-center justify-center">
                      {currentData.twitterImage ? (
                        <img src={currentData.twitterImage} alt="Twitter Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">
                        {currentData.twitterTitle || currentData.title || "Your Page Title"}
                      </div>
                      <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {currentData.twitterDescription || currentData.description || "Description..."}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        yourportfolio.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technical SEO */}
        <TabsContent value="technical" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Link className="w-5 h-5 text-purple-400" />
                  Technical Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Canonical URL</Label>
                  <Input
                    value={currentData.canonicalUrl}
                    onChange={(e) => updateSEOData("canonicalUrl", e.target.value)}
                    placeholder="https://yourportfolio.com/page"
                    className="bg-gray-700 border-gray-600 text-white"
                    type="url"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Robots Meta</Label>
                  <Select 
                    value={currentData.robotsMeta} 
                    onValueChange={(value) => updateSEOData("robotsMeta", value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="index,follow">index,follow</SelectItem>
                      <SelectItem value="noindex,follow">noindex,follow</SelectItem>
                      <SelectItem value="index,nofollow">index,nofollow</SelectItem>
                      <SelectItem value="noindex,nofollow">noindex,nofollow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  Structured Data (JSON-LD)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label className="text-white">Schema.org Markup</Label>
                  <Textarea
                    value={JSON.stringify(currentData.structuredData, null, 2)}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        updateSEOData("structuredData", parsed);
                      } catch {
                        // Invalid JSON, don't update
                      }
                    }}
                    placeholder='{"@type": "Person", "name": "Your Name"}'
                    className="bg-gray-700 border-gray-600 text-white font-mono text-sm"
                    rows={6}
                  />
                  <div className="text-xs text-gray-400">
                    Valid JSON-LD structured data for rich snippets
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analysis */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SEO Score Breakdown */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  SEO Score Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <div className={`text-4xl font-bold ${getSEOScoreColor(seoScore)}`}>
                    {seoScore}/100
                  </div>
                  <div className="text-gray-400">
                    {getSEOScoreStatus(seoScore)}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">Title Optimization</span>
                    <div className="flex items-center gap-2">
                      <Progress value={currentData.title ? 80 : 0} className="w-16 h-2" />
                      <span className="text-xs text-gray-400">
                        {currentData.title ? "80%" : "0%"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">Meta Description</span>
                    <div className="flex items-center gap-2">
                      <Progress value={currentData.description ? 75 : 0} className="w-16 h-2" />
                      <span className="text-xs text-gray-400">
                        {currentData.description ? "75%" : "0%"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">Keywords</span>
                    <div className="flex items-center gap-2">
                      <Progress value={currentData.keywords.length > 0 ? 60 : 0} className="w-16 h-2" />
                      <span className="text-xs text-gray-400">
                        {currentData.keywords.length > 0 ? "60%" : "0%"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">Social Media</span>
                    <div className="flex items-center gap-2">
                      <Progress value={currentData.ogTitle && currentData.ogDescription ? 90 : 0} className="w-16 h-2" />
                      <span className="text-xs text-gray-400">
                        {currentData.ogTitle && currentData.ogDescription ? "90%" : "0%"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">Technical SEO</span>
                    <div className="flex items-center gap-2">
                      <Progress value={currentData.canonicalUrl ? 70 : 0} className="w-16 h-2" />
                      <span className="text-xs text-gray-400">
                        {currentData.canonicalUrl ? "70%" : "0%"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Issues & Recommendations */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-yellow-400" />
                  Issues & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {seoIssues.length === 0 ? (
                    <div className="text-center py-4">
                      <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <p className="text-green-400 font-medium">Perfect SEO Setup!</p>
                      <p className="text-gray-400 text-sm">No issues found</p>
                    </div>
                  ) : (
                    seoIssues.map((issue, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-3 rounded-lg border ${
                          issue.type === "error"
                            ? "border-red-500/30 bg-red-500/10"
                            : issue.type === "warning"
                            ? "border-yellow-500/30 bg-yellow-500/10"
                            : "border-blue-500/30 bg-blue-500/10"
                        }`}
                      >
                        <AlertCircle className={`w-4 h-4 mt-0.5 ${
                          issue.type === "error"
                            ? "text-red-400"
                            : issue.type === "warning"
                            ? "text-yellow-400"
                            : "text-blue-400"
                        }`} />
                        <div>
                          <p className={`text-sm font-medium ${
                            issue.type === "error"
                              ? "text-red-300"
                              : issue.type === "warning"
                              ? "text-yellow-300"
                              : "text-blue-300"
                          }`}>
                            {issue.type.charAt(0).toUpperCase() + issue.type.slice(1)}
                          </p>
                          <p className="text-gray-300 text-sm">{issue.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
