#!/bin/bash

# Marketplace page
cat > src/pages/marketplace.js << 'MARKETEOF'
import {useState,useEffect} from 'react'
import Link from 'next/link'

export default function Marketplace(){
const [plugins,setPlugins]=useState([])
const [search,setSearch]=useState('')

useEffect(()=>{
fetch('/api/plugins').then(r=>r.json()).then(d=>setPlugins(d))
},[])

const filtered=plugins.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()))

return(<div className="min-h-screen"><Nav/><main className="max-w-7xl mx-auto px-4 py-12">
<h1 className="text-5xl font-bold mb-4 gradient-text">Plugin Marketplace</h1>
<p className="text-xl text-gray-400 mb-8">Browse and install plugins for your bot</p>
<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search plugins..." 
className="w-full glass px-6 py-4 rounded-xl mb-8 outline-none focus:border-crys-blue"/>
<div className="grid md:grid-cols-3 gap-6">
{filtered.map(p=><PluginCard key={p.id} plugin={p}/>)}
</div>
<div className="mt-12 text-center">
<Link href="/editor" className="btn btn-primary">Create Your Plugin →</Link>
</div>
</main></div>)}

function Nav(){return(<nav className="glass sticky top-0 z-50"><div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
<Link href="/" className="flex items-center gap-2"><span className="text-2xl">🚀</span>
<span className="text-xl font-bold gradient-text">CRYSNOVA LIVE</span></Link>
<div className="flex gap-6 text-sm"><Link href="/">Home</Link><Link href="/deploy">Deploy</Link>
<Link href="/marketplace" className="text-crys-blue">Marketplace</Link><Link href="/editor">Editor</Link>
</div></div></nav>)}

function PluginCard({plugin}){
const [show,setShow]=useState(false)
const copy=()=>{navigator.clipboard.writeText(plugin.code);alert('Copied!')}
return(<div className="glass p-6">
<div className="flex items-start justify-between mb-3">
<div><h3 className="text-xl font-bold">{plugin.name}</h3>
<p className="text-sm text-gray-500">{plugin.author}</p></div>
<span className="px-3 py-1 glass text-xs rounded-full">{plugin.category}</span></div>
<p className="text-gray-400 text-sm mb-4">{plugin.description}</p>
<div className="flex gap-2">
<button onClick={()=>setShow(!show)} className="btn btn-secondary flex-1">
{show?'Hide':'View'} Code</button>
<button onClick={copy} className="btn btn-primary">Copy</button></div>
{show&&<pre className="bg-black/50 p-4 rounded mt-4 text-xs overflow-x-auto"><code>{plugin.code}</code></pre>}
<div className="mt-4 flex items-center justify-between text-xs text-gray-500">
<span>⬇️ {plugin.downloads}</span>
{plugin.github&&<a href={plugin.github} className="hover:text-crys-blue">GitHub →</a>}
</div></div>)}
MARKETEOF

# Editor page
cat > src/pages/editor.js << 'EDITOREOF'
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
EDITOREOF

# API Routes
cat > src/pages/api/plugins.js << 'APIEOF1'
import fs from 'fs'
import path from 'path'

export default function handler(req,res){
const dbPath=path.join(process.cwd(),'database','plugins.json')
const plugins=JSON.parse(fs.readFileSync(dbPath,'utf8'))
res.status(200).json(plugins)}
APIEOF1

cat > src/pages/api/submit.js << 'APIEOF2'
import fs from 'fs'
import path from 'path'

export default function handler(req,res){
if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'})
const dbPath=path.join(process.cwd(),'database','submissions.json')
const submissions=JSON.parse(fs.readFileSync(dbPath,'utf8'))
const submission={...req.body,id:Date.now(),status:'pending',createdAt:new Date().toISOString()}
submissions.push(submission)
fs.writeFileSync(dbPath,JSON.stringify(submissions,null,2))
res.status(200).json({success:true})}
APIEOF2

echo "✅ All pages and API routes created!"
