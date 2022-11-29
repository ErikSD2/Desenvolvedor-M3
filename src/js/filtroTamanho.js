export {registarEventListenersTamanho}

const TAMANHOS = ["P", "M", "G", "GG", "U", "36", "38", "40", "42", "44", "46"];

const registarEventListenersTamanho = (callbackSetTamanho) => {
    const deselecionarOutrosTamanhosComExcecao = (tamanhoExcecao) => {
        for (const tamanho of TAMANHOS) {
            if (tamanho != tamanhoExcecao){
                document.getElementById(`tamanho${tamanho}`).setAttribute("data-selecionado","false");
            }
        }
    }

    for (const tamanho of TAMANHOS) {
        let botaoAtual = document.getElementById(`tamanho${tamanho}`);
        botaoAtual.onclick = () => {
            let novoValor = "";
            if (botaoAtual.getAttribute("data-selecionado") == "false") {
                botaoAtual.setAttribute("data-selecionado", "true");
                novoValor = tamanho;
            } else {
                botaoAtual.setAttribute("data-selecionado", "false");
                novoValor = null;
            }
            deselecionarOutrosTamanhosComExcecao(tamanho);
            callbackSetTamanho(novoValor);
        }
    }
}