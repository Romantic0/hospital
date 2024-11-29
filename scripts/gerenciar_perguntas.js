let questions = []; // Mock data (substituir por integração com API futuramente)
let questionId = 1; // Mock ID para controle

// Adiciona pergunta
document.getElementById("questionForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const questionText = document.getElementById("questionText").value;

    questions.push({ id: questionId++, text: questionText });
    renderQuestions();
    document.getElementById("questionForm").reset();
});

// Renderiza lista de perguntas
function renderQuestions() {
    const questionsList = document.getElementById("questionsList");
    questionsList.innerHTML = "";

    questions.forEach((question) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${question.id}</td>
            <td>${question.text}</td>
            <td class="actions">
                <button class="edit" onclick="editQuestion(${question.id})">Editar</button>
                <button class="delete" onclick="deleteQuestion(${question.id})">Excluir</button>
            </td>
        `;
        questionsList.appendChild(row);
    });
}

// Edita pergunta
function editQuestion(id) {
    const question = questions.find((q) => q.id === id);
    const newText = prompt("Edite o texto da pergunta:", question.text);
    if (newText) {
        question.text = newText;
        renderQuestions();
    }
}

// Exclui pergunta
function deleteQuestion(id) {
    if (confirm("Tem certeza que deseja excluir esta pergunta?")) {
        questions = questions.filter((q) => q.id !== id);
        renderQuestions();
    }
}

// Renderiza inicialmente
renderQuestions();