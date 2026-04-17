const fs = require('fs');
const path = require('path');

const filesToPatch = [
  'admin/AdminDashboard.jsx',
  'employee/EmployeeDashboard.jsx',
  'admin/TrackRecordPage.jsx',
  'employee/DayPlanEntryPage.jsx',
  'admin/DayBookPage.jsx',
  'admin/RaiseTicketPage.jsx',
  'employee/ClientRegistrationPage.jsx'
];

const basePath = `C:\\Users\\Lenovo\\Desktop\\DXSure\\client\\src\\pages`;

filesToPatch.forEach(file => {
  const fullPath = path.join(basePath, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Core Layouts & Borders (No-Line Rule)
    content = content.replace(/border border-white\/10 bg-neutral-900\/50/g, "bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20");
    content = content.replace(/border border-white\/5 bg-neutral-800\/50/g, "bg-[#f1f4f6]");
    
    // Global Typography
    content = content.replace(/text-neutral-100/g, "text-[#181c1e]");
    content = content.replace(/text-neural-100/g, "text-[#181c1e]");
    content = content.replace(/text-neutral-400/g, "text-[#43474e]");
    content = content.replace(/text-neutral-500/g, "text-[#74777f]");
    
    // "Digital Architect" Hex Colors 
    content = content.replace(/text-emerald-500/g, "text-[#002045]");
    content = content.replace(/text-emerald-400/g, "text-[#0061a5]");
    content = content.replace(/bg-emerald-500\/20/g, "bg-[#d6e3ff]");
    content = content.replace(/hover:border-emerald-500\/20/g, "hover:bg-[#ebeef0] hover:shadow-[0_8px_32px_rgba(24,28,30,0.06)] ring-1 ring-transparent");
    
    // Forms
    content = content.replace(/border border-white\/10 bg-neutral-900\/50 px-3\.5 py-2\.5 text-white focus:border-emerald-500 focus:ring-emerald-500\/20/g, 
            "ring-1 ring-[#c4c6cf]/20 bg-[#ffffff] px-3.5 py-2.5 text-[#181c1e] focus:border-[#0061a5] focus:outline-none focus:ring-2 focus:ring-[#0061a5]/10 shadow-[0_2px_12px_rgba(24,28,30,0.02)]");
            
    content = content.replace(/bg-emerald-600/g, "bg-gradient-to-br from-[#002045] to-[#1a365d]");
    content = content.replace(/hover:bg-emerald-500/g, "hover:from-[#001b3c] hover:to-[#002045]");
    
    // Additional Text mapping for inputs missing specific overrides
    content = content.replace(/text-white/g, "text-[#181c1e]");
    
    fs.writeFileSync(fullPath, content);
    console.log(`Successfully patched Light Mode Design tokens into: ${file}`);
  }
});
