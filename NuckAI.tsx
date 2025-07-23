'use client'

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ArrowRight, Brain, Code2, Eye, Zap, Github, Mail, ArrowLeft, Cpu, Database, Smartphone, Apple } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

interface NuckAIProps {
  onNavigateBack: () => void;
}

export default function NuckAI({ onNavigateBack }: NuckAIProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const techRef = useRef(null);
  const purposeRef = useRef(null);
  const devRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const heroIsInView = useInView(heroRef, { once: false, amount: 0.5 });
  const techIsInView = useInView(techRef, { once: true, amount: 0.3 });
  const purposeIsInView = useInView(purposeRef, { once: true, amount: 0.3 });
  const devIsInView = useInView(devRef, { once: true, amount: 0.3 });
  
  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white text-gray-900 overflow-x-hidden relative">
      {/* Glass Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 via-blue-100/30 to-pink-100/30 animate-gradient-x" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.08), transparent 40%)`
          }}
        />
        {/* Glass texture overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={onNavigateBack}
              className="flex items-center space-x-3 group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
              <span className="font-medium text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Nuck AI
              </span>
            </motion.button>
            <div className="hidden md:flex items-center space-x-8">
              {[
                { label: 'Tech Specs', id: 'tech' },
                { label: 'Purpose', id: 'purpose' },
                { label: 'Development', id: 'development' }
              ].map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  onClick={() => smoothScrollTo(item.id)}
                  className="relative px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors group"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="pt-32 pb-20 px-6 relative min-h-screen flex items-center"
      >
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.div
            initial="initial"
            animate={heroIsInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center mb-8">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mr-4"
              >
                🧠
              </motion.div>
              <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 border-purple-300 text-purple-700 hover:from-purple-200 hover:to-blue-200 transition-all duration-300 backdrop-blur-sm">
                AI/ML Project
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight text-gray-900"
            >
              Meet{' '}
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                Nuck AI
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-3xl text-gray-700 mb-8 max-w-3xl leading-relaxed"
            >
              Your Personal University Assistant, Reimagined with{' '}
              <span className="text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
                Intelligence and Edge
              </span>
              .
            </motion.p>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-12 max-w-4xl leading-relaxed"
            >
              Nuck AI is an experimental AI project built from the ground up to be more than just another chatbot. 
              It's a lightweight, multimodal LLM assistant designed to understand, think, and assist like a real study partner — 
              tailored for students, by a student.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-purple-600 to-blue-700 hover:from-purple-700 hover:to-blue-800 border-0 text-lg px-8 py-6 rounded-2xl text-white shadow-lg"
                  onClick={() => smoothScrollTo('tech')}
                >
                  Explore the Tech
                  <Brain className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-300 hover:border-gray-400 bg-white/60 hover:bg-white/80 text-gray-700 hover:text-gray-900 text-lg px-8 py-6 rounded-2xl backdrop-blur-sm shadow-md"
                >
                  <Github className="mr-3 h-5 w-5" />
                  View Source
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating AI-themed Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0, -10, 0] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 right-20 hidden lg:block"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-xl backdrop-blur-sm" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 25, 0],
            x: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 left-20 hidden lg:block"
        >
          <div className="w-28 h-28 bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full blur-xl backdrop-blur-sm" />
        </motion.div>
      </motion.section>

      {/* Under the Hood Section */}
      <motion.section 
        id="tech" 
        ref={techRef}
        className="py-20 px-6 relative"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={techIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <span className="text-4xl mr-4">⚙️</span>
              <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Under the Hood
              </h2>
            </div>
          </motion.div>
          
          <motion.div
            initial="initial"
            animate={techIsInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Cpu,
                title: "Architecture",
                description: "Transformer-based LLM written from scratch in Python",
                gradient: "from-blue-100/60 to-cyan-100/60",
                iconColor: "text-blue-600"
              },
              {
                icon: Database,
                title: "Parameters",
                description: "~2 million (current prototype), with a roadmap to scale to 2B+",
                gradient: "from-purple-100/60 to-pink-100/60",
                iconColor: "text-purple-600"
              },
              {
                icon: Eye,
                title: "Modalities",
                description: "Text + Vision input (yes, it sees and understands visuals)",
                gradient: "from-emerald-100/60 to-teal-100/60",
                iconColor: "text-emerald-600"
              },
              {
                icon: Brain,
                title: "Training Goal",
                description: "Context-aware, academic-assisting, real-time reasoning",
                gradient: "from-orange-100/60 to-red-100/60",
                iconColor: "text-orange-600"
              },
              {
                icon: Smartphone,
                title: "Platform Integration",
                description: "Being optimized for Swift, MLC-LLM, and Core ML",
                gradient: "from-indigo-100/60 to-purple-100/60",
                iconColor: "text-indigo-600"
              },
              {
                icon: Apple,
                title: "Frontend",
                description: "Built with SwiftUI for iOS/macOS deployment",
                gradient: "from-gray-100/60 to-slate-100/60",
                iconColor: "text-gray-600"
              }
            ].map((spec, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group perspective-1000"
              >
                <Card className={`h-full border-gray-200/50 bg-gradient-to-br ${spec.gradient} backdrop-blur-xl hover:border-gray-300/60 transition-all duration-500 transform-gpu shadow-lg hover:shadow-xl`}>
                  <CardContent className="p-8">
                    <motion.div 
                      className="mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className={`w-14 h-14 bg-gradient-to-br ${spec.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300 border border-gray-200/30`}>
                        <spec.icon className={`h-7 w-7 ${spec.iconColor}`} />
                      </div>
                      <h3 className="text-xl mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text transition-all duration-300">
                        {spec.title}
                      </h3>
                    </motion.div>
                    <p className="text-gray-700 leading-relaxed">
                      {spec.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Why Nuck Exists Section */}
      <motion.section 
        id="purpose" 
        ref={purposeRef}
        className="py-20 px-6 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            animate={purposeIsInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={slideInLeft}>
              <div className="flex items-center mb-8">
                <span className="text-4xl mr-4">💡</span>
                <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent">
                  Why Nuck Exists
                </h2>
              </div>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={purposeIsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Most AI assistants are bloated, generic, or locked behind a paywall.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={purposeIsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Nuck AI is designed to be <span className="text-purple-600 font-medium">fast, local, intelligent, and uniquely student-first</span> — helping with tasks like:
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="space-y-6"
            >
              <motion.div
                whileHover={{ scale: 1.02, rotateX: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-gray-200/50 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-xl shadow-lg">
                  <CardContent className="p-8">
                    <h4 className="mb-6 text-xl text-gray-900">Student-First Features</h4>
                    <div className="space-y-4">
                      {[
                        { 
                          task: "Explaining complex topics", 
                          examples: "(PLCs, circuits, AI theory, etc.)",
                          icon: "📚"
                        },
                        { 
                          task: "Generating academic content", 
                          examples: "or simplifying concepts",
                          icon: "✍️"
                        },
                        { 
                          task: "Reading documents or diagrams", 
                          examples: "and providing real-time breakdowns",
                          icon: "👁️"
                        },
                        { 
                          task: "Running offline", 
                          examples: "for privacy and performance",
                          icon: "🔒"
                        }
                      ].map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={purposeIsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                          className="flex items-start space-x-4 group hover:bg-gray-50/60 p-3 rounded-lg transition-colors"
                        >
                          <span className="text-2xl flex-shrink-0">{feature.icon}</span>
                          <div>
                            <p className="text-gray-900 group-hover:text-purple-700 transition-colors font-medium">
                              {feature.task}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {feature.examples}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Development Status Section */}
      <motion.section 
        id="development"
        ref={devRef}
        className="py-20 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={devIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center mb-8">
              <span className="text-4xl mr-4">🚧</span>
              <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Still in Development
              </h2>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={devIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-yellow-50/80 to-orange-50/80 border-yellow-200/50 backdrop-blur-xl shadow-lg">
                <CardContent className="p-8">
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    This project is in active development — I'm currently expanding it into a <span className="font-medium text-orange-600">2B parameter model</span>, 
                    optimizing inference for <span className="font-medium text-blue-600">Apple Silicon</span>, and experimenting with fine-tuning on university data.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {[
                      { label: "Model Scaling", status: "In Progress", color: "bg-blue-100 text-blue-700" },
                      { label: "Apple Silicon Optimization", status: "Research", color: "bg-purple-100 text-purple-700" },
                      { label: "University Data Training", status: "Experimenting", color: "bg-green-100 text-green-700" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={devIsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        className="text-center"
                      >
                        <div className="text-sm font-medium text-gray-900 mb-2">{item.label}</div>
                        <Badge className={`${item.color} border-0`}>
                          {item.status}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-gray-600 mb-8">
                    If you're into LLMs, open-source AI, or want to collaborate —
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        className="group bg-gradient-to-r from-purple-600 to-blue-700 hover:from-purple-700 hover:to-blue-800 border-0 text-white shadow-lg"
                      >
                        <Mail className="mr-3 h-5 w-5" />
                        Get in Touch
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-gray-300 hover:border-gray-400 bg-white/60 hover:bg-white/80 text-gray-700 hover:text-gray-900 backdrop-blur-sm shadow-md"
                      >
                        <Github className="mr-3 h-5 w-5" />
                        Follow Development
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200/50 bg-white/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between"
          >
            <p className="text-gray-600 mb-4 sm:mb-0">
              © 2025 Golden Kalala. Nuck AI - Built with intelligence and purpose.
            </p>
            <motion.button
              onClick={onNavigateBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Portfolio</span>
            </motion.button>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}