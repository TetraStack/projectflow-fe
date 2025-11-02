import React from "react";
import type {Route} from "./+types/home";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Link} from "react-router";
import {motion} from "framer-motion";
import {
  CheckCircle,
  Users,
  Calendar,
  BarChart3,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Star,
  ChevronRight,
  Target,
  Rocket,
  Globe,
  MessageSquare,
  FileText,
  TrendingUp,
  Award,
  Headphones,
  X,
  Kanban,
  SquareKanban,
} from "lucide-react";

import {ModeToggle} from "@/components/mode-toggle";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "ProjectFlow - Streamline Your Project Management"},
    {
      name: "description",
      content:
        "The ultimate project management platform for teams who want to get things done efficiently.",
    },
  ];
}

const Homepage = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Team Collaboration",
      description:
        "Work seamlessly with your team members in real-time with advanced collaboration tools",
    },
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      title: "Smart Scheduling",
      description:
        "AI-powered task scheduling and deadline management that adapts to your workflow",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      title: "Analytics & Insights",
      description:
        "Detailed reports and analytics to track progress and optimize team performance",
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure & Private",
      description:
        "Enterprise-grade security with end-to-end encryption for your sensitive data",
    },
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Goal Tracking",
      description:
        "Set and track objectives with milestone management and progress visualization",
    },
    {
      icon: <Rocket className="w-6 h-6 text-primary" />,
      title: "Fast Deployment",
      description:
        "Quick setup and onboarding to get your team productive in minutes",
    },
  ];

  const additionalFeatures = [
    {
      icon: <Globe className="w-5 h-5 text-primary" />,
      title: "Global Access",
      description:
        "Access your projects from anywhere in the world with cloud synchronization",
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-primary" />,
      title: "Real-time Chat",
      description: "Built-in messaging system for instant team communication",
    },
    {
      icon: <FileText className="w-5 h-5 text-primary" />,
      title: "Document Management",
      description:
        "Centralized document storage with version control and sharing",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-primary" />,
      title: "Performance Metrics",
      description:
        "Track team productivity with detailed performance analytics",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 5 team members",
        "3 projects",
        "Basic task management",
        "Email support",
        "Mobile apps",
      ],
      popular: false,
      buttonText: "Get Started",
    },
    {
      name: "Professional",
      price: "$12",
      period: "/user/month",
      description: "Ideal for growing teams and businesses",
      features: [
        "Unlimited team members",
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
        "Time tracking",
        "Advanced security",
      ],
      popular: true,
      buttonText: "Start Free Trial",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Built for large organizations",
      features: [
        "Everything in Professional",
        "SSO & SAML",
        "Advanced permissions",
        "Dedicated support",
        "Custom workflows",
        "API access",
        "Compliance reports",
      ],
      popular: false,
      buttonText: "Contact Sales",
    },
  ];

  const testimonials = [
    {
      quote:
        "ProjectFlow transformed how our team collaborates. We've seen a 40% increase in productivity since switching.",
      author: "Sarah Johnson",
      role: "VP of Engineering",
      company: "TechCorp",
    },
    {
      quote:
        "The best project management tool we've used. The interface is intuitive and the features are comprehensive.",
      author: "Michael Chen",
      role: "Product Manager",
      company: "StartupXYZ",
    },
    {
      quote:
        "Customer support is outstanding. They helped us migrate our entire workflow in just two days.",
      author: "Emily Davis",
      role: "Operations Director",
      company: "GlobalTech",
    },
  ];

  const stats = [
    {value: "50K+", label: "Active Users"},
    {value: "99.9%", label: "Uptime"},
    {value: "24/7", label: "Support"},
    {value: "4.9★", label: "Rating"},
  ];

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {y: 20, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const heroVariants = {
    hidden: {scale: 0.8, opacity: 0},
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{y: -50, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.6}}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <SquareKanban className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">ProjectFlow</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>

            <ModeToggle />
          </div>
        </div>
      </motion.header>

      <section className="container mx-auto px-4 py-20">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary border-primary/20"
          >
            <Star className="w-3 h-3 mr-1" />
            Trusted by 50,000+ teams
          </Badge>

          <motion.h1
            className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
            initial={{y: 30, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.4, duration: 0.8}}
          >
            Streamline Your
            <span className="text-primary block">Project Management</span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{y: 30, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.6, duration: 0.8}}
          >
            The ultimate platform for teams who want to collaborate efficiently,
            track progress seamlessly, and deliver projects on time.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{y: 30, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.8, duration: 0.8}}
          >
            <Link to="/sign-up">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className=" px-4 py-20 bg-muted/30">
        <div className="container mx-auto ">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.3}}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold text-foreground mb-6"
            >
              Everything you need to
              <span className="text-primary block">succeed together</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Powerful features designed to help your team collaborate better
              and achieve more.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.3}}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: {type: "spring" as const, stiffness: 300},
                }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.3}}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Powerful features that scale
              <span className="text-primary block">with your business</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From startups to enterprises, ProjectFlow adapts to your needs
              with advanced capabilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start space-x-4 p-6 rounded-lg border bg-card hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* testimonials */}
      {/* <section className="px-4 py-20 bg-muted/30">
        <div className="container mx-auto">
          {" "}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.3}}
            className="max-w-6xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Loved by teams
                <span className="text-primary block">around the world</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See what our customers say about their experience with
                ProjectFlow.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    transition: {type: "spring" as const, stiffness: 300},
                  }}
                >
                  <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-primary text-primary"
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="text-left">
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* price table */}
      {/* <section className="container mx-auto px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.3}}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/10 text-primary border-primary/20"
            >
              <Award className="w-3 h-3 mr-1" />
              Simple, transparent pricing
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Choose the plan that's
              <span className="text-primary block">right for your team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: plan.popular ? 1.02 : 1.05,
                  transition: {type: "spring" as const, stiffness: 300},
                }}
                className="relative"
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground border-0 px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                <Card
                  className={`h-full border-2 ${
                    plan.popular
                      ? "border-primary shadow-lg"
                      : "border-border hover:border-primary/50"
                  } transition-colors duration-300`}
                >
                  <CardHeader className="text-center pb-8 pt-8">
                    <CardTitle className="text-2xl font-bold">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-2">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-6">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-muted-foreground ml-1">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={plan.name === "Enterprise" ? "/contact" : "/sign-up"}
                    >
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                            : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                        }`}
                        size="lg"
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section> */}

      {/* cta */}
      <section className=" px-4 py-20 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{scale: 0.9, opacity: 0}}
            whileInView={{scale: 1, opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 0.6}}
          >
            <Card className="max-w-4xl mx-auto  border-1 border-primary">
              <CardContent className="p-12 text-center">
                <motion.div
                  initial={{y: 20, opacity: 0}}
                  whileInView={{y: 0, opacity: 1}}
                  viewport={{once: true}}
                  transition={{delay: 0.2, duration: 0.6}}
                >
                  <Rocket className="w-12 h-12 mx-auto mb-6 " />
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to transform your workflow?
                  </h3>
                  <p className="text-xl  mb-8 max-w-2xl mx-auto">
                    Join thousands of teams already using ProjectFlow to boost
                    productivity and achieve their goals faster.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/sign-up">
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-white text-primary hover:bg-gray-50 px-8 py-6 text-lg"
                      >
                        Start Your Free Trial
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <footer className="border-t ">
        <div className="container mx-auto  py-16">
          <div className="mx-auto">
            <div className="flex justify-between gap-8 mb-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <SquareKanban className="w-6 h-6 text-primary" />
                  <span className="font-bold text-xl">ProjectFlow</span>
                </div>
                <p className="text-muted-foreground mb-6 max-w-md">
                  The ultimate project management platform that helps teams
                  collaborate efficiently and deliver projects on time.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-8 flex flex-col md:flex-row justify-center items-center ">
              <div className="text-sm text-muted-foreground">
                © 2025 ProjectFlow. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
