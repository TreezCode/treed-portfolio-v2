'use client'

import { Card } from '@/components/ui'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { services } from '@/data'

export function About() {
  return (
    <section id="about" className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-accent-primary text-sm font-semibold uppercase tracking-wider mb-2">
              Introduction
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              I'm a passionate full-stack developer with expertise in building modern web
              applications. I specialize in React, Next.js, and Three.js, creating immersive 3D
              experiences and intuitive user interfaces.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <Card
                variant="glass"
                className="group hover:scale-105 transition-transform duration-300 cursor-pointer h-full"
              >
                <div className="text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-text-primary">{service.title}</h3>
                  <p className="text-text-secondary text-sm">{service.description}</p>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
