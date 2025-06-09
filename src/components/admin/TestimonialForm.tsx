import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  X,
  Star,
  User,
  Building,
  Briefcase,
  Image,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Testimonial } from "@/lib/admin-service";

interface TestimonialFormProps {
  testimonial?: Testimonial | null;
  onSave: (testimonial: Omit<Testimonial, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const TestimonialForm = ({ testimonial, onSave, onCancel }: TestimonialFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    avatar: "",
    featured: false,
    approved: true,
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company,
        content: testimonial.content,
        rating: testimonial.rating,
        avatar: testimonial.avatar || "",
        featured: testimonial.featured,
        approved: testimonial.approved,
      });
    }
  }, [testimonial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
            className={`p-1 rounded ${
              star <= formData.rating 
                ? "text-yellow-400" 
                : "text-gray-600 hover:text-gray-400"
            }`}
          >
            <Star className="h-5 w-5 fill-current" />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-400">({formData.rating}/5)</span>
      </div>
    );
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
          {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
        </h3>
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Testimonial Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Full Name</span>
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center space-x-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Job Title</span>
                </label>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="Senior Developer"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>Company</span>
                </label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Tech Corp"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center space-x-2">
                  <Image className="h-4 w-4" />
                  <span>Avatar URL (Optional)</span>
                </label>
                <Input
                  value={formData.avatar}
                  onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>

            {/* Avatar Preview */}
            {formData.avatar && (
              <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                <img
                  src={formData.avatar}
                  alt="Avatar preview"
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/api/placeholder/64/64";
                  }}
                />
                <div>
                  <div className="font-medium">{formData.name || "Preview Name"}</div>
                  <div className="text-sm text-gray-400">
                    {formData.role || "Preview Role"} at {formData.company || "Preview Company"}
                  </div>
                </div>
              </div>
            )}

            {/* Testimonial Content */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Testimonial</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Write the testimonial content here..."
                rows={6}
                required
              />
              <div className="text-xs text-gray-400">
                {formData.content.length}/500 characters
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Rating</label>
              {renderStarRating()}
            </div>

            {/* Settings */}
            <div className="space-y-4 pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Featured Testimonial</div>
                  <div className="text-sm text-gray-400">
                    Show this testimonial prominently on the homepage
                  </div>
                </div>
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Approved</div>
                  <div className="text-sm text-gray-400">
                    Display this testimonial on the website
                  </div>
                </div>
                <Switch
                  checked={formData.approved}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, approved: checked }))}
                />
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Preview</label>
              <div className="p-6 bg-gray-800 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                    {formData.avatar ? (
                      <img
                        src={formData.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <User className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="mb-3">
                      <p className="text-gray-300 italic">
                        "{formData.content || "Your testimonial will appear here..."}"
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < formData.rating 
                              ? "text-yellow-400 fill-current" 
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <div>
                      <div className="font-semibold">
                        {formData.name || "Customer Name"}
                      </div>
                      <div className="text-sm text-gray-400">
                        {formData.role || "Job Title"} at {formData.company || "Company"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-2">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {testimonial ? "Update Testimonial" : "Add Testimonial"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TestimonialForm;
