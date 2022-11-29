export {registarEventListenersPreco}

const registarEventListenersPreco = (callbackSetPreco) => {
    const deselecionarOutrosPrecosComExcecao = (idExcecao) => {
        for (let index = 0; index < 5; index++) {
            if (index != idExcecao){
                document.getElementById(`preco${index}`).checked = false;
            }
        }
    }

    for (let index = 0; index < 5; index++) {
        let botaoAtual = document.getElementById(`preco${index}`);
        botaoAtual.onclick = () => {
            if (botaoAtual.checked){
                deselecionarOutrosPrecosComExcecao(index);
                callbackSetPreco(index);
            }else{
                callbackSetPreco(null);
            }
        }
    }
}