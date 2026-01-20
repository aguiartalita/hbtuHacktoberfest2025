// const form = document.getElementById('registerForm');
// const passwordInput = document.getElementById('password');
// const strengthBar = document.getElementById('strengthFill');
// const strengthText = document.getElementById('strengthText');

// passwordInput.addEventListener('input', function () {
//   const password = passwordInput.value;
//   let strength = 0;

//   if (password.length >= 8) strength++;
//   if (/[A-Z]/.test(password)) strength++;
//   if (/[a-z]/.test(password)) strength++;
//   if (/[0-9]/.test(password)) strength++;
//   if (/[\W]/.test(password)) strength++;

//   let percentage = (strength / 5) * 100;
//   strengthBar.style.width = percentage + '%';

//   if (percentage <= 20) {
//     strengthBar.style.background = 'red';
//     strengthText.textContent = 'Very Weak';
//   } else if (percentage <= 40) {
//     strengthBar.style.background = 'orange';
//     strengthText.textContent = 'Weak';
//   } else if (percentage <= 60) {
//     strengthBar.style.background = 'gold';
//     strengthText.textContent = 'Moderate';
//   } else if (percentage <= 80) {
//     strengthBar.style.background = '#00c851';
//     strengthText.textContent = 'Strong';
//   } else {
//     strengthBar.style.background = 'green';
//     strengthText.textContent = 'Very Strong';
//   }

//   if (password.length === 0) {
//     strengthBar.style.width = '0%';
//     strengthText.textContent = '';
//   }
// });

// form.addEventListener('submit', function (e) {
//   e.preventDefault();

//   const username = document.getElementById('username').value.trim();
//   const email = document.getElementById('email').value.trim();
//   const password = passwordInput.value;

//   if (!username || !email || !password) {
//     alert('Please fill in all fields.');
//     return;
//   }

//   if (!isValidEmail(email)) {
//     alert('Please enter a valid email address.');
//     return;
//   }

//   if (password.length < 6) {
//     alert('Password must be at least 6 characters long.');
//     return;
//   }

//   alert('Registration successful!');
//   form.reset();
//   strengthBar.style.width = '0%';
//   strengthText.textContent = '';
// });

// function isValidEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//   return emailRegex.test(email);
// }


const form = document.getElementById('registerForm');
const passwordInput = document.getElementById('password'); 
const strengthBar = document.getElementById('strengthFil');
const strengthText = document.getElementById('strengthText');

const PASSWORD_RULES = [
  { regex: /.{8,}/, label: 'length' },
  { regex: /[A-Z]/, label: 'uppercase' },
  { regex: /[a-z]/, label: 'lowercase' },
  { regex: /[0-9]/, label: 'number' },
  { regex: /[\W]/, label: 'special' }
];

const STRENGTH_LEVELS = [
  { max: 20, color: 'red', text: 'Very Weak' },
  { max: 40, color: 'orange', text: 'Weak' },
  { max: 60, color: 'gold', text: 'Moderate' },
  { max: 80, color: '#00c851', text: 'Strong' },
  { max: 100, color: 'green', text: 'Very Strong' }
];

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  const strength = calculatePasswordStrength(password);
  updateStrengthUI(strength, password.length === 0);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = getValue('username');
  const email = getValue('email');
  const password = passwordInput.value;

  if (!username || !email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return;
  }

  alert('Registration successful!');
  resetForm();
});

function calculatePasswordStrength(password) {
  const passedRules = PASSWORD_RULES.filter(rule =>
    rule.regex.test(password)
  ).length;

  return (passedRules / PASSWORD_RULES.length) * 100;
}

function updateStrengthUI(percentage, isEmpty) {
  if (isEmpty) {
    strengthBar.style.width = '0%';
    strengthText.textContent = '';
    return;
  }

  const level = STRENGTH_LEVELS.find(l => percentage <= l.max);

  strengthBar.style.width = `${percentage}%`;
  strengthBar.style.background = level.color;
  strengthText.textContent = level.text;
}

function resetForm() {
  form.reset();
  strengthBar.style.width = '0%';
  strengthText.textContent = '';
}

function getValue(id) {
  return document.getElementById(id).value.trim();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return emailRegex.test(email);
}