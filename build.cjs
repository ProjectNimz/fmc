const fs=require('node:fs'),path=require('node:path');
const root=__dirname,out=path.join(root,'dist');
fs.mkdirSync(out,{recursive:true});
const files=['index.html','styles.css','app.js','people.json','manifest.json','sw.js'];
const assets=new Set();
for(const file of files){const text=fs.readFileSync(path.join(root,file),'utf8');for(const match of text.matchAll(/assets\/[A-Za-z0-9_./-]+\.(?:png|jpg|webp)/g))assets.add(match[0]);}
for(const file of [...files,...assets]){const source=path.join(root,file),target=path.join(out,file);if(!fs.existsSync(source))throw Error('Missing asset: '+file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(source,target);}
console.log(`Built ${files.length} site files and ${assets.size} referenced assets into dist/`);
