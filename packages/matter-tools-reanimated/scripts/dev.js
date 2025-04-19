const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Save the original main field
const originalMain = pkg.main;

// Set main to expo-router/entry for development
pkg.main = 'expo-router/entry';
fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');

// Function to restore original main field
const restoreMain = () => {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    pkg.main = originalMain;
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
};

// Handle process termination
process.on('SIGINT', () => {
    restoreMain();
    process.exit();
});

process.on('SIGTERM', () => {
    restoreMain();
    process.exit();
});

// Start expo
const expo = spawn('expo', ['start', ...process.argv.slice(2)], {
    stdio: 'inherit',
    shell: true,
});

expo.on('close', () => {
    restoreMain();
});
