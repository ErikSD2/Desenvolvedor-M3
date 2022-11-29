import { filtro } from "./filtro";

export {
    registarEventListenersCores
}

const registarEventListenersCores = (callbackSetFiltro) =>{
    const toggleCores = document.getElementById("toggleCores");
    const coresExtra = document.getElementById("coresExtra");
    
    const cor0 = document.getElementById("cor0");
    const cor1 = document.getElementById("cor1");
    const cor2 = document.getElementById("cor2");
    const cor3 = document.getElementById("cor3");
    const cor4 = document.getElementById("cor4");
    const cor5 = document.getElementById("cor5");
    const cor6 = document.getElementById("cor6");
    const cor7 = document.getElementById("cor7");
    const cor8 = document.getElementById("cor8");
    const cor9 = document.getElementById("cor9");


    toggleCores.onclick = () => {
        if (coresExtra.getAttribute("class") == "ocultar"){
            coresExtra.setAttribute("class","");
            toggleCores.innerText = "Ocultar cores extras";
        }else{
            coresExtra.setAttribute("class","ocultar");
            toggleCores.innerText = "Ver todas as cores";
        }
    }

    const desmarcarCheckboxesComExcecao = (idExcecao) =>{
        for (let index = 0; index < 10; index++) {
            if (`cor${index}` != idExcecao){
                let checkbox = document.getElementById(`cor${index}`);
                checkbox.checked = false;
            }
        }
    }

    const toggleCor = (botao) => {
        if (botao.checked){
            desmarcarCheckboxesComExcecao(botao.id);
            callbackSetFiltro(botao.value);
        }
        else {
            callbackSetFiltro(null);
        }
    }

    cor0.onchange = () => toggleCor(cor0);
    cor1.onchange = () => toggleCor(cor1);
    cor2.onchange = () => toggleCor(cor2);
    cor3.onchange = () => toggleCor(cor3);
    cor4.onchange = () => toggleCor(cor4);
    cor5.onchange = () => toggleCor(cor5);
    cor6.onchange = () => toggleCor(cor6);
    cor7.onchange = () => toggleCor(cor7);
    cor8.onchange = () => toggleCor(cor8);
    cor9.onchange = () => toggleCor(cor9);
}
