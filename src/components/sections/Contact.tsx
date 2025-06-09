import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  User,
  FileText,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        );
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case "read":
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
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
        return "Message Sent!";
      case "read":
        return "Message Read ✓";
      case "error":
        return "Try Again";
      default:
        return "Send Message";
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo?.email || "alex@example.com",
      href: `mailto:${personalInfo?.email || "alex@example.com"}`,
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo?.phone || "+1 (555) 123-4567",
      href: `tel:${personalInfo?.phone || "+15551234567"}`,
      color: "from-emerald-500 to-green-400",
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo?.location || "San Francisco, CA",
      href: "#",
      color: "from-purple-500 to-pink-400",
    },
    {
      icon: Clock,
      label: "Timezone",
      value: "PST (GMT-8)",
      href: "#",
      color: "from-orange-500 to-red-400",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: personalInfo?.social?.github || "#",
      color: "hover:text-gray-400",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: personalInfo?.social?.linkedin || "#",
      color: "hover:text-blue-400",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: personalInfo?.social?.twitter || "#",
      color: "hover:text-cyan-400",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-gray-950 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-emerald-500/5 to-purple-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6"
          >
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">Get In Touch</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let's{" "}
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from
            you. Send me a message and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white mb-2">
                  Send Message
                </CardTitle>
                <p className="text-gray-400">
                  Fill out the form below and I'll get back to you within 24
                  hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Subject
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or just say hello..."
                      rows={6}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 resize-none"
                      required
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={formStatus === "sending"}
                      className={`relative w-full rounded-full font-semibold transition-all duration-300 overflow-hidden group ${
                        formStatus === "delivered" || formStatus === "read"
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      }`}
                      onClick={() => (window as any).portfolioTracker?.trackContact()}
                    >
                      {/* Animated background effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Ripple effect on click */}
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        whileTap={{ scale: 2, opacity: [0, 0.5, 0] }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      <span className="flex items-center gap-2 relative z-10">
                        <motion.div
                          animate={formStatus === "sending" ? { rotate: 360 } : {}}
                          transition={{ duration: 1, repeat: formStatus === "sending" ? Infinity : 0 }}
                        >
                          {getStatusIcon()}
                        </motion.div>
                        <motion.span
                          key={formStatus}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {getStatusText()}
                        </motion.span>
                      </span>
                    </Button>
                  </motion.div>

                  {/* Status message */}
                  {formStatus !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-center text-sm ${
                        formStatus === "error"
                          ? "text-red-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {formStatus === "delivered" &&
                        "Thank you! Your message has been sent successfully."}
                      {formStatus === "read" &&
                        "Message received! I'll get back to you soon."}
                      {formStatus === "error" &&
                        "Oops! Something went wrong. Please try again."}
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  className="flex items-center gap-4 p-4 bg-gray-900/30 border border-gray-700/50 rounded-xl hover:border-gray-600 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} p-0.5`}
                  >
                    <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                      <method.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {method.label}
                    </div>
                    <div className="text-gray-400">{method.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-800/50 border border-gray-700/50 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:border-gray-600 hover:scale-110`}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
