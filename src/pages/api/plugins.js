import fs from 'fs'
import path from 'path'

export default function handler(req,res){
const dbPath=path.join(process.cwd(),'database','plugins.json')
const plugins=JSON.parse(fs.readFileSync(dbPath,'utf8'))
res.status(200).json(plugins)}
