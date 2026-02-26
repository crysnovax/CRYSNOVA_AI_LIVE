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
