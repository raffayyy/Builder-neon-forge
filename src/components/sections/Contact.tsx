import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Eye,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { personalInfo, contactInfo } from "@/lib/data";

type FormStatus = "idle" | "sending" | "delivered" | "read" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("delivered");
      setTimeout(() => {
        setFormStatus("read");
      }, 2000);
    }, 1500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getStatusIcon = () => {
    switch (formStatus) {
      case "sending":
        return (
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "read":
        return <Eye className="w-5 h-5 text-blue-400" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Send className="w-5 h-5" />;
    }
  };

  const getStatusText = () => {
    switch (formStatus) {
      case "sending":
        return "Sending...";
      case "delivered":
        return "Delivered ✓";
      case "read":
        return "Read 👀";
      case "error":
        return "Error occurred";
      default:
        return "Send Message";
    }
  };

  return (
    <section id="contact" className="section-padding bg-portfolio-surface">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 text-white mb-4">Let's Work Together</h2>
          <p className="body-large text-white/70 max-w-2xl mx-auto mb-6">
            {personalInfo.quote}
          </p>
          <Badge
            variant="outline"
            className="border-green-500/30 text-green-400 bg-green-500/10"
          >
            {contactInfo.availability}
          </Badge>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-white text-2xl font-semibold mb-6">
                Get In Touch
              </h3>
              <p className="text-white/70 text-lg leading-relaxed">
                I'm always excited to discuss new opportunities, collaborate on
                interesting projects, or just have a conversation about
                technology and innovation.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: contactInfo.email,
                  action: `mailto:${contactInfo.email}`,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: contactInfo.phone,
                  action: `tel:${contactInfo.phone}`,
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: contactInfo.address,
                  action: null,
                },
                {
                  icon: Clock,
                  label: "Timezone",
                  value: contactInfo.timezone,
                  action: null,
                },
              ].map(({ icon: Icon, label, value, action }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-4 p-4 bg-portfolio-bg/50 rounded-lg border border-white/10"
                >
                  <div className="w-12 h-12 bg-portfolio-primary/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-portfolio-primary" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">{label}</div>
                    {action ? (
                      <a
                        href={action}
                        className="text-white hover:text-portfolio-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="text-white">{value}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-r from-portfolio-primary/10 to-portfolio-secondary/10 rounded-lg border border-portfolio-primary/20"
            >
              <h4 className="text-white font-semibold mb-2">Quick Response</h4>
              <p className="text-white/70 text-sm">
                I typically respond to emails within 24 hours. For urgent
                matters, feel free to reach out via phone.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-portfolio-bg border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/70 text-sm mb-2 block">
                        Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 text-sm mb-2 block">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/70 text-sm mb-2 block">
                      Subject *
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div>
                    <label className="text-white/70 text-sm mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or idea..."
                      rows={6}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className={`w-full py-3 text-lg btn-glow transition-all duration-300 ${
                      formStatus === "delivered" || formStatus === "read"
                        ? "bg-green-600 hover:bg-green-700"
                        : formStatus === "error"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-portfolio-primary hover:bg-portfolio-primary/80"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      {getStatusIcon()}
                      <span>{getStatusText()}</span>
                    </div>
                  </Button>

                  {/* Status Messages */}
                  {formStatus === "delivered" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-400 text-sm text-center"
                    >
                      Message delivered successfully! I'll get back to you soon.
                    </motion.div>
                  )}

                  {formStatus === "read" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-blue-400 text-sm text-center"
                    >
                      Message has been read! Expect a response within 24 hours.
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
