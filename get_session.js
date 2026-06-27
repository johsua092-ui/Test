const readline = require('readline');

console.log('\n=== CLAUDE SESSION KEY EXTRACTOR ===\n');
console.log('1. Buka Chrome di HP');
console.log('2. Login ke claude.ai');
console.log('3. Buka https://www.editthiscookie.com atau install extension EditThisCookie');
console.log('4. Atau cara manual:\n');
console.log('Jalankan ini di Termux:\n');
console.log('termux-clipboard-set "$(curl -s https://claude.ai -H "Cookie: $(termux-clipboard-get)" -v 2>&1 | grep sessionKey)"');
console.log('\n=== ALTERNATIVE: Use Groq (Free, No Session Needed) ===\n');
console.log('Visit: https://console.groq.com\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Paste your session key here (or press Enter to skip): ', (answer) => {
  if (answer.trim()) {
    console.log('\n✓ Session key received!');
    console.log('Add this to your .env:');
    console.log(`CLAUDE_SESSION_KEY=${answer.trim()}`);
  } else {
    console.log('\nSkipped. Consider using Groq instead (free & legal).');
  }
  rl.close();
});
