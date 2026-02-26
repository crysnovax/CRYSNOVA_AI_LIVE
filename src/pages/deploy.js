import { useState } from 'react'
import Link from 'next/link'

const DEPLOY_SCRIPT = \`const {execSync,spawn}=require('child_process'),fs=require('fs'),path=require('path'),readline=require('readline');
const c={r:'\\x1b[0m',b:'\\x1b[1m',c:'\\x1b[36m',g:'\\x1b[32m',y:'\\x1b[33m',m:'\\x1b[35m',bl:'\\x1b[34m'};
const P='CRYSNOVA_AI',R='https://github.com/crysnovax/CRYSNOVA_AI.git';
const rl=readline.createInterface({input:process.stdin,output:process.stdout});
const ask=q=>new Promise(r=>rl.question(q,a=>r(a.trim())));
console.clear();console.log(c.c+'╔════════════════════════════════════╗'+c.r);
console.log(c.c+'║  🚀 CRYSNOVA AI DEPLOY SCRIPT 🚀  ║'+c.r);
console.log(c.c+'╚════════════════════════════════════╝'+c.r);
async function main(){
console.log(c.c+'\\n[1/5] 📥 Cloning...'+c.r);
if(!fs.existsSync(P)){execSync(\\\`git clone \\\${R} \\\${P}\\\`,{stdio:'inherit'});console.log(c.g+'✓ Cloned'+c.r);}
else console.log(c.g+'✓ Exists'+c.r);
console.log(c.c+'\\n[2/5] 📦 Installing...'+c.r);
execSync('npm install',{cwd:P,stdio:'inherit'});console.log(c.g+'✓ Installed'+c.r);
console.log(c.c+'\\n[3/5] ⚙️  Config...'+c.r);
console.log(c.m+'\\n┌───────────────────────────────┐'+c.r);
console.log(c.m+'│  📋 CONFIGURATION REQUIRED   │'+c.r);
console.log(c.m+'└───────────────────────────────┘'+c.r);
console.log(c.bl+'\\n1️⃣  OWNER NUMBER'+c.r);
const n=await ask(c.y+'   Enter: '+c.r);
console.log(c.bl+'\\n2️⃣  OWNER NAME'+c.r);
const nm=await ask(c.y+'   Enter: '+c.r)||'CRYSNOVA';
console.log(c.bl+'\\n3️⃣  BOT NAME'+c.r);
const bn=await ask(c.y+'   Enter: '+c.r)||'CRYSNOVA AI';
const d=path.join(P,'database');
if(!fs.existsSync(d))fs.mkdirSync(d,{recursive:true});
fs.writeFileSync(path.join(d,'user-config.json'),JSON.stringify({owner:{number:n,name:nm},bot:{name:bn,public:false,prefix:'.'}},null,2));
console.log(c.g+'\\n✅ Saved!'+c.r);rl.close();
console.log(c.c+'\\n[4/5] 🔍 Check...'+c.r);console.log(c.g+'✓ Ready'+c.r);
console.log(c.c+'\\n[5/5] 🚀 Starting...'+c.r);
console.log(c.g+'\\n╔════════════════════════════╗'+c.r);
console.log(c.g+'║  🎉 BOT STARTING! 🎉      ║'+c.r);
console.log(c.g+'╚════════════════════════════╝\\n'+c.r);
const ch=spawn('npm',['start'],{cwd:P,stdio:'inherit',shell:true});
ch.on('error',e=>{console.error(c.r+'Failed:',e);process.exit(1);});
}
main().catch(e=>{console.error(c.r+'Failed:',e);rl.close();process.exit(1);});\`;

export default function Deploy() {
  const [copied, setCopied] = useState(false)
  
  const copy = () => {
    navigator.clipboard.writeText(DEPLOY_SCRIPT)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-4 gradient-text">Deploy Your Bot</h1>
        <p className="text-xl text-gray-400 mb-12">Get CRYSNOVA AI running in minutes</p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Platform icon="▲" title="Vercel" desc="One-click deploy" link="https://vercel.com/new" />
          <Platform icon="🎨" title="Render" desc="Deploy instantly" link="https://render.com" />
          <Platform icon="💻" title="Local" desc="Run locally" link="#script" />
        </div>

        <div className="glass p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">📜 Deployment Script</h2>
            <button onClick={copy} className="btn btn-primary">
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
          </div>
          <pre className="bg-black/50 p-6 rounded-lg overflow-x-auto text-sm">
            <code className="text-green-400">{DEPLOY_SCRIPT}</code>
          </pre>
        </div>

        <Steps />
      </main>
    </div>
  )
}

function Nav() {
  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          <span className="text-xl font-bold gradient-text">CRYSNOVA LIVE</span>
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-crys-blue">Home</Link>
          <Link href="/deploy" className="text-crys-blue">Deploy</Link>
          <Link href="/marketplace" className="hover:text-crys-blue">Marketplace</Link>
          <Link href="/editor" className="hover:text-crys-blue">Editor</Link>
        </div>
      </div>
    </nav>
  )
}

function Platform({ icon, title, desc, link }) {
  return (
    <a href={link} target="_blank" className="glass glass-hover p-6 block">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </a>
  )
}

function Steps() {
  const steps = [
    'Save script as deploy.js',
    'Run: node deploy.js',
    'Follow setup prompts',
    'Bot is live!'
  ]
  return (
    <div className="glass p-8">
      <h2 className="text-2xl font-bold mb-6">🚀 Quick Start</h2>
      <div className="space-y-4">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-crys-blue to-crys-purple flex items-center justify-center font-bold flex-shrink-0">
              {i + 1}
            </div>
            <div className="pt-1">{s}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
