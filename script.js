const bookingForm = document.querySelector("#booking-form");
const dateInput = document.querySelector("#date");
const yearLabel = document.querySelector("#year");

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60_000)
  .toISOString()
  .slice(0, 10);

dateInput.min = localToday;
yearLabel.textContent = today.getFullYear();

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const date = new Date(`${formData.get("date")}T12:00:00`);
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
  }).format(date);
  const piercing = formData.get("piercing") || "Ainda quero conversar sobre as opções";
  const message = [
    "Oi, Camila! Gostaria de solicitar um horário para colocação de piercing.",
    `Nome: ${formData.get("name")}`,
    `Piercing: ${piercing}`,
    `Data de preferência: ${formattedDate}`,
    `Período ou horário: ${formData.get("time")}`,
  ].join("\n");

  window.open(`https://wa.me/5535988234408?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});