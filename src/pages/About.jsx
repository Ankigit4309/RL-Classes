

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Target, Heart, Lightbulb, Users, Award, BookOpen, Sparkles, TrendingUp, 
  Phone, Calendar, GraduationCap, Users2, Building, Trophy, Star,
  CheckCircle, ArrowRight, Mail, MapPin, Clock
} from 'lucide-react';

// Enhanced animation variants with better performance
const animationVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: i * 0.1,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    })
  },
  slideIn: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
};

// Professional loading skeleton
const SkeletonCard = () => (
  <div className="bg-white p-8 rounded-2xl shadow-lg animate-pulse">
    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6"></div>
    <div className="h-6 bg-gray-200 rounded mb-3 mx-auto w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

// Enhanced Value Card with better accessibility
const ValueCard = React.memo(({ icon: Icon, title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2, margin: "50px" });

  return (
    <motion.div
      ref={ref}
      variants={animationVariants.fadeUp}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 relative overflow-hidden"
      role="article"
      aria-labelledby={`value-title-${index}`}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <motion.div 
          className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.3 }
          }}
        >
          <Icon className="w-8 h-8 text-white" aria-hidden="true" />
        </motion.div>
        
        <h3 
          id={`value-title-${index}`}
          className="text-xl font-bold text-gray-900 mb-4 text-center"
        >
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed text-center text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
});

// Enhanced Achievement Card with better animation
const AchievementCard = React.memo(({ number, label, description, index }) => {
  const [count, setCount] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const animateCounter = useCallback(() => {
    if (isAnimated) return;
    
    const target = parseInt(number.replace(/\D/g, ''));
    if (isNaN(target)) return;
    
    setIsAnimated(true);
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
  }, [number, isAnimated]);

  useEffect(() => {
    if (isInView) {
      const delay = setTimeout(animateCounter, index * 200);
      return () => clearTimeout(delay);
    }
  }, [isInView, animateCounter, index]);

  const displayNumber = useMemo(() => {
    if (number.includes('%') || number.includes('K') || number.includes('+')) {
      return number;
    }
    return count + (number.includes('+') ? '+' : '');
  }, [count, number]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.6, 
          delay: index * 0.1
        }
      } : {}}
      className="text-center text-white bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
    >
      <div className="text-4xl md:text-5xl font-bold mb-3 text-white">
        {displayNumber}
      </div>
      <div className="text-lg font-semibold mb-2 text-white/90">
        {label}
      </div>
      <p className="text-sm text-white/75">{description}</p>
    </motion.div>
  );
});

