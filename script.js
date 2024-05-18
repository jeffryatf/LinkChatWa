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
