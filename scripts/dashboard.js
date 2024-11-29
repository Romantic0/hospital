document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Buscar dados de médias das avaliações do servidor
        const response = await fetch("backend/routes/obter_medias.php");

        if (!response.ok) {
            console.error("Erro ao carregar os dados de avaliação.");
            return;
        }

        const data = await response.json();
        console.log(data); // Para depuração, veja os dados carregados

        // Preencher as médias nas seções de resumo
        data.forEach((item) => {
            const mediaText = item.media ? item.media.toFixed(1) : "Sem avaliações";
            const perguntaTexto = item.pergunta_texto;

            if (perguntaTexto === "Limpeza") {
                document.getElementById("mediaLimpeza").textContent = `Média: ${mediaText}`;
            } else if (perguntaTexto === "Recepção") {
                document.getElementById("mediaRecepcao").textContent = `Média: ${mediaText}`;
            } else if (perguntaTexto === "Agilidade") {
                document.getElementById("mediaAgilidade").textContent = `Média: ${mediaText}`;
            } else if (perguntaTexto === "Serviços Médicos") {
                document.getElementById("mediaServicos").textContent = `Média: ${mediaText}`;
            }
        });

        // Preparar dados para o gráfico
        const perguntas = data.map(item => item.pergunta_texto);
        const medias = data.map(item => item.media);

        // Configuração do gráfico
        const ctx = document.getElementById("graficoAvaliacao").getContext("2d");

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
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
});
