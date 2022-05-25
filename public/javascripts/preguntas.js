window.onload = function() {
    const preguntasHtml = document.getElementById('preguntas');
    const preguntasLength = preguntas.length - 1;
    let contador = 0;
    const respuesta = [];

    const getPregunta = () => preguntas[contador].pregunta;
    const getIdPregunta = () => preguntas[contador].id_pregunta;
    const getCard = () => document.getElementById('card');
    const nextQuestionHtml = () => document.getElementById('nextQuestion');
    const endQuestionHtml = () => document.getElementById('endQuestion');
    const getRadioButton = () => document.querySelector('input[name="radioResp"]:checked');

    const siguientePregunta = () => {
        const radioButtonHtml = getRadioButton();
        if(radioButtonHtml) {
            respuesta[contador] = { id: getIdPregunta(), value: radioButtonHtml.value, question: getPregunta() };
            if(contador < preguntasLength) contador ++;
            preguntasHtml.removeChild(getCard());
            preguntasHtml.innerHTML = formarPreguntastHtml();
            const siguienteButtonHtml = nextQuestionHtml();
            if(siguienteButtonHtml) siguienteButtonHtml.onclick = () => { siguientePregunta() };
            if(contador == preguntasLength) endQuestionHtml().onclick = () => { finalizarPreguntas(); }
        }
    };

    const finalizarPreguntas = () => {
        const radioButtonHtml = getRadioButton();
        if(radioButtonHtml) {
            respuesta[contador] = { id: getIdPregunta(), value: radioButtonHtml.value, question: getPregunta() };
            preguntasHtml.removeChild(getCard());
            preguntasHtml.innerHTML = formarRespuestas();
        }
    }

    const formarPreguntastHtml = () => `
        <div class="card" id="card">
            <h5 class="card-header">Preguntas</h5>
            <div class="card-body">
                <h5 class="card-title">${getPregunta()}</h5>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="radioResp" id="radioResp" value="si">
                    <label class="form-check-label" for="radioResp">Si</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="radioResp" id="radioResp" value="no">
                    <label class="form-check-label" for="radioResp">No</label>
                </div>
                ${contador < preguntasLength ?
                     '<button class="btn btn-primary" id="nextQuestion">Siguiente</button>' :
                      '<button class="btn btn-primary" id="endQuestion">Finalizar</button>' }
            </div>
        </div>
    `;

    const formarRespuestas = () => {
        let html = `
            <div class="card">
                <div class="card-header">Preguntas</div>
                <ul class="list-group list-group-flush">
        `;
        
        for(let el of respuesta) html += `<li class="list-group-item">${el.question}</li>`;
        
        html += `
                </ul>
            </div>
        `;

        html += `
            <div class="card">
                <div class="card-header">Respuestas</div>
                <ul class="list-group list-group-flush">
        `;

        for(let el of respuesta) html += `<li class="list-group-item">${el.value}</li>`;

        html += `
                </ul>
            </div>
        `;

        return html;
    }

    if(contador < preguntasLength) {
        preguntasHtml.innerHTML = formarPreguntastHtml();
        nextQuestionHtml().onclick = () => { siguientePregunta() };
    }

};