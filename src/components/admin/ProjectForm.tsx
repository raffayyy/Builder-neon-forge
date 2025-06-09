import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Eye,
  Github,
  ExternalLink,
  Plus,
  X,
  Upload,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project } from "@/lib/admin-service";

interface ProjectFormProps {
  project?: Project | null;
  onSave: (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, onSave, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    image: "",
    technologies: [] as string[],
    githubUrl: "",
    liveUrl: "",
    featured: false,
    status: "draft" as "published" | "draft" | "archived",
    collaborators: [] as Array<{ name: string; role: string }>,
    metrics: {
      views: 0,
      likes: 0,
      shares: 0,
    },
  });
  
  const [newTechnology, setNewTechnology] = useState("");
  const [newCollaborator, setNewCollaborator] = useState({ name: "", role: "" });
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        longDescription: project.longDescription || "",
        image: project.image || "",
        technologies: project.technologies || [],
        githubUrl: project.githubUrl || "",
        liveUrl: project.liveUrl || "",
        featured: project.featured || false,
        status: project.status || "draft",
        collaborators: project.collaborators || [],
        metrics: project.metrics || {
          views: 0,
          likes: 0,
          shares: 0,
        },
      });
    }
  }, [project]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addCollaborator = () => {
    if (newCollaborator.name.trim() && newCollaborator.role.trim()) {
      setFormData(prev => ({
        ...prev,
        collaborators: [...prev.collaborators, { ...newCollaborator }]
      }));
      setNewCollaborator({ name: "", role: "" });
    }
  };

  const removeCollaborator = (index: number) => {
    setFormData(prev => ({
      ...prev,
      collaborators: prev.collaborators.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in all required fields");
      return;
    }
    
    onSave(formData);
  };

  if (previewMode) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-6 space-y-6"
      >
        {/* Preview Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setPreviewMode(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Edit
            </Button>
            <h2 className="text-2xl font-bold">Project Preview</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Project
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{formData.title}</CardTitle>
                <p className="text-gray-400 mt-2">{formData.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={
                  formData.status === "published" ? "bg-green-600" :
                  formData.status === "draft" ? "bg-yellow-600" :
                  "bg-gray-600"
                }>
                  {formData.status}
                </Badge>
                {formData.featured && (
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.image && (
              <img 
                src={formData.image} 
                alt={formData.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            
            {formData.longDescription && (
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-300 leading-relaxed">{formData.longDescription}</p>
              </div>
            )}

            <div>
              <h4 className="font-semibold mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </div>

            {formData.collaborators.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Team</h4>
                <div className="space-y-2">
                  {formData.collaborators.map((collab, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded">
                      <span>{collab.name}</span>
                      <Badge variant="outline">{collab.role}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.metrics && (
              <div>
                <h4 className="font-semibold mb-3">Metrics</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-800 rounded">
                    <div className="text-lg font-bold">{formData.metrics.views}</div>
                    <div className="text-sm text-gray-400">Views</div>
                  </div>
                  <div className="text-center p-3 bg-gray-800 rounded">
                    <div className="text-lg font-bold">{formData.metrics.likes}</div>
                    <div className="text-sm text-gray-400">Likes</div>
                  </div>
                  <div className="text-center p-3 bg-gray-800 rounded">
                    <div className="text-lg font-bold">{formData.metrics.shares}</div>
                    <div className="text-sm text-gray-400">Shares</div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              {formData.githubUrl && (
                <Button variant="outline" asChild>
                  <a href={formData.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              )}
              {formData.liveUrl && (
                <Button asChild>
                  <a href={formData.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-2xl font-bold">
            {project ? "Edit Project" : "Create New Project"}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(true)}
            disabled={!formData.title.trim()}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="team">Team & Metrics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter project title"
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Brief description of the project"
                  className="bg-gray-800 border-gray-700 min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription">Detailed Description</Label>
                <Textarea
                  id="longDescription"
                  value={formData.longDescription}
                  onChange={(e) => handleInputChange("longDescription", e.target.value)}
                  placeholder="Detailed description of the project"
                  className="bg-gray-800 border-gray-700 min-h-[150px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Project Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="bg-gray-800 border-gray-700"
                />
                <Button variant="outline" size="sm" className="mt-2">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Details */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Technologies */}
              <div className="space-y-3">
                <Label>Technologies Used</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    placeholder="Add technology"
                    className="bg-gray-800 border-gray-700"
                    onKeyPress={(e) => e.key === "Enter" && addTechnology()}
                  />
                  <Button onClick={addTechnology}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      <Badge variant="secondary">{tech}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTechnology(tech)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => handleInputChange("githubUrl", e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live Demo URL</Label>
                  <Input
                    id="liveUrl"
                    value={formData.liveUrl}
                    onChange={(e) => handleInputChange("liveUrl", e.target.value)}
                    placeholder="https://example.com"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team & Metrics */}
        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Collaborators */}
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    value={newCollaborator.name}
                    onChange={(e) => setNewCollaborator(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Collaborator name"
                    className="bg-gray-800 border-gray-700"
                  />
                  <Input
                    value={newCollaborator.role}
                    onChange={(e) => setNewCollaborator(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="Role"
                    className="bg-gray-800 border-gray-700"
                  />
                  <Button onClick={addCollaborator} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Team Member
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.collaborators.map((collab, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <div>
                        <div className="font-medium">{collab.name}</div>
                        <div className="text-sm text-gray-400">{collab.role}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCollaborator(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Project Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="views">Views</Label>
                    <Input
                      id="views"
                      type="number"
                      value={formData.metrics.views}
                      onChange={(e) => handleInputChange("metrics", {
                        ...formData.metrics,
                        views: parseInt(e.target.value) || 0
                      })}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="likes">Likes</Label>
                    <Input
                      id="likes"
                      type="number"
                      value={formData.metrics.likes}
                      onChange={(e) => handleInputChange("metrics", {
                        ...formData.metrics,
                        likes: parseInt(e.target.value) || 0
                      })}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shares">Shares</Label>
                    <Input
                      id="shares"
                      type="number"
                      value={formData.metrics.shares}
                      onChange={(e) => handleInputChange("metrics", {
                        ...formData.metrics,
                        shares: parseInt(e.target.value) || 0
                      })}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="featured">Featured Project</Label>
                    <p className="text-sm text-gray-400">Show this project prominently</p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange("featured", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Project Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ProjectForm;
