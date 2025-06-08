import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    newsletter: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/contact", formData);
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        newsletter: false
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 gradient-overlay">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Questions about Mintee? Interested in bulk orders? We'd love to hear from you.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="block text-green-800 font-semibold mb-2">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-green-800 font-semibold mb-2">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="subject" className="block text-green-800 font-semibold mb-2">Subject</Label>
              <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                <SelectTrigger className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Enquiry</SelectItem>
                  <SelectItem value="bulk-order">Bulk Orders</SelectItem>
                  <SelectItem value="retail">Retail Partnership</SelectItem>
                  <SelectItem value="sustainability">Sustainability Questions</SelectItem>
                  <SelectItem value="feedback">Product Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="message" className="block text-green-800 font-semibold mb-2">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors h-32 resize-none"
                placeholder="Tell us more about your enquiry..."
                required
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <Checkbox
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={(checked) => setFormData({ ...formData, newsletter: checked as boolean })}
                className="w-4 h-4 text-green-600 border-green-300 rounded focus:ring-green-500"
              />
              <Label htmlFor="newsletter" className="text-gray-700">
                I'd like to receive updates about new products and special offers
              </Label>
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
        
        {/* Contact Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
            <h3 className="gazpacho-black text-xl text-green-800 mb-2">Customer Service</h3>
            <p className="text-gray-700">hello@minteewater.com</p>
            <p className="text-gray-700">Mon-Fri, 9am-5pm GMT</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
            <h3 className="gazpacho-black text-xl text-green-800 mb-2">Wholesale Enquiries</h3>
            <p className="text-gray-700">wholesale@minteewater.com</p>
            <p className="text-gray-700">For retail & bulk orders</p>
          </div>
        </div>
      </div>
    </section>
  );
}
