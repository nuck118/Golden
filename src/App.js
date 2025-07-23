'use client'

import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import { ArrowRight, Code, Brain, Palette, Github, Mail, Linkedin, ExternalLink, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import NuckAI from './components/NuckAI';

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

export default function App() {
  const [currentPage, setCurrentPage] = useState<'portfolio' | 'nuck-ai'>('portfolio');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const heroIsInView = useInView(heroRef, { once: false, amount: 0.5 });
  const aboutIsInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const workIsInView = useInView(workRef, { once: true, amount: 0.3 });
  
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

  const navigateToNuckAI = () => {
    setCurrentPage('nuck-ai');
    window.scrollTo(0, 0);
  };

  const navigateToPortfolio = () => {
    setCurrentPage('portfolio');
    window.scrollTo(0, 0);
  };

  if (currentPage === 'nuck-ai') {
    return <NuckAI onNavigateBack={navigateToPortfolio} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white text-gray-900 overflow-x-hidden relative">
      {/* Glass Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-purple-100/30 to-pink-100/30 animate-gradient-x" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08), transparent 40%)`
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
            <motion.div 
              className="font-medium text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Golden Kalala
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              {[
                { label: 'About', id: 'about' },
                { label: 'Work', id: 'work' },
                { label: 'Contact', id: 'contact' }
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
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
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
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-gradient-to-r from-green-100 to-blue-100 border-green-300 text-green-700 hover:from-green-200 hover:to-blue-200 transition-all duration-300 backdrop-blur-sm">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <Sparkles className="h-3 w-3" />
                </motion.div>
                Available for projects
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight text-gray-900"
            >
              Hey, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                Golden Kalala
              </span>
              .
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-3xl text-gray-700 mb-8 max-w-2xl"
            >
              Engineering student. Builder.{' '}
              <span className="text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text">
                Creative Technologist
              </span>
              .
            </motion.p>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-12 max-w-3xl leading-relaxed"
            >
              I mix design, tech, and innovation to create experiences that look good and work even better.
              From smart devices and AI models to modern web experiences — I build things that move.
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
                  className="group bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 border-0 text-lg px-8 py-6 rounded-2xl text-white shadow-lg"
                  onClick={() => smoothScrollTo('work')}
                >
                  Explore My Work
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
                  onClick={() => smoothScrollTo('contact')}
                >
                  Get in Touch
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Glass Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0, -5, 0] 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/3 right-20 hidden lg:block"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-xl backdrop-blur-sm" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            x: [0, -10, 0] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1 
          }}
          className="absolute bottom-1/3 left-20 hidden lg:block"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-pink-200/40 to-yellow-200/40 rounded-full blur-xl backdrop-blur-sm" />
        </motion.div>
      </motion.section>

      {/* What I Do Section */}
      <motion.section 
        id="work" 
        ref={workRef}
        className="py-20 px-6 relative"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={workIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              What I Do
            </h2>
          </motion.div>
          
          <motion.div
            initial="initial"
            animate={workIsInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Code,
                emoji: "🚀",
                title: "Engineering Projects",
                description: "Hardware. Software. Systems. I break things down and rebuild them better.",
                subtitle: "Real-world tech, real-world impact.",
                gradient: "from-blue-100/60 to-cyan-100/60",
                iconGradient: "from-blue-600 to-cyan-600",
                borderGradient: "from-blue-200 to-cyan-200"
              },
              {
                icon: Brain,
                emoji: "🧠",
                title: "AI + ML Experiments",
                description: "Training my own LLMs. Building NuckAi. Making machines think with purpose.",
                gradient: "from-purple-100/60 to-pink-100/60",
                iconGradient: "from-purple-600 to-pink-600",
                borderGradient: "from-purple-200 to-pink-200"
              },
              {
                icon: Palette,
                emoji: "🌐",
                title: "Design-Forward Development",
                description: "Clean interfaces. Bold interactions. Inspired by the future, built for today.",
                gradient: "from-emerald-100/60 to-teal-100/60",
                iconGradient: "from-emerald-600 to-teal-600",
                borderGradient: "from-emerald-200 to-teal-200"
              }
            ].map((item, i) => (
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
                <Card className={`h-full border-gray-200/50 bg-gradient-to-br ${item.gradient} backdrop-blur-xl hover:border-gray-300/60 transition-all duration-500 transform-gpu shadow-lg hover:shadow-xl`}>
                  <CardContent className="p-8">
                    <motion.div 
                      className="mb-8"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300 border border-gray-200/30`}>
                        <item.icon className={`h-7 w-7 bg-gradient-to-br ${item.iconGradient} bg-clip-text text-transparent`} />
                      </div>
                      <h3 className="text-xl mb-4 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text transition-all duration-300">
                        {item.emoji} {item.title}
                      </h3>
                    </motion.div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    {item.subtitle && (
                      <p className={`text-sm bg-gradient-to-r ${item.iconGradient} bg-clip-text text-transparent font-medium`}>
                        {item.subtitle}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        ref={aboutRef}
        className="py-20 px-6 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            animate={aboutIsInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={slideInLeft}>
              <h2 className="text-4xl md:text-5xl mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Built Different, Always Learning
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={aboutIsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  I don't just follow trends — I build what's next.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={aboutIsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Currently studying engineering in Poland, leading student events, building a DIY Bluetooth speaker that punches louder than Bose, and training Nuck — an AI assistant built from scratch.
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
                    <h4 className="mb-6 text-xl text-gray-900">Current Focus</h4>
                    <div className="space-y-4">
                      {[
                        { label: "Engineering Studies", badge: "Poland", color: "from-blue-500 to-blue-700" },
                        { label: "DIY Bluetooth Speaker", badge: "Building", color: "from-green-500 to-green-700" },
                        { label: "NuckAi Development", badge: "Training", color: "from-purple-500 to-purple-700" },
                        { label: "Student Events", badge: "Leading", color: "from-orange-500 to-orange-700" }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={aboutIsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                          className="flex items-center justify-between group hover:bg-gray-50/60 p-3 rounded-lg transition-colors"
                        >
                          <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                            {item.label}
                          </span>
                          <Badge className={`bg-gradient-to-r ${item.color} border-0 text-white shadow-sm`}>
                            {item.badge}
                          </Badge>
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

      {/* Projects Section */}
      <motion.section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A selection of my latest work across engineering, AI, and design.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "NuckAi",
                description: "AI assistant built from scratch with custom LLM training and purpose-driven design.",
                icon: Brain,
                badge: "AI/ML",
                gradient: "from-purple-100/60 to-pink-100/60",
                iconColor: "text-purple-600",
                clickable: true,
                onClick: navigateToNuckAI
              },
              {
                title: "DIY Bluetooth Speaker",
                description: "High-quality Bluetooth speaker that delivers sound louder and clearer than premium brands.",
                icon: Code,
                badge: "Hardware",
                gradient: "from-blue-100/60 to-cyan-100/60",
                iconColor: "text-blue-600"
              },
              {
                title: "More Projects Coming",
                description: "Always building something new. Check back soon for updates.",
                icon: ArrowRight,
                badge: "Coming Soon",
                gradient: "from-emerald-100/60 to-teal-100/60",
                iconColor: "text-emerald-600",
                dashed: true
              }
            ].map((project, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: project.dashed ? 0 : 5,
                  z: 50
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group cursor-pointer"
                onClick={project.onClick}
              >
                <Card className={`h-full border-gray-200/50 bg-gradient-to-br ${project.gradient} backdrop-blur-xl hover:border-gray-300/60 transition-all duration-500 shadow-lg hover:shadow-xl ${project.dashed ? 'border-dashed border-gray-300' : ''} ${project.clickable ? 'hover:border-purple-300/60' : ''}`}>
                  <CardContent className="p-8">
                    <motion.div 
                      className={`aspect-video rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${project.gradient} border border-gray-200/30`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <project.icon className={`h-12 w-12 ${project.iconColor}`} />
                    </motion.div>
                    <h3 className="text-xl mb-4 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className={project.dashed ? "border-gray-300 bg-gray-50/60 text-gray-700 backdrop-blur-sm" : "bg-gradient-to-r from-gray-600 to-gray-800 border-0 text-white shadow-sm"}>
                        {project.badge}
                      </Badge>
                      {!project.dashed && (
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ExternalLink className="h-4 w-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-20 px-6 bg-gradient-to-br from-white/80 to-gray-100/80 backdrop-blur-xl relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-purple-100/30 to-pink-100/30 animate-gradient-x" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Let's Create Something Dope.
            </h2>
            <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              Whether you're here to check out my work or pitch the next big thing — you're in the right place.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 border-0 text-lg px-8 py-6 rounded-2xl text-white shadow-lg"
                onClick={() => smoothScrollTo('work')}
              >
                <ArrowRight className="mr-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Explore My Work
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-300 hover:border-gray-400 bg-white/60 hover:bg-white/80 text-gray-700 hover:text-gray-900 text-lg px-8 py-6 rounded-2xl backdrop-blur-sm shadow-md"
              >
                <Mail className="mr-3 h-5 w-5" />
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>

          <Separator className="my-12 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: Github, label: "GitHub" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Mail, label: "Email" }
            ].map((social, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="w-14 h-14 rounded-full hover:bg-gray-100/80 border border-gray-200/50 hover:border-gray-300/60 transition-all duration-300 backdrop-blur-sm"
                >
                  <social.icon className="h-6 w-6 text-gray-600 hover:text-gray-900 transition-colors" />
                </Button>
              </motion.div>
            ))}
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
              © 2025 Golden Kalala. Built with passion and code.
            </p>
            <p className="text-gray-600 bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
              Engineering student in Poland
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}