import React, { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <section className="py-24 bg-secondary/20 dark:bg-white/[0.02] border-y border-border/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Stay Informed.
            </h2>
            <p className="text-lg text-foreground/60 leading-relaxed font-medium">
              Join our community of 5,000+ EV riders. Get the latest updates on products and exclusive offers.
            </p>
          </div>

          <div className="flex-1 w-full">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:border-primary text-foreground transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Send size={18} />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 justify-center md:justify-start text-primary font-bold">
                <CheckCircle2 size={24} />
                <span>You're on the list!</span>
              </div>
            )}
            <p className="mt-4 text-xs text-foreground/30 text-center md:text-left">
              By subscribing, you agree to our privacy policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
