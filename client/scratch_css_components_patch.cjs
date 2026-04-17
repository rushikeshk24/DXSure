const fs = require('fs');
const path = require('path');

const componentsDirs = [
  'C:\\Users\\Lenovo\\Desktop\\DXSure\\client\\src\\components',
  'C:\\Users\\Lenovo\\Desktop\\DXSure\\client\\src\\components\\ui'
];

function patchFile(fullPath) {
  let content = fs.readFileSync(fullPath, 'utf8');
  let original = content;

  // Background and borders - Global layout & Cards
  content = content.replace(/bg-neutral-950\/80/g, "bg-[#ffffff]/80");
  content = content.replace(/bg-neutral-950/g, "bg-[#f7fafc]");
  content = content.replace(/bg-neutral-900\/50/g, "bg-[#ffffff]");
  content = content.replace(/bg-neutral-900\/80/g, "bg-[#f1f4f6]");
  content = content.replace(/bg-neutral-900\/40/g, "bg-[#ffffff]");
  content = content.replace(/bg-neutral-900/g, "bg-[#ffffff]");
  content = content.replace(/hover:bg-neutral-800\/50/g, "hover:bg-[#f1f4f6]");
  content = content.replace(/bg-neutral-800/g, "bg-[#ffffff]");
  content = content.replace(/border-white\/10/g, "border-[#c4c6cf]/20");
  content = content.replace(/divide-white\/5/g, "divide-[#c4c6cf]/20");
  content = content.replace(/border-white\/5/g, "border-[#c4c6cf]/20");
  content = content.replace(/border border-transparent/g, "border border-transparent");

  // Typography
  content = content.replace(/text-neutral-200/g, "text-[#181c1e]");
  content = content.replace(/text-neutral-300/g, "text-[#43474e]");
  content = content.replace(/text-neutral-400/g, "text-[#43474e]");
  content = content.replace(/text-neutral-500/g, "text-[#74777f]");
  content = content.replace(/text-neutral-600/g, "text-[#74777f]");
  content = content.replace(/text-neutral-950/g, "text-[#ffffff]");
  content = content.replace(/text-white/g, "text-[#181c1e]");

  // Emerald -> Primary Navy Blue Overrides
  content = content.replace(/bg-emerald-500/g, "bg-gradient-to-br from-[#002045] to-[#1a365d]");
  content = content.replace(/focus:border-emerald-500/g, "focus:border-[#0061a5]");
  content = content.replace(/focus:ring-emerald-500\/20/g, "focus:ring-[#0061a5]/10");
  content = content.replace(/hover:bg-emerald-400/g, "hover:from-[#001b3c] hover:to-[#002045]");
  content = content.replace(/active:bg-emerald-600/g, "active:from-[#001b3c] hover:to-[#002045]");
  content = content.replace(/shadow-emerald-500\/20/g, "shadow-[#002045]/10");
  content = content.replace(/focus-visible:ring-emerald-400/g, "focus-visible:ring-[#0061a5]");
  
  if (content !== original) {
    fs.writeFileSync(fullPath, content);
    console.log(`Patched Layout/Component: ${path.basename(fullPath)}`);
  }
}

componentsDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      if (file.endsWith('.jsx')) {
        patchFile(path.join(dir, file));
      }
    });
  }
});
