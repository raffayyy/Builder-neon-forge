import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Eye,
  X,
  Image,
  Tag,
  Calendar,
  User,
  FileText,
  Settings,
  Globe,
  Hash,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogPost } from "@/lib/admin-service";

interface BlogFormProps {
  post?: BlogPost | null;
  onSave: (post: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const BlogForm = ({ post, onSave, onCancel }: BlogFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "Admin User",
    status: "draft" as const,
    featured: false,
    tags: [] as string[],
    readTime: 5,
    image: "",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [] as string[],
    },
  });

  const [newTag, setNewTag] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        status: post.status,
        featured: post.featured,
        tags: post.tags,
        readTime: post.readTime,
        image: post.image || "",
        seo: post.seo,
      });
    }
  }, [post]);

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.seo.keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: [...prev.seo.keywords, newKeyword.trim()]
        }
      }));
      setNewKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter(keyword => keyword !== keywordToRemove)
      }
    }));
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content,
      readTime: calculateReadTime(content)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderMarkdownPreview = (content: string) => {
    // Simple markdown rendering for preview
    return content
      .replace(/^# (.+$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.+$)/gim, '<h2 class="text-2xl font-semibold mb-3">$1</h2>')
      .replace(/^### (.+$)/gim, '<h3 class="text-xl font-medium mb-2">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(.+$)/gim, '<p class="mb-4">$1</p>');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          {post ? "Edit Blog Post" : "Create New Blog Post"}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>{previewMode ? "Edit" : "Preview"}</span>
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!previewMode ? (
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Content</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter blog post title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Excerpt</label>
                    <Textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Brief description of the blog post"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Content (Markdown)</label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder="Write your blog post content in Markdown..."
                      rows={15}
                      className="font-mono"
                      required
                    />
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Supports Markdown formatting</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formData.readTime} min read</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Featured Image URL</label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Post Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Author</label>
                      <Input
                        value={formData.author}
                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="Author name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Featured Post</div>
                      <div className="text-sm text-gray-400">
                        Show this post prominently on the blog page
                      </div>
                    </div>
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium">Tags</label>
                    <div className="flex space-x-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        <Tag className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>SEO Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meta Title</label>
                    <Input
                      value={formData.seo.metaTitle}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        seo: { ...prev.seo, metaTitle: e.target.value }
                      }))}
                      placeholder="SEO-optimized title"
                    />
                    <div className="text-xs text-gray-400">
                      {formData.seo.metaTitle.length}/60 characters
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meta Description</label>
                    <Textarea
                      value={formData.seo.metaDescription}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        seo: { ...prev.seo, metaDescription: e.target.value }
                      }))}
                      placeholder="Brief description for search engines"
                      rows={3}
                    />
                    <div className="text-xs text-gray-400">
                      {formData.seo.metaDescription.length}/160 characters
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium">SEO Keywords</label>
                    <div className="flex space-x-2">
                      <Input
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        placeholder="Add keyword"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                      />
                      <Button type="button" onClick={addKeyword} variant="outline">
                        <Hash className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.seo.keywords.map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => removeKeyword(keyword)}
                        >
                          {keyword} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          /* Preview Mode */
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <article className="prose prose-invert max-w-none">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt={formData.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-2">{formData.title || "Untitled Post"}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{formData.author}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date().toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formData.readTime} min read</span>
                    </span>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-lg text-gray-300 mb-6">{formData.excerpt}</p>
                </div>
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(formData.content) }}
                />
              </article>
            </CardContent>
          </Card>
        )}

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-2">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default BlogForm;
