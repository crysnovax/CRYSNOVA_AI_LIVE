import {useState} from 'react'
import Link from 'next/link'

export default function Editor(){
const [code,setCode]=useState(\`module.exports = {
  name: 'mycommand',
  alias: ['mc'],
  category: 'general',
  desc: 'My custom command',
  
  execute: async (sock, m, { args, reply }) => {
    await reply('Hello from my plugin!')
  }
}\`)

const download=()=>{
const blob=new Blob([code],{type:'text/javascript'})
const url=URL.createObjectURL(blob)
const a=document.createElement('a')
a.href=url;a.download='plugin.js';a.click();URL.revokeObjectURL(url)}

const submit=async()=>{
const name=prompt('Plugin name:')
const desc=prompt('Description:')
const github=prompt('GitHub link (optional):')
const email=prompt('Contact email:')
if(!name||!desc||!email)return alert('Please fill required fields')
const res=await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({name,description:desc,code,github,email})})
if(res.ok)alert('Submitted for review!');else alert('Failed to submit')}

return(<div className="min-h-screen"><Nav/><main className="max-w-7xl mx-auto px-4 py-12">
<h1 className="text-5xl font-bold mb-4 gradient-text">Plugin Creator</h1>
<p className="text-xl text-gray-400 mb-8">Create and test your custom plugins</p>
<div className="grid lg:grid-cols-2 gap-6">
<div className="glass p-6"><h2 className="text-2xl font-bold mb-4">✏️ Editor</h2>
<textarea value={code} onChange={e=>setCode(e.target.value)} 
className="w-full h-96 bg-black/50 p-4 rounded-lg font-mono text-sm outline-none focus:ring-2 focus:ring-crys-blue"
spellCheck={false}/><div className="flex gap-2 mt-4">
<button onClick={download} className="btn btn-primary flex-1">💾 Download</button>
<button onClick={submit} className="btn btn-secondary flex-1">📤 Submit</button>
</div></div>
<div className="glass p-6"><h2 className="text-2xl font-bold mb-4">📖 Template</h2>
<div className="space-y-3 text-sm"><Field label="name" desc="Command name"/><Field label="alias" desc="Alternative names"/>
<Field label="category" desc="Plugin category"/><Field label="desc" desc="Description"/>
<Field label="execute" desc="Main function"/></div>
<div className="mt-6 p-4 bg-crys-blue/10 rounded-lg"><h3 className="font-bold mb-2">💡 Tips</h3>
<ul className="text-xs space-y-1 text-gray-400">
<li>• Test locally before submitting</li><li>• Follow naming conventions</li>
<li>• Add error handling</li><li>• Document your code</li></ul></div></div>
</div></main></div>)}

function Nav(){return(<nav className="glass sticky top-0 z-50"><div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
<Link href="/" className="flex items-center gap-2"><span className="text-2xl">🚀</span>
<span className="text-xl font-bold gradient-text">CRYSNOVA LIVE</span></Link>
<div className="flex gap-6 text-sm"><Link href="/">Home</Link><Link href="/deploy">Deploy</Link>
<Link href="/marketplace">Marketplace</Link><Link href="/editor" className="text-crys-blue">Editor</Link>
</div></div></nav>)}

function Field({label,desc}){return(<div className="border-l-2 border-crys-blue pl-3">
<div className="font-mono text-crys-blue">{label}</div><div className="text-xs text-gray-500">{desc}</div></div>)}
