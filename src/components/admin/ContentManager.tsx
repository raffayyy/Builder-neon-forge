import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Github,
  ExternalLink,
  FileText,
  MessageSquare,
  Briefcase,
  Eye,
  Calendar,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AdminDataService, Project, BlogPost, Testimonial } from "@/lib/admin-service";
import BlogForm from "./BlogForm";
import TestimonialForm from "./TestimonialForm";
import ProjectForm from "./ProjectForm";

const ContentManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");
  
  // Form states
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projectsData, blogData, testimonialsData] = await Promise.all([
        AdminDataService.getProjects(),
        AdminDataService.getBlogPosts(),
        AdminDataService.getTestimonials()
      ]);
      
      // Ensure we always have arrays, even if API returns undefined/null
      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setBlogPosts(Array.isArray(blogData) ? blogData : []);
      setTestimonials(Array.isArray(testimonialsData) ? testimonialsData : []);
    } catch (error) {
      console.error("Failed to load data:", error);
      // Set empty arrays on error to prevent .map() failures
      setProjects([]);
      setBlogPosts([]);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  // Blog handlers
  const handleCreateBlogPost = async (postData: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'>) => {
    try {
      const newPost = await AdminDataService.createBlogPost(postData);
      setBlogPosts(prev => [...prev, newPost]);
      setShowBlogForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Failed to create blog post:", error);
    }
  };

  const handleUpdateBlogPost = async (postData: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'>) => {
    if (!editingItem) return;
    
    try {
      const updatedPost = await AdminDataService.updateBlogPost(editingItem.id, postData);
      setBlogPosts(prev => prev.map(p => p.id === editingItem.id ? updatedPost : p));
      setShowBlogForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Failed to update blog post:", error);
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    try {
      await AdminDataService.deleteBlogPost(id);
      setBlogPosts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Failed to delete blog post:", error);
    }
  };

  // Testimonial handlers
  const handleCreateTestimonial = async (testimonialData: Omit<Testimonial, 'id' | 'createdAt'>) => {
    try {
      const newTestimonial = await AdminDataService.createTestimonial(testimonialData);
      setTestimonials(prev => [...prev, newTestimonial]);
      setShowTestimonialForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Failed to create testimonial:", error);
    }
  };

  const handleUpdateTestimonial = async (testimonialData: Omit<Testimonial, 'id' | 'createdAt'>) => {
    if (!editingItem) return;
    
    try {
      const updatedTestimonial = await AdminDataService.updateTestimonial(editingItem.id, testimonialData);
      setTestimonials(prev => prev.map(t => t.id === editingItem.id ? updatedTestimonial : t));
      setShowTestimonialForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Failed to update testimonial:", error);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    try {
      await AdminDataService.deleteTestimonial(id);
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  // Project handlers
  const handleCreateProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newProject = await AdminDataService.createProject(projectData);
      setProjects(prev => [...prev, newProject]);
      setShowProjectForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const handleUpdateProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingItem) return;
    
    try {
      const updatedProject = await AdminDataService.updateProject(editingItem.id, projectData);
      setProjects(prev => prev.map(p => p.id === editingItem.id ? updatedProject : p));
      setShowProjectForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await AdminDataService.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-400">Loading content...</p>
        </div>
      </div>
    );
  }

  // If showing forms, render them instead of the main content
  if (showProjectForm) {
    return (
      <ProjectForm
        project={editingItem}
        onSave={editingItem ? handleUpdateProject : handleCreateProject}
        onCancel={() => {
          setShowProjectForm(false);
          setEditingItem(null);
        }}
      />
    );
  }

  if (showBlogForm) {
    return (
      <BlogForm
        post={editingItem}
        onSave={editingItem ? handleUpdateBlogPost : handleCreateBlogPost}
        onCancel={() => {
          setShowBlogForm(false);
          setEditingItem(null);
        }}
      />
    );
  }

  if (showTestimonialForm) {
    return (
      <TestimonialForm
        testimonial={editingItem}
        onSave={editingItem ? handleUpdateTestimonial : handleCreateTestimonial}
        onCancel={() => {
          setShowTestimonialForm(false);
          setEditingItem(null);
        }}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Content Manager</h2>
          <p className="text-gray-400">Manage projects, blog posts, and testimonials</p>
        </div>
        <Button
          onClick={() => {
            if (activeTab === "projects") {
              setEditingItem(null);
              setShowProjectForm(true);
            } else if (activeTab === "blog") {
              setEditingItem(null);
              setShowBlogForm(true);
            } else if (activeTab === "testimonials") {
              setEditingItem(null);
              setShowTestimonialForm(true);
            }
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add {activeTab === "projects" ? "Project" : activeTab === "blog" ? "Blog Post" : "Testimonial"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects" className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4" />
            <span>Projects ({projects.length})</span>
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Blog ({blogPosts.length})</span>
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Testimonials ({testimonials.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(projects) && projects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setEditingItem(project);
                          setShowProjectForm(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-400 text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        className={
                          project.status === "published" ? "bg-green-600" :
                          project.status === "draft" ? "bg-yellow-600" :
                          "bg-gray-600"
                        }
                      >
                        {project.status}
                      </Badge>
                      {project.featured && (
                        <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {project.githubUrl && (
                        <Button variant="ghost" size="sm">
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Blog Tab */}
        <TabsContent value="blog" className="space-y-6">
          <div className="space-y-4">
            {Array.isArray(blogPosts) && blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <Badge 
                          className={
                            post.status === "published" ? "bg-green-600" :
                            post.status === "draft" ? "bg-yellow-600" :
                            "bg-gray-600"
                          }
                        >
                          {post.status}
                        </Badge>
                        {post.featured && (
                          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-400 mb-3">{post.excerpt}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.publishedAt.toLocaleDateString()}</span>
                        </span>
                        <span>{post.readTime} min read</span>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setEditingItem(post);
                          setShowBlogForm(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteBlogPost(post.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(testimonials) && testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                        {testimonial.avatar ? (
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-lg font-semibold">
                            {testimonial.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setEditingItem(testimonial);
                          setShowTestimonialForm(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <blockquote className="text-gray-300 mb-4 italic">
                    "{testimonial.content}"
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating 
                              ? "text-yellow-400 fill-current" 
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    {testimonial.featured && (
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ContentManager;
