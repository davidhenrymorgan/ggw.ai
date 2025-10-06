"use client";

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroSection() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Floating Navigation */}
            <nav className="absolute top-0 right-0 z-50 p-6 md:p-8">
                <div className="flex items-center gap-6 text-sm font-medium text-white/80">
                    <Link href="/explore" className="hover:text-white transition-colors">
                        Explore
                    </Link>
                    <Link href="/dashboard" className="hover:text-white transition-colors">
                        Dashboard
                    </Link>
                    <Link href="#pricing" className="hover:text-white transition-colors">
                        Pricing
                    </Link>
                    <Link href="/sign-in">
                        <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                            Sign In
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Background - Gradient */}
            <div className="absolute inset-0 bg-gradient-hero" />

            {/* Background Image/Video Placeholder */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                {/* Placeholder for future video/image */}
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_oklch(0.15_0.1_264)_0%,_transparent_70%)]" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Title */}
                        <h1 className="text-hero mb-6 text-white">
                            <span className="text-dream block">Dream</span>
                            <span className="text-machine block mt-2">Generator</span>
                        </h1>

                        {/* Description */}
                        <motion.p
                            className="mx-auto mb-8 max-w-2xl text-lg text-white/70 md:text-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Create stunning AI-generated images and videos from your imagination.
                            Advanced models, instant results, limitless creativity.
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Link href="/dashboard/generate">
                                <Button
                                    size="lg"
                                    className="rounded-full bg-white px-8 py-6 text-base font-semibold text-black hover:bg-white/90"
                                >
                                    Try Now in Dream Generator
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Brand Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between border-t border-white/10 bg-black/40 px-6 py-4 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="text-lg font-semibold text-white">GGW.ai</div>
                </div>
                <div className="text-sm text-white/60">Powered by Next.js + Convex</div>
            </div>
        </div>
    )
}