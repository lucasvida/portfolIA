const form = document.querySelector("#formchat");
const conversa = document.querySelector("#conversa");
const url = "https://primary-production-62a7.up.railway.app/webhook/bot-teste";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  loading.style.display = "flex";
  conversa.innerHTML += `
            <div class="balao">
                <p class="humano">
                    ${form.texto.value}
                </p>
            </div>`;
  conversa.scrollTop = conversa.scrollHeight;

  fetch(url, {
    method: "POST",
    body: JSON.stringify(form.texto.value),
  })
    .then((response) => response.json())
    .then((data) => {
      conversa.innerHTML += `
                        <p class="bot balao">
                            ${data.text}
                        </p>
                    `;
    })
    .catch((error) => {
      console.error("Erro:", error);
    })
    .finally(() => {
      // Ocultar o elemento de "carregando"
      loading.style.display = "none";
      form.texto.value = "";
      form.texto.focus();
      conversa.scrollTop = conversa.scrollHeight;
    });
});

fechar.addEventListener("click", () => {
  chat.classList.remove("fade-animation");
  chat.style.display = "none";
  chatWidget.style.display = "flex";
  chatWidget.classList.add("fade-animation");
});

chatWidget.addEventListener("click", () => {
  chat.style.display = "flex";
  chat.classList.add("fade-animation");
  chatWidget.classList.remove("fade-animation");
  chatWidget.style.display = "none";
});
