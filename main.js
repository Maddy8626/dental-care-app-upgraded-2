const form = document.getElementById('form');
const table = document.getElementById('records');
const search = document.getElementById('search');
let data = JSON.parse(localStorage.getItem('dental-records')) || [];

form.onsubmit = e => {
  e.preventDefault();
  data.push({
    patient: form.patient.value,
    doctor: form.doctor.value,
    type: form.type.value,
    collection: form.collection.value,
    delivery: form.delivery.value
  });
  localStorage.setItem('dental-records', JSON.stringify(data));
  render();
  form.reset();
};

function render(filter = '') {
  table.innerHTML = '';
  data.filter(d => d.doctor.toLowerCase().includes(filter.toLowerCase()))
    .forEach((d,i) => {
      table.innerHTML += `
<tr><td>${d.patient}</td><td>${d.doctor}</td>
<td>${d.type}</td><td>${format(d.collection)}</td>
<td>${format(d.delivery)}</td>
<td><button onclick="del(${i})">🗑️</button></td></tr>`;
    });
}

function del(i) {
  data.splice(i,1);
  localStorage.setItem('dental-records', JSON.stringify(data));
  render(search.value);
}

function format(date) {
  if (!date) return '';
  let [y,m,d] = date.split('-');
  return `${d}/${m}/${y}`;
}

search.oninput = () => render(search.value);
render();

function exportPDF() {
  html2pdf().from(document.body).save('dental-records.pdf');
}
