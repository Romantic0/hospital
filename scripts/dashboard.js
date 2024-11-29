document.addEventListener("DOMContentLoaded", async function () {
    const response = await fetch("../backend/routes/obter_medias.php");
    const data = await response.json();

    const ctx = document.getElementById("graficoAvaliacao").getContext("2d");

    const perguntas = ["Limpeza", "Recepção", "Agilidade", "Serviços Médicos"];
    const medias = perguntas.map((_, i) => {
        const item = data.find(d => d.pergunta_id === i + 1);
        return item ? item.media : 0;
    });

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: perguntas,
            datasets: [{
                label: "Média das Avaliações",
                data: medias,
                backgroundColor: "rgba(0, 123, 255, 0.5)",
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});
