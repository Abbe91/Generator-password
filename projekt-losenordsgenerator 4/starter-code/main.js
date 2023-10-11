const charLengthSlider = document.getElementById('charLengthSlider');
const charLengthNumber = document.getElementById('charLength');

let maxPasswordLength = parseInt(charLengthSlider.value);

// Event listener for the slider input
charLengthSlider.addEventListener('input', () => {
  maxPasswordLength = parseInt(charLengthSlider.value);
  updateCharacterLength(maxPasswordLength);
  generateNewPassword();
});

// Function to update the character length, line width, and strength
function updateCharacterLength(newLength) {
    characterLength = newLength;
    charLengthNumber.textContent = newLength;
    charLengthSlider.style.width = `${(newLength / maxPasswordLength) * 100}%`; // Adjust the line width based on the character length

    // Calculate and update the strength based on the length
    let strength = "Weak";
    if (newLength >= 8 && newLength <= 12) {
        strength = "Medium";
    } else if (newLength > 12) {
        strength = "Strong";
    }
    document.getElementById('passwordStrength').textContent = strength;
}


// Function to generate a new password
function generateNewPassword() {
  const includeUppercase = document.getElementById('includeUppercase').checked;
  const includeLowercase = document.getElementById('includeLowercase').checked;
  const includeNumbers = document.getElementById('includeNumbers').checked;
  const includeSymbols = document.getElementById('includeSymbols').checked;

  const newPassword = generatePassword(maxPasswordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols);

  document.getElementById('passwordResult').textContent = newPassword;
}

// Event listener for the Generate button
document.getElementById('generatePasswordBtn').addEventListener('click', generateNewPassword);

// Initialize with the default password
generateNewPassword();


// Function to generate a random password
function generatePassword(charLengthSlider, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    // Define character sets
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';
  
    // Create a character set based on selected options
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;
  
    let password = '';
  for (let i = 0; i < charLengthSlider; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}
  
  // Event listener for the Generate button
  document.getElementById('generatePasswordBtn').addEventListener('click', function() {
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
  
    const newPassword = generatePassword(maxPasswordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
  
    document.getElementById('passwordResult').textContent = newPassword;
  });

// Event listener for the Copy div
document.getElementById('copyPassword').addEventListener('click', function() {
    const passwordToCopy = document.getElementById('passwordResult').textContent;
  
    // Create a temporary input element to copy the text to the clipboard
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = passwordToCopy;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  
    // You can provide user feedback here (e.g., alert or update a message)
    alert('Password copied to clipboard!');
  });
  
  