// Professional floating elements
const FloatingElement = ({ children, className, delay = 0, duration = 6 }) => (
  <motion.div
    animate={{
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      rotate: [-1, 1, -1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Enhanced testimonial section
const TestimonialCard = ({ quote, author, role, rating }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-center mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-700 mb-4 italic">"{quote}"</p>
    <div>
      <div className="font-semibold text-gray-900">{author}</div>
      <div className="text-sm text-gray-500">{role}</div>
    </div>
  </motion.div>
);

const About = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  
  // Memoized data to improve performance
  const values = useMemo(() => [
    {
      icon: Target,
      title: 'Academic Excellence',
      description: 'Dedicated to achieving outstanding academic results through personalized attention and proven teaching methodologies'
    },
    {
      icon: Heart,
      title: 'Student-Centered Approach',
      description: 'Every student matters. We provide individualized support to help each student reach their unique potential'
    },
    {
      icon: Lightbulb,
      title: 'Innovative Teaching',
      description: 'Blending traditional wisdom with modern educational technology for optimal learning experiences'
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Building a supportive community through peer learning, mentorship, and collaborative academic growth'
    }
  ], []);

  const achievements = useMemo(() => [
    { 
      number: '20+', 
      label: 'Years of Excellence', 
      description: 'Trusted education partner since 1999' 
    },
    { 
      number: '200+', 
      label: 'Successful Students', 
      description: 'Alumni excelling in various fields' 
    },
    
    { 
      number: '5+', 
      label: 'Expert Faculty', 
      description: 'Qualified and experienced educators' 
    },
    { 
      number: '98%', 
      label: 'Success Rate', 
      description: 'Consistent merit rank holders' 
    },
    { 
      number: '15+', 
      label: 'Subjects Offered', 
      description: 'Comprehensive curriculum coverage' 
    }
  ], []);

  const milestones = useMemo(() => [
    {
      year: '1999',
      title: 'Foundation',
      description: 'Started with 12 students and a vision for quality education',
      icon: Building
    },
    {
      year: '2005',
      title: 'First Achievers',
      description: 'Our students began securing top ranks in board examinations',
      icon: Trophy
    },
    {
      year: '2010',
      title: 'Multi-Board Expansion',
      description: 'Extended services to CBSE, ICSE, and UP Board students',
      icon: GraduationCap
    },
    {
      year: '2020',
      title: 'Digital Innovation',
      description: 'Integrated advanced technology while maintaining teaching excellence',
      icon: Lightbulb
    }
  ], []);

  const testimonials = useMemo(() => [
    {
      quote: "RL Classes transformed my academic journey. The personalized attention and excellent faculty helped me achieve my goals.",
      author: "Priya Sharma",
      role: "CBSE Topper 2023",
      rating: 5
    },
    {
      quote: "The systematic approach and regular assessments at RL Classes prepared me thoroughly for competitive exams.",
      author: "Rahul Verma",
      role: "Engineering Student",
      rating: 5
    },
    {
      quote: "Best decision for my daughter's education. The faculty is supportive and results speak for themselves.",
      author: "Mrs. Anjali Gupta",
      role: "Parent",
      rating: 5
    }
  ], []);

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Contact Header */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-3 px-4"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
       
      </motion.div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 overflow-hidden">
        {/* Background Elements */}
        <FloatingElement className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20" delay={0} />
        <FloatingElement className="absolute top-40 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-30" delay={2} />
        <FloatingElement className="absolute bottom-20 left-1/4 w-20 h-20 bg-pink-100 rounded-full opacity-25" delay={4} />
        
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          style={{ y: heroY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About
              <motion.span 
                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                RL Classes
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Empowering students for 25+ years with excellence in education. 
              Our commitment to drawing the best out of every student has earned the trust of thousands of families.
            </motion.p>

            {/* Call to action buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={animationVariants.slideIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Our Journey of Excellence
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p>
                    <strong className="text-blue-600">25 years of educational excellence</strong> - From humble beginnings 
                    with just 12 students in 1999 to teaching thousands today, under the visionary leadership of 
                    <strong> Mr. Ram Lakhan</strong>, our founder and principal.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p>
                    Beyond academics, we focus on <strong>holistic development</strong> through guest lectures, 
                    seminars, and workshops on time management, stress management, study skills, and career guidance.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p>
                    Our faculty engages in <strong>continuous professional development</strong> through regular 
                    brainstorming sessions, performance monitoring, and collaborative planning to ensure 
                    the most effective teaching methods.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p>
                    <em className="text-blue-600">"Success is planned"</em> - We conduct systematic test series 
                    before Board/University exams to equip students with proven techniques for exceptional performance.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={animationVariants.slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, threshold: 0.3 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/students-future.jpg"
                  alt="Students engaged in collaborative learning at RL Classes"
                  className="w-full h-96 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Stats overlay */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={animationVariants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The fundamental principles that guide our educational mission and shape every interaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ValueCard 
                key={value.title} 
                icon={value.icon} 
                title={value.title} 
                description={value.description} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={animationVariants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Achievements That Inspire
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              These numbers represent more than statistics—they reflect our unwavering commitment 
              to educational excellence and the success of every student who walks through our doors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <AchievementCard 
                key={achievement.label}
                number={achievement.number}
                label={achievement.label}
                description={achievement.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
     <section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Title */}
    <motion.div
      variants={animationVariants.fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Milestones of Growth
      </h2>
      <p className="text-xl text-gray-600">
        Key moments that have shaped RL Classes into the educational institution it is today
      </p>
    </motion.div>

    {/* Timeline Container */}
    <div className="relative">
      {/* Vertical line in center */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

      {milestones.map((milestone, index) => (
        <motion.div
          key={milestone.year}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
          className={`relative mb-16 flex flex-col md:flex-row ${
            index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
          }`}
        >
          <div
            className={`relative bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full md:w-1/2 ${
              index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
            }`}
          >
            {/* Icon Bubble */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10"
              style={{
                [index % 2 === 0 ? 'right' : 'left']: '-1.75rem',
              }}
            >
              <milestone.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>

            {/* Milestone Content */}
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
              {milestone.year}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {milestone.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {milestone.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={animationVariants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our students and parents about their transformative journey with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={animationVariants.scale}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, threshold: 0.3 }}
          >
            <motion.div 
              className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl"
              whileHover={{ 
                rotate: 360,
                scale: 1.1,
                transition: { duration: 0.6 }
              }}
            >
              <BookOpen className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              To provide comprehensive, high-quality education that develops not just academic excellence, 
              but also critical thinking, creativity, leadership, and strong character. Through systematic 
              assessments and continuous feedback, we ensure every student achieves their greatest potential 
              and becomes a confident contributor to society.
            </p>

            <motion.div
              className="inline-flex items-center gap-2 text-blue-600 font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="w-6 h-6" />
              <span>Excellence is our standard</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful students who have transformed their academic journey with RL Classes
            </p>
           
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;