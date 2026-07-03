import fs from 'fs';
import path from 'path';

const appPath = 'src/App.tsx';
console.log(`Reading ${appPath}...`);
let content = fs.readFileSync(appPath, 'utf8');

// 1. Add imports
const importTarget = "import { useState, useEffect } from 'react';";
const importReplacement = "import { useState, useEffect } from 'react';\nimport { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';";
if (content.includes(importTarget)) {
    content = content.replace(importTarget, importReplacement);
    console.log("Added React Router imports.");
} else {
    console.error("Could not find useState import target!");
}

// 2. Rename App to AppContent
content = content.replace('function App() {', 'function AppContent() {');
console.log("Renamed main App function to AppContent.");

// 3. Replace currentPage state with router hooks
const stateTarget = "const [currentPage, setCurrentPage] = useState('home');";
const stateReplacement = `const navigate = useNavigate();
  const location = useLocation();

  // Helper to map pathname to currentPage state
  const getPageFromPath = (path: string) => {
    switch (path) {
      case '/': return 'home';
      case '/about-us': return 'about';
      case '/our-team': return 'team';
      case '/before-after': return 'before-after';
      case '/treatments': return 'treatments';
      case '/gallery': return 'gallery';
      case '/blog': return 'blog';
      case '/contact-us': return 'contact';
      case '/privacy-policy': return 'privacy';
      default: return 'home';
    }
  };

  const currentPage = getPageFromPath(location.pathname);

  // Helper to navigate
  const navigateToPage = (page: string) => {
    switch (page) {
      case 'home': navigate('/'); break;
      case 'about': navigate('/about-us'); break;
      case 'team': navigate('/our-team'); break;
      case 'before-after': navigate('/before-after'); break;
      case 'treatments': navigate('/treatments'); break;
      case 'gallery': navigate('/gallery'); break;
      case 'blog': navigate('/blog'); break;
      case 'contact': navigate('/contact-us'); break;
      case 'privacy': navigate('/privacy-policy'); break;
      default: navigate('/');
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };`;

if (content.includes(stateTarget)) {
    content = content.replace(stateTarget, stateReplacement);
    console.log("Replaced currentPage state with React Router hooks and helpers.");
} else {
    console.error("Could not find currentPage state target!");
}

// 4. Replace setCurrentPage(...) calls with navigateToPage(...)
let occurrences = 0;
while (content.includes('setCurrentPage(')) {
    content = content.replace('setCurrentPage(', 'navigateToPage(');
    occurrences++;
}
console.log(`Replaced ${occurrences} occurrences of setCurrentPage with navigateToPage.`);

// 5. Append wrapped App component before export default App;
const exportTarget = "export default App;";
const exportReplacement = `function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;`;

if (content.includes(exportTarget)) {
    content = content.replace(exportTarget, exportReplacement);
    console.log("Appended wrapped App wrapper with BrowserRouter.");
} else {
    console.error("Could not find export default App target!");
}

// Write the file back
fs.writeFileSync(appPath, content, 'utf8');
console.log("Refactoring complete!");
