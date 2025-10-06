"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-sora" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 h-[600px] w-[600px] rounded-full bg-brand-cyan/30 blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/4 h-[600px] w-[600px] rounded-full bg-brand-magenta/30 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        {/* Logo & Heading */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-2 text-5xl font-bold text-white">
            <span className="text-dream">Dream</span>
          </h1>
          <h2 className="text-machine text-xl text-white/80">Generator</h2>
          <p className="mt-3 text-sm text-white/60">Start creating with AI today</p>
        </motion.div>

        {/* Clerk Sign Up Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "glass-hover rounded-3xl shadow-glow px-8 py-10",
                headerTitle: "text-white text-2xl font-semibold",
                headerSubtitle: "text-white/70",
                socialButtonsBlockButton:
                  "bg-white hover:bg-white/90 text-black rounded-full font-medium py-3 border-0",
                socialButtonsBlockButtonText: "font-medium",
                formFieldLabel: "text-white/90",
                formFieldInput:
                  "bg-white/10 border-white/20 text-white rounded-xl focus:ring-2 focus:ring-white/40 placeholder:text-white/40",
                footerActionLink: "text-white/80 hover:text-white",
                identityPreviewText: "text-white",
                formButtonPrimary:
                  "bg-white hover:bg-white/90 text-black rounded-xl font-semibold",
                footer: "hidden",
              },
            }}
            signInFallbackRedirectUrl="/dashboard"
            fallbackRedirectUrl="/dashboard"
          />
        </motion.div>

        {/* Decorative Cards Collage */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-4 pb-6 opacity-60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            "bg-gradient-card-cyan",
            "bg-gradient-card-purple",
            "bg-gradient-card-gold",
            "bg-gradient-card-magenta",
            "bg-gradient-card-purple",
          ].map((gradient, i) => (
            <div
              key={i}
              className={`h-32 w-24 rounded-2xl ${gradient} opacity-70 shadow-lg`}
              style={{
                transform: `rotate(${(i - 2) * 5}deg) translateY(${Math.abs(i - 2) * 10}px)`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between border-t border-white/10 bg-black/40 px-6 py-4 backdrop-blur-sm">
        <div className="text-sm text-white/80">
          <Link href="/" className="hover:text-white transition-colors">
            GGW.ai
          </Link>
        </div>
        <div className="text-xs text-white/60">Secure authentication by Clerk</div>
      </div>
    </div>
  );
}
