// Terminal CLI Portfolio - Main Script
// Author: Steven Granquist

// Global state
let commandHistory = [];
let historyIndex = -1;
let config = null; // Will hold the loaded configuration

// DOM Elements
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

// Load configuration from JSON file
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error('Failed to load configuration');
        }
        config = await response.json();
        return config;
    } catch (error) {
        console.error('Error loading config:', error);
        // Fallback error message
        return null;
    }
}

// Command definitions
const commands = {
    help: {
        description: 'List all available commands',
        execute: () => {
            return `
<div class="command-table">
    <span class="command-name">help</span>
    <span class="command-desc">Show all available commands</span>
    
    <span class="command-name">about</span>
    <span class="command-desc">Learn about Steven Granquist</span>
    
    <span class="command-name">skills</span>
    <span class="command-desc">View technical expertise and skills</span>
    
    <span class="command-name">experience</span>
    <span class="command-desc">Professional work history</span>
    
    <span class="command-name">projects</span>
    <span class="command-desc">Showcase of notable projects</span>
    
    <span class="command-name">contact</span>
    <span class="command-desc">Get in touch</span>
    
    <span class="command-name">social</span>
    <span class="command-desc">Social media and professional links</span>
    
    <span class="command-name">clear</span>
    <span class="command-desc">Clear the terminal screen</span>
    
    <span class="command-name">banner</span>
    <span class="command-desc">Display welcome banner</span>
</div>

<div class="output-text" style="margin-top: 12px;">
Tip: Use <span class="output-highlight">↑/↓</span> arrows to navigate command history
</div>`;
        }
    },
    
    about: {
        description: 'Learn about Steven Granquist',
        execute: () => {
            if (!config) return '<span class="output-error">Configuration not loaded</span>';
            
            const { personal, about } = config;
            return `
<div class="output-success" style="font-size: 16px; margin-bottom: 12px;">
▶ About ${personal.name}
</div>

<div class="output-text">
<span class="output-highlight">Position:</span> ${about.position}

<span class="output-highlight">Summary:</span>
${about.summary.join('\n')}

<span class="output-highlight">Philosophy:</span>
${about.philosophy}
</div>`;
        }
    },
    
    skills: {
        description: 'View technical expertise',
        execute: () => {
            if (!config) return '<span class="output-error">Configuration not loaded</span>';
            
            const categoriesHTML = config.skills.categories.map(category => `
    <div class="skill-category">
        <h3>${category.icon} ${category.title}</h3>
        <ul>
            ${category.items.map(item => `<li>${item}</li>`).join('\n            ')}
        </ul>
    </div>`).join('\n    ');
            
            return `
<div class="output-success" style="font-size: 16px; margin-bottom: 12px;">
▶ Technical Skills & Knowledge
</div>

<div class="skill-grid">
    ${categoriesHTML}
</div>`;
        }
    },
    
    experience: {
        description: 'Professional work history',
        execute: () => {
            if (!config) return '<span class="output-error">Configuration not loaded</span>';
            
            const positionsHTML = config.experience.positions.map(position => `
<div class="project-card">
    <h3>${position.title}</h3>
    <p>
    <span class="output-highlight">Company:</span> ${position.company}<br>
    <span class="output-highlight">Focus:</span> ${position.focus}<br>
    <span class="output-highlight">Key Responsibilities:</span><br>
    ${position.responsibilities.map(resp => `• ${resp}`).join('<br>\n    ')}
    </p>
</div>`).join('\n');
            
            return `
<div class="output-success" style="font-size: 16px; margin-bottom: 12px;">
▶ Professional Experience
</div>

${positionsHTML}

<div class="output-text" style="margin-top: 16px;">
${config.experience.linkedInText} <a href="${config.experience.linkedInUrl}" target="_blank" class="output-link">LinkedIn profile</a>
</div>`;
        }
    },
    
    projects: {
        description: 'Showcase of notable projects',
        execute: () => {
            if (!config) return '<span class="output-error">Configuration not loaded</span>';
            
            const projectsHTML = config.projects.items.map(project => `
<div class="project-card">
    <h3>${project.title}</h3>
    <p>
    ${project.description}
    </p>
</div>`).join('\n');
            
            return `
<div class="output-success" style="font-size: 16px; margin-bottom: 12px;">
▶ Notable Projects
</div>

${projectsHTML}

<div class="output-text" style="margin-top: 16px;">
${config.projects.footerText} <span class="output-highlight">${config.projects.footerCommand}</span>
</div>`;
        }
    },
    
    contact: {
        description: 'Get in touch',
        execute: () => {
            if (!config) return '<span class="output-error">Configuration not loaded</span>';
            
            const { contact } = config;
            return `
<div class="output-success" style="font-size: 16px; margin-bottom: 12px;">
▶ Contact Information
</div>

<div class="output-text">
<span class="output-highlight">Email:</span> ${contact.email}
<span class="output-highlight">LinkedIn:</span> <a href="${contact.linkedIn.url}" target="_blank" class="output-link">${contact.linkedIn.display}</a>
<span class="output-highlight">GitHub:</span> ${contact.github}
<span class="output-highlight">Location:</span> ${contact.location}

<div style="margin-top: 16px; padding: 12px; background: rgba(0, 255, 255, 0.05); border-left: 3px solid var(--accent-cyan); border-radius: 4px;">
${contact.availability.message}
${contact.availability.details}
</div>
</div>`;
        }
    },
    
    social: {
        description: 'Social media links',
        execute: () => {
            if (!config) return '<span class="output-error">Configuration not loaded</span>';
            
            const socialLinksHTML = config.social.links.map(link => {
                const linkText = link.url.startsWith('<') ? link.display : 
                    `<a href="${link.url}" target="_blank" class="output-link">${link.display}</a>`;
                return `<span class="output-highlight">${link.icon} ${link.platform}:</span> ${linkText}`;
            }).join('\n');
            
            return `
<div class="output-success" style="font-size: 16px; margin-bottom: 12px;">
▶ Connect With Me
</div>

<div class="output-text">
${socialLinksHTML}
</div>`;
        }
    },
    
    clear: {
        description: 'Clear terminal screen',
        execute: () => {
            terminalOutput.innerHTML = '';
            return null; // Don't append output
        }
    },
    
    banner: {
        description: 'Display welcome banner',
        execute: () => {
            return getBanner();
        }
    }
};

