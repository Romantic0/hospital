document.addEventListener("DOMContentLoaded", function () {
    const perguntas = [
        "Como você avalia a limpeza do hospital?",
        "Como você avalia o atendimento da recepção?",
        "Como você avalia a agilidade no atendimento?",
    ];

    const perguntasContainer = document.getElementById("perguntasContainer");

    // Renderiza perguntas dinamicamente
    perguntas.forEach((pergunta, index) => {
        const questionBlock = document.createElement("div");
        questionBlock.classList.add("form-group");

        const label = document.createElement("label");
        label.textContent = pergunta;

        const scaleContainer = document.createElement("div");
        scaleContainer.classList.add("scale");

        for (let i = 0; i <= 10; i++) {
            const option = document.createElement("div");
            option.classList.add("option", `option-${i}`);
            option.textContent = i;

            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question${index}`;
            input.value = i;
            input.required = true;

            // Adiciona interação de clique
            option.addEventListener("click", () => {
                const allOptions = scaleContainer.querySelectorAll(".option");
                allOptions.forEach((opt) => opt.classList.remove("selected"));
                option.classList.add("selected");
                input.checked = true;
            });

            scaleContainer.appendChild(option);
            scaleContainer.appendChild(input);
        }

        questionBlock.appendChild(label);
        questionBlock.appendChild(scaleContainer);
        perguntasContainer.appendChild(questionBlock);
    });

    // Manipula submissão do formulário
    const avaliacaoForm = document.getElementById("avaliacaoForm");
    avaliacaoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        console.log("Avaliação enviada com sucesso!");

        avaliacaoForm.classList.add("hidden");
        document.getElementById("agradecimento").classList.remove("hidden");
    });
});
