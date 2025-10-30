// Toggle between sections
function showSection(id) {
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('visible'));
  document.getElementById(id).classList.add('visible');
  if (id === 'receiverSection') loadDonations();
}

// Store donations in localStorage
const foodForm = document.getElementById('foodForm');
foodForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const donor = document.getElementById('donorName').value.trim();
  const contact = document.getElementById('contact').value.trim();
  const desc = document.getElementById('foodDesc').value.trim();
  const location = document.getElementById('location').value.trim();

  const donation = { donor, contact, desc, location, id: Date.now() };
  let donations = JSON.parse(localStorage.getItem('donations')) || [];
  donations.push(donation);
  localStorage.setItem('donations', JSON.stringify(donations));

  alert('✅ Donation posted successfully!');
  foodForm.reset();
});

// Load and display donations
function loadDonations() {
  const foodList = document.getElementById('foodList');
  foodList.innerHTML = '';
  const donations = JSON.parse(localStorage.getItem('donations')) || [];

  if (donations.length === 0) {
    foodList.innerHTML = '<p>No donations available right now.</p>';
    return;
  }

  donations.forEach(d => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <h3>${d.desc}</h3>
      <p><strong>Donor:</strong> ${d.donor}</p>
      <p><strong>Contact:</strong> ${d.contact}</p>
      <p><strong>Location:</strong> ${d.location}</p>
      <button onclick="requestFood(${d.id})">Request</button>
    `;
    foodList.appendChild(div);
  });
}

// Simulate food request
function requestFood(id) {
  let donations = JSON.parse(localStorage.getItem('donations')) || [];
  const donation = donations.find(d => d.id === id);
  if (donation) {
    alert(`🍛 You have requested food: "${donation.desc}" from ${donation.donor}`);
  }
}