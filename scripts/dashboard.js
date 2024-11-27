// Mock data (replace with API call later)
const setores = ["Recepção", "Emergência", "Enfermagem"];
const mediasNotasPorSetor = [8.5, 7.2, 9.0];
const perguntas = ["Limpeza", "Atendimento", "Agilidade"];
const mediasPorPergunta = [8.2, 7.8, 9.1];

// Atualiza resumo
document.getElementById("totalSetores").textContent = setores.length;
document.getElementById("mediaNotas").textContent = (
    mediasNotasPorSetor.reduce((a, b) => a + b, 0) / mediasNotasPorSetor.length
).toFixed(1);
document.getElementById("totalAvaliacoes").textContent = 120; // Mock count

// Gráfico de notas por setor
const ctx1 = document.getElementById("chartNotasPorSetor").getContext("2d");
new Chart(ctx1, {
    type: "bar",
    data: {
        labels: setores,
        datasets: [
            {
                label: "Notas Médias por Setor",
                data: mediasNotasPorSetor,
                backgroundColor: ["#4caf50", "#ff9800", "#03a9f4"],
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
    },
});

// Gráfico de médias por pergunta
const ctx2 = document.getElementById("chartMediaPorPergunta").getContext("2d");
new Chart(ctx2, {
    type: "line",
    data: {
        labels: perguntas,
        datasets: [
            {
                label: "Médias por Pergunta",
                data: mediasPorPergunta,
                borderColor: "#4caf50",
                fill: false,
            },
        ],
    },
    options: {
        responsive: true,
    },
});
