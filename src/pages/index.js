import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Features />
      <QuickStart />
      <Footer />
    </div>
  )
}

function Nav() {
  return (
    <nav className="glass sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          <span className="text-xl font-bold gradient-text">CRYSNOVA LIVE</span>
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-crys-blue transition">Home</Link>
          <Link href="/deploy" className="hover:text-crys-blue transition">Deploy</Link>
          <Link href="/marketplace" className="hover:text-crys-blue transition">Marketplace</Link>
          <Link href="/editor" className="hover:text-crys-blue transition">Editor</Link>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="inline-flex items-center gap-2 mb-4 glass px-4 py-2 rounded-full">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
        <span className="text-sm">CRYSNOVA AI • Online</span>
      </div>
      <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">CRYSNOVA AI</h1>
      <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
        The Ultimate WhatsApp Bot Platform. Deploy, Manage, and Extend Your Bot in Minutes.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link href="/deploy" className="btn btn-primary text-lg">🚀 Deploy Now</Link>
        <Link href="/marketplace" className="btn glass text-lg">🛒 Marketplace</Link>
      </div>
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <StatCard icon="👥" value="5,420" label="Active Users" />
        <StatCard icon="🔌" value="156" label="Plugins" />
        <StatCard icon="⚡" value="892" label="Deploys" />
      </div>
    </div>
  )
}

function StatCard({ icon, value, label }) {
  return (
    <div className="glass p-6 text-center glass-hover">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold gradient-text mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}

function Features() {
  const features = [
    { icon: '🎯', title: 'One-Click Deploy', desc: 'Deploy to Vercel/Render instantly' },
    { icon: '🔌', title: 'Plugin Marketplace', desc: '150+ ready-to-use plugins' },
    { icon: '✏️', title: 'Built-in Editor', desc: 'Create plugins in browser' },
    { icon: '🛡️', title: 'Auto-Moderation', desc: 'Anti-spam, anti-link protection' },
    { icon: '🤖', title: 'AI Powered', desc: 'Gemini & GPT integration' },
    { icon: '📊', title: 'Analytics', desc: 'Track usage and performance' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Powerful Features</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="glass p-6 glass-hover">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickStart() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="glass p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start?</h2>
        <p className="text-gray-400 mb-8">Get your bot running in less than 5 minutes</p>
        <Link href="/deploy" className="btn btn-primary text-lg">Start Deploying →</Link>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-4 gradient-text">CRYSNOVA</h3>
            <p className="text-gray-400 text-xs">Ultimate WhatsApp Bot Platform</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Links</h4>
            <div className="space-y-2">
              <Link href="/deploy" className="block hover:text-crys-blue">Deploy</Link>
              <Link href="/marketplace" className="block hover:text-crys-blue">Marketplace</Link>
              <Link href="/editor" className="block hover:text-crys-blue">Editor</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Community</h4>
            <div className="space-y-2">
              <a href="https://t.me/crysnovachannel" className="block hover:text-crys-blue">Telegram</a>
              <a href="https://whatsapp.com/channel/0029Vb6pe77K0IBn48HLKb38" className="block hover:text-crys-blue">WhatsApp</a>
              <a href="https://youtube.com/@crysnova" className="block hover:text-crys-blue">YouTube</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <div className="space-y-2">
              <a href="https://t.me/crysnovasupport" className="block hover:text-crys-blue">Help Center</a>
              <a href="https://github.com/crysnovax" className="block hover:text-crys-blue">GitHub</a>
              <a href="#" className="block hover:text-crys-blue">Contact</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-12 text-xs text-gray-500">
          © 2026 CRYSNOVA. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
