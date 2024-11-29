document.addEventListener("DOMContentLoaded", function () {
    const perguntas = [
        "Como você avalia a limpeza do hospital?",
        "Como você avalia o atendimento da recepção?",
        "Como você avalia a agilidade no atendimento?",
        "Como você avalia a qualidade dos serviços médicos?"
    ];

    const perguntasContainer = document.getElementById("perguntasContainer");

    perguntas.forEach((pergunta, index) => {
        const divPergunta = document.createElement("div");
        divPergunta.classList.add("form-group");

        const label = document.createElement("label");
        label.textContent = pergunta;

        const escala = document.createElement("div");
        escala.classList.add("scale");

        for (let i = 1; i <= 10; i++) {
            const nota = document.createElement("div");
            nota.textContent = i;
            nota.style.backgroundColor = `hsl(${(i - 1) * 36}, 80%, 70%)`;
            nota.dataset.value = i;

            nota.addEventListener("click", () => {
                escala.querySelectorAll("div").forEach(div => div.classList.remove("selected"));
                nota.classList.add("selected");
                input.value = i; // Salva a nota no input oculto
            });

            const input = document.createElement("input");
            input.type = "radio";
            input.name = `nota${index}`;
            input.value = i;
            input.style.display = "none"; // Oculta o input, só é usado para enviar a nota

            nota.appendChild(input);
            escala.appendChild(nota);
        }

        divPergunta.appendChild(label);
        divPergunta.appendChild(escala);
        perguntasContainer.appendChild(divPergunta);
    });

    const form = document.getElementById("avaliacaoForm");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Captura as notas selecionadas
        const avaliacoes = [];
        perguntasContainer.querySelectorAll(".scale").forEach((escala, index) => {
            const selecionado = escala.querySelector(".selected");
            if (selecionado) {
                avaliacoes.push({ pergunta_id: index + 1, resposta: Number(selecionado.dataset.value) });
            }
        });

        // Captura o feedback
        const feedback = document.getElementById("feedback").value;

        // Envia para o backend
        const response = await fetch("../backend/routes/salvar_avaliacao.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ avaliacoes, feedback }),
        });

        const result = await response.json();
        if (result.success) {
            document.getElementById("avaliacaoForm").classList.add("hidden");
            document.getElementById("agradecimento").classList.remove("hidden");
        } else {
            alert("Erro ao salvar a avaliação.");
        }
    });
});
