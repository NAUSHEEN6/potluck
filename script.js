const getData = k => JSON.parse(localStorage.getItem(k) || '[]');
const setData = (k, v) => localStorage.setItem(k, JSON.stringify(v));

document.getElementById('rsvpJump').addEventListener('click', () =>
  document.getElementById('signup').scrollIntoView({ behavior: 'smooth' })
);

// const eventDate = new Date("2025-08-25 12:30:00").getTime(); 
// function tick() {
//   const el = document.getElementById('countdown');
//   const diff = eventDate - new Date();
//   if (diff <= 0) { el.textContent = "🎉 It’s Potluck Time!"; return; }
//   const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60;
//   el.textContent = `🕒 ${d}d ${h}h ${m}m`;
// }
// setInterval(tick, 60000); tick();

const eventDate = new Date("2025-08-08 12:00:00").getTime(); 
function tick() {
    const countdownEl = document.getElementById("countdown"); 
    const timer = setInterval(() => { 
      const now = new Date().getTime(); 
      const timeLeft = eventDate - now; 
      if (timeLeft < 0) { 
        clearInterval(timer); 
        countdownEl.textContent = "🎉 It’s Potluck Time!"; 
        return; 
      }
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)); 
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24); 
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60); 
      const seconds = Math.floor((timeLeft / 1000) % 60); 
      countdownEl.textContent = `🕒${String(days).padStart(2, '0')}days ${String(hours).padStart(2, '0')}hrs: ${String(minutes).padStart(2, '0')}mins: ${String(seconds).padStart(2, '0')}secs`;
    }, 1000); 
}
setInterval(tick, 60000); tick();

    

const dishForm = document.getElementById('dishForm');
dishForm.addEventListener('submit', async e => {
  e.preventDefault();
  const f = new FormData(dishForm);
  let photo = "";
  if (f.get('photo')?.size) {
    photo = await new Promise(r => {
      const rd = new FileReader();
      rd.onload = () => r(rd.result);
      rd.readAsDataURL(f.get('photo'));
    });
  }
  const dishes = getData('dishes');
  dishes.push({ name: f.get('name'), dish: f.get('dish'), category: f.get('category'), photo });
  setData('dishes', dishes);
  document.getElementById('dishMessage').classList.remove('hidden');
  dishForm.reset();
  renderMenu();
});

// function renderMenu() {
//   const wrap = document.getElementById('menuList');
//   wrap.innerHTML = '';
//   const dishes = getData('dishes');
//   ['Starters', 'Main Course', 'Desserts', 'Drinks'].forEach(cat => {
//     const h = document.createElement('h3');
//     h.textContent = cat;
//     h.className = 'col-span-full text-2xl text-accent mt-8';
//     wrap.appendChild(h);
//     dishes.filter(d => d.category === cat).forEach(d => {
//       const card = document.createElement('div');
//       card.className = 'bg-primary bg-opacity-60 border border-accent p-4 rounded-2xl';
//       if (d.photo) {
//         const img = new Image();
//         img.src = d.photo;
//         img.alt = d.dish;
//         img.className = 'w-32 h-32 mx-auto mb-2 rounded-full object-cover';
//         card.appendChild(img);
//       }
//       card.innerHTML += `<h4 class='text-xl font-bold text-accent'>${d.dish}</h4><p>${d.name}</p>`;
//       wrap.appendChild(card);
//     });
//   });
// }
// renderMenu();
