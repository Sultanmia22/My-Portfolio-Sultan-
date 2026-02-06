"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"
import emailjs from 'emailjs-com';
import {
  Github,
  Linkedin,
  Mail,
  Send,
  Phone,
} from "lucide-react"
import { useForm } from "react-hook-form"

// --- AnimatedSection Component ---
function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// --- Main ContactSection Component ---
const ContactSection = () => {

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()

  const handleContacat = async (data) => {
   
    const serviceId = 'service_ap2adtt';
    const templeteId = 'template_ipxs41c';
    const publicKey = 'Aikocmm8XJFxTbV-p';

    const templateParams = {
      name: data.name,
      email: data.email,
      message: data.message,
      to_name: 'Sultan Mia'
    }

    try {
      // EmailJS দিয়ে মেইল পাঠানো হচ্ছে
      const res = await emailjs.send(serviceId, templeteId, templateParams, publicKey);

      console.log('Email sent successfully!', res.text);


      reset();

      // অপশনাল: ইউজারকে একটি সফল মেসেজ দেখাতে পারেন
      alert("Message sent successfully!");

    } catch (error) {
      // যদি কোনো এরর হয়
      console.error('Failed to send email:', error);
      alert("Failed to send message. Please try again.");
    }

  }

  return (
    <div>
      <section id="contact" className="py-24 px-4 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-30"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary mb-4 tracking-wider uppercase">Get In Touch</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Let's <span className="text-primary">Connect</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or just want to chat? Feel free to reach out!
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side: Contact Info */}
            <AnimatedSection delay={0.1} className="space-y-6">
              <motion.div whileHover={{ x: 5 }}>
                <Card className="p-6 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <a href="mailto:sultanmia5732@gmail.com" className="font-semibold hover:text-primary transition-colors">
                        sultanmia5732@gmail.com
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} transition={{ delay: 0.1 }}>
                <Card className="p-6 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-chart-1/10">
                      <Phone className="w-6 h-6 text-chart-1" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <a href="tel:+8801746931945" className="font-semibold hover:text-primary transition-colors">
                        +8801746931945
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <div className="flex gap-3 pt-4">
                <motion.a
                  href="https://github.com/Sultanmia22"
                  target="_blank"
                  className="flex-1 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group"
                >
                  <Github className="w-5 h-5" />
                  <span className="font-medium">GitHub</span>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/devmdsultanmia/"
                  target="_blank"
                  className="flex-1 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 group"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="font-medium">LinkedIn</span>
                </motion.a>
              </div>
            </AnimatedSection>

            {/* Right Side: Form */}
            <AnimatedSection delay={0.2}>
              <Card className="p-8">
                <form onSubmit={handleSubmit(handleContacat)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      {...register('name', { required: 'Name is required' })}
                      id="name"
                      type="text"
                      placeholder="Your name"

                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      {...register('email', { required: 'email is required' })}
                      id="email"
                      type="email"
                      placeholder="your@email.com"

                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      {...register('message', { required: 'message is required' })}
                      id="message"
                      placeholder="Your message..."

                      required
                      className="w-full min-h-[150px] px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full group" >

                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>

                  </Button>
                </form>
              </Card>
            </AnimatedSection>
          </div>

        </div>
      </section>
    </div>
  )
}

export default ContactSection