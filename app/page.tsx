"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const services = [
  {
    name: "Roofing",
    description: "Expert roof installation, repair, and replacement. We protect what matters most - your home and family.",
    image: "/img/Roofing.avif",
    features: ["Free Inspections", "Storm Damage Repair", "Quality Materials"],
  },
  {
    name: "Flooring",
    description: "Transform your space with beautiful, durable flooring. Hardwood, laminate, tile, and luxury vinyl.",
    image: "/img/flooring.jpg",
    features: ["Hardwood & Laminate", "Tile Installation", "Subfloor Repair"],
  },
  {
    name: "Gutters",
    description: "Keep water away from your foundation with professionally installed gutter systems.",
    image: "/img/Gutters.jpg",
    features: ["Seamless Gutters", "Gutter Guards", "Downspout Installation"],
  },
  {
    name: "Decks",
    description: "Create your perfect outdoor living space with custom deck design and construction.",
    image: "/img/Decks.jpg",
    features: ["Custom Design", "Composite & Wood", "Deck Restoration"],
  },
  {
    name: "Fences",
    description: "Add privacy, security, and curb appeal with our professional fence installation.",
    image: "/img/fences.jpg",
    features: ["Wood & Vinyl", "Privacy Fencing", "Gates & Hardware"],
  },
  {
    name: "Painting",
    description: "Refresh your home inside and out with our professional painting services.",
    image: "/img/painting.jpg",
    features: ["Interior & Exterior", "Cabinet Refinishing", "Staining & Sealing"],
  },
];

const testimonials = [
  {
    name: "Michael R.",
    location: "Oakville, MO",
    text: "55 South did an amazing job on our roof. Professional crew, fair pricing, and they cleaned up everything when done. Highly recommend!",
    rating: 5,
    service: "Roofing",
  },
  {
    name: "Sarah T.",
    location: "South County",
    text: "We had our entire first floor refloored. The team was punctual, respectful of our home, and the results are beautiful. Will use again!",
    rating: 5,
    service: "Flooring",
  },
  {
    name: "David & Lisa M.",
    location: "Arnold, MO",
    text: "Built us a gorgeous deck just in time for summer. Great communication throughout the project. Quality workmanship.",
    rating: 5,
    service: "Decks",
  },
];

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "100%", label: "Satisfaction Goal" },
  { value: "24hr", label: "Response Time" },
];

