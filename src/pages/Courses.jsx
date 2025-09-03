import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Star, CheckCircle, ArrowRight } from 'lucide-react';

const Courses = () => {
  const boards = [
    {
      name: 'CBSE Board',
      description: 'Central Board of Secondary Education curriculum with comprehensive coverage',
      classes: 'PG to Class 12',
      subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'],
      features: ['NCERT Based', 'Board Exam Prep', 'Regular Tests', 'Doubt Sessions'],
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'ICSE Board',
      description: 'Indian Certificate of Secondary Education with detailed subject coverage',
      classes: 'PG to Class 12',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
      features: ['Comprehensive Study', 'Practical Focus', 'Project Guidance', 'Mock Exams'],
      color: 'from-green-600 to-green-700'
    },
    {
      name: 'UP Board',
      description: 'Uttar Pradesh Board curriculum with state-specific preparation',
      classes: 'PG to Class 12',
      subjects: ['Mathematics', 'Science', 'Hindi', 'English', 'Social Science'],
      features: ['State Syllabus', 'Hindi Medium', 'Local Expertise', 'Board Pattern'],
      color: 'from-purple-600 to-purple-700'
    }
  ];

  const classLevels = [
    {
      level: 'Pre-Primary (PG)',
      age: '3-4 years',
      focus: 'Foundation building through play-based learning',
      subjects: ['Basic Numbers', 'Alphabets', 'Colors & Shapes', 'Rhymes & Stories'],
      icon: '🎨'
    },
    {
      level: 'Primary (1-5)',
      age: '5-10 years',
      focus: 'Core subject development with interactive learning',
      subjects: ['Mathematics', 'English', 'Hindi', 'EVS', 'General Knowledge'],
      icon: '📚'
    },
    {
      level: 'Middle School (6-8)',
      age: '11-13 years',
      focus: 'Subject specialization and concept strengthening',
      subjects: ['Mathematics', 'Science', 'Social Studies', 'English', 'Hindi'],
      icon: '🔬'
    },
    {
      level: 'Secondary (9-10)',
      age: '14-15 years',
      focus: 'Board exam preparation and career guidance',
      subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
      icon: '🎓'
    },
    {
      level: 'Senior Secondary (11-12)',
      age: '16-17 years',
      focus: 'Specialized streams and competitive exam prep',
      subjects: ['PCM', 'PCB', 'Commerce', 'Arts', 'English'],
      icon: '🚀'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Courses
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive education programs designed for CBSE, ICSE & UP Board students 
              from Pre-Primary to Class 12, ensuring academic excellence at every level.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Board-wise Courses */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Board-wise Programs
            </h2>
            <p className="text-xl text-gray-600">
              Specialized coaching for different educational boards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {boards.map((board, index) => (
              <motion.div
                key={board.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${board.color}`} />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{board.name}</h3>
                  <p className="text-gray-600 mb-4">{board.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-gray-700">{board.classes}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Subjects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {board.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                    <ul className="space-y-2">
                      {board.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 bg-gradient-to-r ${board.color} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center group`}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Levels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Class-wise Programs
            </h2>
            <p className="text-xl text-gray-600">
              Age-appropriate learning programs from Pre-Primary to Senior Secondary
            </p>
          </motion.div>

          <div className="space-y-8">
            {classLevels.map((classLevel, index) => (
              <motion.div
                key={classLevel.level}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                  <div className="text-center lg:text-left">
                    <div className="text-4xl mb-2">{classLevel.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{classLevel.level}</h3>
                    <p className="text-blue-600 font-medium">{classLevel.age}</p>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <p className="text-gray-600 mb-4">{classLevel.focus}</p>
                    <div className="flex flex-wrap gap-2">
                      {classLevel.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-center lg:text-right">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Enroll Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Courses?
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive features designed for student success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Comprehensive Curriculum',
                description: 'Complete syllabus coverage with detailed study materials'
              },
              {
                icon: Clock,
                title: 'Flexible Timings',
                description: 'Morning and evening batches to suit your schedule'
              },
              {
                icon: Users,
                title: 'Small Batch Size',
                description: 'Limited students per batch for personalized attention'
              },
              {
                icon: Star,
                title: 'Expert Faculty',
                description: 'Experienced teachers with proven track records'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Excel in Your Studies?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join RL Classes and experience the difference quality education makes
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:shadow-lg transition-all duration-300 group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Courses;