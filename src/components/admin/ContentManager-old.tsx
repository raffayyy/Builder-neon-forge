import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Github,
  ExternalLink,
  Upload,
  Save,
  X,
  FileText,
  MessageSquare,
  Briefcase,
  Eye,
  Calendar,
  Tag,
  Users,
  Image as ImageIcon,
  RefreshCw,
  Globe,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AdminDataService, Project, BlogPost, Testimonial } from "@/lib/admin-service";
import BlogForm from "./BlogForm";
import TestimonialForm from "./TestimonialForm";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  status: "completed" | "in-progress" | "planned";
  featured: boolean;
  collaborators: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  status: "published" | "draft" | "scheduled";
  source: "manual" | "dev.to" | "medium";
  externalId?: string;
  featured: boolean;
  readTime: number;
  views: number;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl: string;
  linkedinUrl?: string;
  featured: boolean;
  createdAt: Date;
}

interface ContentManagerProps {
  addNotification: (notification: { type: "success" | "error" | "warning" | "info"; message: string }) => void;
}

export default function ContentManager({ addNotification }: ContentManagerProps) {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load data on component mount
  useEffect(() => {
    loadContentData();
  }, []);

  const loadContentData = async () => {
    setIsLoading(true);
    try {
      // Simulate loading data from API
      const mockProjects: Project[] = [
        {
          id: "1",
          title: "AI Portfolio Assistant",
          description: "An intelligent portfolio website with AI-powered features",
          longDescription: "A comprehensive portfolio website built with React, TypeScript, and AI integration...",
          technologies: ["React", "TypeScript", "Node.js", "OpenAI", "Tailwind"],
          githubUrl: "https://github.com/user/ai-portfolio",
          liveUrl: "https://ai-portfolio.com",
          imageUrl: "/project1.jpg",
          status: "completed",
          featured: true,
          collaborators: ["John Doe", "Jane Smith"],
          category: "Web Development",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more mock data...
      ];

      const mockBlogPosts: BlogPost[] = [
        {
          id: "1",
          title: "Building Modern Web Applications",
          excerpt: "Learn how to build scalable and modern web applications...",
          content: "Full article content here...",
          tags: ["React", "JavaScript", "Web Development"],
          publishedAt: new Date(),
          updatedAt: new Date(),
          status: "published",
          source: "manual",
          featured: true,
          readTime: 5,
          views: 1250,
        },
        // Add more mock data...
      ];

      const mockTestimonials: Testimonial[] = [
        {
          id: "1",
          name: "Sarah Johnson",
          role: "Senior Developer",
          company: "Tech Corp",
          content: "Outstanding work on our project. Highly recommend!",
          rating: 5,
          avatarUrl: "/avatar1.jpg",
          linkedinUrl: "https://linkedin.com/in/sarah-johnson",
          featured: true,
          createdAt: new Date(),
        },
        // Add more mock data...
      ];

      setProjects(mockProjects);
      setBlogPosts(mockBlogPosts);
      setTestimonials(mockTestimonials);
      
      addNotification({
        type: "success",
        message: "Content data loaded successfully",
      });
    } catch (error) {
      addNotification({
        type: "error",
        message: "Failed to load content data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProject = (projectData: Partial<Project>) => {
    if (editingItem?.id) {
      // Update existing project
      setProjects(prev => prev.map(p => 
        p.id === editingItem.id ? { ...p, ...projectData, updatedAt: new Date() } : p
      ));
      addNotification({
        type: "success",
        message: "Project updated successfully",
      });
    } else {
      // Create new project
      const newProject: Project = {
        id: Date.now().toString(),
        ...projectData as Project,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setProjects(prev => [...prev, newProject]);
      addNotification({
        type: "success",
        message: "Project created successfully",
      });
    }
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    addNotification({
      type: "info",
      message: "Project deleted successfully",
    });
  };

  const handleSyncBlog = async (source: "dev.to" | "medium") => {
    setIsLoading(true);
    try {
      // Simulate API call to sync blog posts
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addNotification({
        type: "success",
        message: `Successfully synced posts from ${source}`,
      });
    } catch (error) {
      addNotification({
        type: "error",
        message: `Failed to sync posts from ${source}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const ProjectForm = ({ project, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState({
      title: project?.title || "",
      description: project?.description || "",
      longDescription: project?.longDescription || "",
      technologies: project?.technologies?.join(", ") || "",
      githubUrl: project?.githubUrl || "",
      liveUrl: project?.liveUrl || "",
      imageUrl: project?.imageUrl || "",
      status: project?.status || "in-progress",
      featured: project?.featured || false,
      collaborators: project?.collaborators?.join(", ") || "",
      category: project?.category || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({
        ...formData,
        technologies: formData.technologies.split(",").map(t => t.trim()).filter(Boolean),
        collaborators: formData.collaborators.split(",").map(c => c.trim()).filter(Boolean),
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter project title"
              className="bg-gray-800 border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="mobile-app">Mobile App</SelectItem>
                <SelectItem value="ai-ml">AI/ML</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Brief project description"
            className="bg-gray-800 border-gray-600 text-white"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="longDescription">Detailed Description</Label>
          <Textarea
            id="longDescription"
            value={formData.longDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
            placeholder="Detailed project description"
            className="bg-gray-800 border-gray-600 text-white"
            rows={5}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
            <Input
              id="technologies"
              value={formData.technologies}
              onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
              placeholder="React, TypeScript, Node.js"
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="collaborators">Collaborators (comma-separated)</Label>
            <Input
              id="collaborators"
              value={formData.collaborators}
              onChange={(e) => setFormData(prev => ({ ...prev, collaborators: e.target.value }))}
              placeholder="John Doe, Jane Smith"
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              value={formData.githubUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
              placeholder="https://github.com/user/repo"
              className="bg-gray-800 border-gray-600 text-white"
              type="url"
            />
          </div>
          <div>
            <Label htmlFor="liveUrl">Live Demo URL</Label>
            <Input
              id="liveUrl"
              value={formData.liveUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
              placeholder="https://project-demo.com"
              className="bg-gray-800 border-gray-600 text-white"
              type="url"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="imageUrl">Cover Image URL</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              className="bg-gray-800 border-gray-600 text-white"
              type="url"
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
          />
          <Label htmlFor="featured">Featured Project</Label>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Save Project
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Manager</h1>
          <p className="text-gray-400">Manage your projects, blog posts, and testimonials</p>
        </div>
        <Button
          onClick={() => {
            setEditingItem(null);
            setIsDialogOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Content
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Projects ({projects.length})
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Blog Posts ({blogPosts.length})
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Testimonials ({testimonials.length})
          </TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Projects</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setEditingItem(null);
                  setIsDialogOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg line-clamp-1">
                          {project.title}
                        </CardTitle>
                        <p className="text-gray-400 text-sm mt-1">{project.category}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingItem(project);
                            setIsDialogOpen(true);
                          }}
                          className="h-8 w-8 p-0 text-blue-400 hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteProject(project.id)}
                          className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={project.status === "completed" ? "default" : "secondary"}
                          className={`text-xs ${
                            project.status === "completed"
                              ? "bg-emerald-600"
                              : project.status === "in-progress"
                              ? "bg-yellow-600"
                              : "bg-gray-600"
                          }`}
                        >
                          {project.status}
                        </Badge>
                        {project.featured && (
                          <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {project.githubUrl && (
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Github className="w-3 h-3" />
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Blog Tab */}
        <TabsContent value="blog" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Blog Posts</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => handleSyncBlog("dev.to")}
                variant="outline"
                disabled={isLoading}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Dev.to
              </Button>
              <Button
                onClick={() => handleSyncBlog("medium")}
                variant="outline"
                disabled={isLoading}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Medium
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {blogPosts.map((post) => (
              <Card key={post.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-semibold">{post.title}</h3>
                        <Badge
                          variant={post.status === "published" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {post.status}
                        </Badge>
                        {post.featured && (
                          <Badge variant="outline" className="text-xs text-yellow-400">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>📖 {post.readTime} min read</span>
                        <span>👁️ {post.views} views</span>
                        <span>📅 {post.publishedAt.toLocaleDateString()}</span>
                        <span>🏷️ {post.tags.join(", ")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Testimonials</h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Testimonial
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="text-white font-semibold">{testimonial.name}</h4>
                          <p className="text-gray-400 text-sm">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-400">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-2 line-clamp-3">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < testimonial.rating ? "text-yellow-400" : "text-gray-600"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        {testimonial.featured && (
                          <Badge variant="outline" className="text-xs text-yellow-400">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingItem ? "Edit" : "Create New"} {activeTab === "projects" ? "Project" : activeTab === "blog" ? "Blog Post" : "Testimonial"}
            </DialogTitle>
          </DialogHeader>
          
          {activeTab === "projects" && (
            <ProjectForm
              project={editingItem}
              onSave={handleSaveProject}
              onCancel={() => setIsDialogOpen(false)}
            />
          )}
          
          {/* Add similar forms for blog posts and testimonials */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
