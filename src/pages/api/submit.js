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