const processSteps = [
  {
    step: "1",
    title: "Free Consultation",
    description: "Call us or fill out our form. We'll discuss your project and schedule a free on-site estimate.",
  },
  {
    step: "2",
    title: "Detailed Quote",
    description: "Receive a transparent, itemized quote with no hidden fees. We explain every detail.",
  },
  {
    step: "3",
    title: "Expert Execution",
    description: "Our skilled team completes your project on time, with quality materials and craftsmanship.",
  },
  {
    step: "4",
    title: "Final Walkthrough",
    description: "We walk through the completed work together. Your satisfaction is our priority.",
  },
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-white/90 backdrop-blur-md py-4"
      }`}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <Image
              src="/img/55signlogo.png"
              alt="55 South Contractors Logo"
              width={48}
              height={48}
              className="rounded-lg shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-slate-800 block leading-tight">55 South Contractors</span>
              <span className="text-xs text-slate-500 font-medium">Interior & Exterior Specialists</span>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <a href="#services" className="hidden md:block text-slate-600 hover:text-slate-900 font-medium transition-colors">
              Services
            </a>
            <a href="#contact" className="hidden md:block text-slate-600 hover:text-slate-900 font-medium transition-colors ml-4">
              Contact
            </a>
            <a
              href="tel:3147179971"
              className="ml-4 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              <PhoneIcon />
              <span className="hidden sm:inline">314-717-9971</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/55-sign-andBackdrop.avif"
            alt="55 South Contractors"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-br from-slate-900/95 via-slate-900/85 to-slate-800/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-20 pb-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Serving St. Louis & Surrounding Areas</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
            <span className="text-white">Quality Home</span>
            <br />
            <span className="bg-linear-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">Improvements</span>
            <br />
            <span className="text-white">You Can Trust</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            From roofing to flooring, decks to painting — we deliver exceptional craftsmanship with honest pricing and reliable service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href="tel:3147179971"
              className="group bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:-translate-y-1 flex items-center gap-3"
            >
              <PhoneIcon />
              Call 314-717-9971
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
            <a
              href="#contact"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-1"
            >
              Get Free Estimate
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/60">
            <div className="flex items-center gap-2">
              <ShieldIcon />
              <span className="text-sm font-medium">Licensed & Insured</span>
            </div>
            <div className="w-px h-4 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <StarIcon />
              <span className="text-sm font-medium">BBB Accredited</span>
            </div>
            <div className="w-px h-4 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <CheckCircleIcon />
              <span className="text-sm font-medium">Free Estimates</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-900 py-12 -mt-1">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-orange-500 mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase">What We Do</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mt-3 mb-4">Our Services</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive home improvement solutions delivered with expertise and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.name}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-orange-200 hover:-translate-y-1"
              >
                {service.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{service.name}</h3>
                  </div>
                ) : (
                  <div className="h-48 bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.2),transparent_60%)]" />
                    <span className="text-5xl opacity-80 group-hover:scale-110 transition-transform duration-300">{getServiceIcon(service.name)}</span>
                    <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{service.name}</h3>
                  </div>
                )}
                <div className="p-6">
                  <p className="text-slate-600 mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase">How It Works</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mt-3 mb-4">Simple, Transparent Process</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We make home improvement easy. Here&apos;s what to expect when you work with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-linear-to-r from-orange-300 to-transparent -translate-x-4" />
                )}
                <div className="bg-linear-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg shadow-orange-500/30">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-28 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-orange-400 font-semibold text-sm tracking-wider uppercase">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Don&apos;t just take our word for it — hear from homeowners who trusted us with their projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-orange-500/30 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarFilledIcon key={i} />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.location}</div>
                  </div>
                  <span className="text-xs font-medium text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full">
                    {testimonial.service}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-12 pt-12 border-t border-slate-700/50">
            <a
              href="https://www.bbb.org/us/mo/saint-louis/profile/roofing-contractors/55-south-contractors-0734-1000046257"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors group"
            >
              <ShieldIcon className="text-orange-400" />
              <span className="font-semibold text-white group-hover:text-orange-400 transition-colors">BBB Accredited</span>
            </a>
            <a
              href="https://www.facebook.com/people/55-South-Contractors/61550928122415/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors group"
            >
              <FacebookIcon />
              <span className="font-semibold text-white group-hover:text-orange-400 transition-colors">Follow on Facebook</span>
            </a>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 bg-linear-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <ShieldIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Commitment to You</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            We stand behind our work. Every project is completed with quality materials, skilled craftsmanship, and your complete satisfaction in mind. If something isn&apos;t right, we&apos;ll make it right.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase">Get Started</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mt-3 mb-6">
                Ready to Transform<br />Your Home?
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Get your free, no-obligation estimate today. We&apos;ll discuss your project, answer your questions, and provide transparent pricing.
              </p>

              <div className="space-y-4 mb-8">
                <a href="tel:3147179971" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                    <PhoneIcon className="text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Call us directly</div>
                    <div className="text-xl font-bold text-slate-800 group-hover:text-orange-500 transition-colors">314-717-9971</div>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    <ClockIcon />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Response time</div>
                    <div className="text-lg font-semibold text-slate-800">Within 24 hours</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    <MapPinIcon />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Service area</div>
                    <div className="text-lg font-semibold text-slate-800">St. Louis & Surrounding Areas</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Request Your Free Estimate</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      placeholder="(314) 555-0123"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Select a service</option>
                      <option value="roofing">Roofing</option>
                      <option value="flooring">Flooring</option>
                      <option value="gutters">Gutters</option>
                      <option value="decks">Decks</option>
                      <option value="fences">Fences</option>
                      <option value="painting">Painting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-semibold py-4 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? "Sending..." : "Get My Free Estimate"}
                </button>

                {submitStatus === "success" && (
                  <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-xl text-center font-medium">
                    Thank you! We&apos;ll be in touch within 24 hours.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="mt-4 p-4 bg-red-50 text-red-800 rounded-xl text-center">
                    Something went wrong. Please call us at <a href="tel:3147179971" className="font-semibold underline">314-717-9971</a>
                  </div>
                )}

                <p className="text-xs text-slate-500 text-center mt-4">
                  By submitting, you agree to receive calls/texts about your project. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/img/55signlogo.png"
                  alt="55 South Contractors Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span className="font-bold text-lg">55 South Contractors</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Interior & Exterior Specialists serving St. Louis and surrounding areas with quality home improvement services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#services" className="hover:text-orange-400 transition-colors">Roofing</a></li>
                <li><a href="#services" className="hover:text-orange-400 transition-colors">Flooring</a></li>
                <li><a href="#services" className="hover:text-orange-400 transition-colors">Gutters</a></li>
                <li><a href="#services" className="hover:text-orange-400 transition-colors">Decks & Fences</a></li>
                <li><a href="#services" className="hover:text-orange-400 transition-colors">Painting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="tel:3147179971" className="hover:text-orange-400 transition-colors flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4" />
                    314-717-9971
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  St. Louis, MO
                </li>
              </ul>
              <div className="flex gap-3 mt-4">
                <a
                  href="https://www.facebook.com/people/55-South-Contractors/61550928122415/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} 55 South Contractors LLC. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Mobile CTA */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-slate-200 z-40 md:hidden transition-transform duration-300 ${
        isScrolled ? "translate-y-0" : "translate-y-full"
      }`}>
        <a
          href="tel:3147179971"
          className="flex items-center justify-center gap-2 w-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 rounded-xl shadow-lg"
        >
          <PhoneIcon />
          Call Now - 314-717-9971
        </a>
      </div>
    </div>
  );
}

function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function ShieldIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function StarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function StarFilledIcon() {
  return (
    <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function MapPinIcon({ className = "w-5 h-5 text-slate-400" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function getServiceIcon(serviceName: string): string {
  const icons: Record<string, string> = {
    Roofing: "🏠",
    Flooring: "🪵",
    Gutters: "🌧️",
    Decks: "🪜",
    Fences: "🏡",
    Painting: "🎨",
  };
  return icons[serviceName] || "🔨";
}
