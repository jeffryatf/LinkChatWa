let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installContainer = document.getElementById('install-container');
    installContainer.style.display = 'block';

    const installButton = document.getElementById('install-button');
    installButton.addEventListener('click', (e) => {
        installContainer.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
  fetch('countries.json')
      .then(response => response.json())
      .then(data => populateCountryCodes(data))
      .catch(error => console.error('Error loading country codes:', error));
});

function populateCountryCodes(data) {
  const countryCodeSelect = document.getElementById('country-code');
  for (const group in data) {
      const optgroup = document.createElement('optgroup');
      optgroup.label = group;
      data[group].forEach(country => {
          const option = document.createElement('option');
          option.value = country.code;
          option.textContent = country.name;
          if (country.default) {
            option.selected = true;
        }
          optgroup.appendChild(option);
      });
      countryCodeSelect.appendChild(optgroup);
  }
}

document.getElementById('phone-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const countryCode = document.getElementById('country-code').value;
  const rawPhoneNumber = document.getElementById('phone-number').value.replace(/[-\s]/g, '');
  const formattedPhoneNumber = formatPhoneNumber(rawPhoneNumber);
  
  const whatsappLink = `https://wa.me/${countryCode}${rawPhoneNumber}`;
  const telegramLink = `https://t.me/${countryCode}${rawPhoneNumber}`;
  
  const resultDiv = document.getElementById('result');
  
  const whatsappLinkAnchor = document.getElementById('whatsapp-link');
  whatsappLinkAnchor.href = whatsappLink;
  whatsappLinkAnchor.textContent = `WhatsApp (${countryCode} ${formattedPhoneNumber})`;
  
  const telegramLinkAnchor = document.getElementById('telegram-link');
  telegramLinkAnchor.href = telegramLink;
  telegramLinkAnchor.textContent = `Telegram (${countryCode} ${formattedPhoneNumber})`;
  
  resultDiv.style.display = 'block';
  
  // Hide "Buat Link"
  document.querySelector('button[type="submit"]').style.display = 'none';
});

// Phone number formatting
function formatPhoneNumber(phoneNumber) {
  phoneNumber = phoneNumber.replace(/\D/g, ''); // Remove all non-digit characters
  if (phoneNumber.length <= 3) {
    return phoneNumber;
  } else if (phoneNumber.length <= 7) {
    return phoneNumber.replace(/(\d{3})(\d{1,4})/, '$1-$2');
  } else {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
  }
}

document.getElementById('phone-number').addEventListener('input', function(event) {
  const input = event.target;
  let formatted = formatPhoneNumber(input.value);
  
  // Remove leading zero
  if (formatted.startsWith('0')) {
    formatted = formatted.substring(1);
  }
  
  input.value = formatted;
  
  // Show the & hide "buat link"
  document.querySelector('button[type="submit"]').style.display = 'block';
});