// Generate welcome banner with ASCII art
function getBanner() {
    if (!config) return '<span class="output-error">Configuration not loaded</span>';
    
    const asciiArt = config.banner.asciiArt.join('\n');
    
    return `
<pre class="ascii-art">
${asciiArt}
</pre>

<div class="output-success">${config.banner.welcomeMessage}</div>

<div class="output-text">
${config.banner.helpText}
</div>`;
}

// Add output to terminal
function addOutput(content, className = '') {
    const line = document.createElement('div');
    line.className = `output-line ${className}`;
    line.innerHTML = content;
    terminalOutput.appendChild(line);
    scrollToBottom();
}

// Add command line to output
function addCommandLine(command) {
    addOutput(`<span class="prompt">guest@portfolio:~$</span> ${command}`, 'command-line');
}

// Scroll terminal to bottom
function scrollToBottom() {
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Execute command
function executeCommand(input) {
    const command = input.trim().toLowerCase();
    
    if (!command) return;
    
    // Add to history
    commandHistory.push(command);
    historyIndex = commandHistory.length;
    
    // Display command
    addCommandLine(input);
    
    // Execute command
    if (commands[command]) {
        const output = commands[command].execute();
        if (output !== null) {
            addOutput(output);
        }
    } else {
        addOutput(
            `<span class="output-error">Command not found: ${command}</span>\n` +
            `<span class="output-text">Type <span class="output-highlight">'help'</span> to see available commands.</span>`,
            'output-error'
        );
    }
}

// Handle input
terminalInput.addEventListener('keydown', (e) => {
    // Enter key
    if (e.key === 'Enter') {
        const input = terminalInput.value;
        executeCommand(input);
        terminalInput.value = '';
    }
    
    // Up arrow - previous command
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    }
    
    // Down arrow - next command
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    }
    
    // Tab key - autocomplete
    if (e.key === 'Tab') {
        e.preventDefault();
        const input = terminalInput.value.toLowerCase();
        if (input) {
            const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
            if (matches.length === 1) {
                terminalInput.value = matches[0];
            } else if (matches.length > 1) {
                addOutput(
                    `<span class="output-text">Possible commands: ${matches.join(', ')}</span>`
                );
            }
        }
    }
});

// Keep input focused
document.addEventListener('click', () => {
    terminalInput.focus();
});

// Auto-typing welcome message
function typeWriter(text, element, delay = 30) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, delay);
            scrollToBottom();
        }
    }
    
    type();
}

// Initialize terminal
async function initTerminal() {
    // Load configuration first
    await loadConfig();
    
    // Display banner after config is loaded
    addOutput(getBanner());
    
    // Focus input
    terminalInput.focus();
}

// Theme Management
function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const html = document.documentElement;
    
    // Load saved theme or default to cyber
    const savedTheme = localStorage.getItem('portfolio-theme') || 'cyber';
    html.setAttribute('data-theme', savedTheme);
    
    // Set active button
    themeButtons.forEach(btn => {
        if (btn.getAttribute('data-theme') === savedTheme) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            
            // Update theme
            html.setAttribute('data-theme', theme);
            localStorage.setItem('portfolio-theme', theme);
            
            // Update active state
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Add feedback message
            addOutput(
                `<span class="output-success">Theme switched to: ${theme}</span>`,
                'output-success'
            );
        });
    });
}

// Start terminal on page load
window.addEventListener('DOMContentLoaded', () => {
    initTerminal();
    initThemeSwitcher();
});

// Prevent page unload on terminal interactions
window.addEventListener('beforeunload', (e) => {
    // Optional: Add confirmation if desired
    // e.preventDefault();
    // e.returnValue = '';
});



