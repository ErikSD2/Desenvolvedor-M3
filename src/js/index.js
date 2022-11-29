import { filtro } from "./filtro";
import { registarEventListenersCores } from "./filtroCores";
import { registarEventListenersPreco } from "./filtroPreco";
import { registarEventListenersTamanho } from "./filtroTamanho";

const linkAPIBase = process.env.SERVER_API;
const endpoint = "/products"

const formatarPreco = (valor) => {
    let resultado = valor.toFixed(2);
    return resultado.toString().replaceAll('.','@').replaceAll(',','%').replaceAll('@',',').replaceAll('%','.');
}

const ORDEM_MAIS_RECENTE = "maisrecente";
const ORDEM_MAIOR_PRECO = "maiorpreco";
const ORDEM_MENOR_PRECO = "menorpreco";
let contadorCarrinho = 0;


window.onload = (ev) => {
    const gridProdutos = document.getElementById("gridProdutos");
    const numeroCarrinho = document.getElementById("numeroCarrinho");

    let produtos = null;
    let filtros = new filtro();
    let ordernacaoSelecionada = ORDEM_MAIS_RECENTE;

    registarEventListenersCores((idCor) => {
        filtros.cor = idCor;
        renderizarProdutos();
    });

    registarEventListenersTamanho((tamanho) => {
        filtros.tamanho = tamanho;
        renderizarProdutos();
    })

    registarEventListenersPreco((idFaixaPreco) => {
        filtros.faixaPreco = idFaixaPreco;
        renderizarProdutos();
    })

    const alterarOrdem = (novoValor) => {
        ordernacaoSelecionada = novoValor;
        renderizarProdutos();
    }

    document.getElementById("ordenarMaisRecente").onclick = () => alterarOrdem(ORDEM_MAIS_RECENTE);
    document.getElementById("ordenarMenorPreco").onclick = () => alterarOrdem(ORDEM_MENOR_PRECO);
    document.getElementById("ordenarMaiorPreco").onclick = () => alterarOrdem(ORDEM_MAIOR_PRECO);

    const carregarJSON = () => {
        fetch(linkAPIBase + endpoint, {
            method: "GET"
        }).then((resposta) => {
            if (!resposta.ok){
                console.log("Erro no fetch");
                return;
            }
            resposta.json().then((respostaDeserializada) => {
                produtos = respostaDeserializada;
                renderizarProdutos();
            })
        }).catch((erro) => {
            console.log(erro);
        })
    }

    const ordernarProdutos = (produtos) => {
        //-1 => A DEPOIS B
        //0 => A == B
        //1 => B DEPOIS A
        const ordernarPrecoMenor = (_produtoA, _produtoB) => {
            let precoProdutoA = _produtoA.price;
            let precoProdutoB = _produtoB.price;

            if (precoProdutoA < precoProdutoB) return -1;
            else if (precoProdutoA > precoProdutoB) return 1;
            else return 0;
        }

        return produtos.sort((produtoA,produtoB) => {
            switch (ordernacaoSelecionada) {
                case ORDEM_MAIS_RECENTE:
                    let dataProdutoA = new Date(produtoA.date);
                    let dataProdutoB = new Date(produtoB.date);

                    if (dataProdutoA > dataProdutoB) return -1;
                    else if (dataProdutoA < dataProdutoB) return 1;
                    else return 0;

                case ORDEM_MAIOR_PRECO:
                    return ordernarPrecoMenor(produtoB, produtoA);

                case ORDEM_MENOR_PRECO:
                    return ordernarPrecoMenor(produtoA, produtoB);
            
                default: return 0;
            }
        })
    }

    const filtrarProdutos = () => {
        let resultados = [];
        for (const produto of produtos) {
            if(filtros.isProdutoValido(produto)){
                resultados.push(produto);
            }
        }
        return ordernarProdutos(resultados);
    }

    const renderizarProdutos = () => {
        let _produtosParaExibir = filtrarProdutos();
        gridProdutos.innerHTML = "";
        
        for (const produto of _produtosParaExibir) {
            let parcelas = produto.parcelamento[0];
            let valorParcela = produto.parcelamento[1];
            gridProdutos.innerHTML += `
                <div class="cartaoProduto">
                    <img src="${produto.image}" alt="${produto.name}">
                    <span>${produto.name}</span>
                    <span class="preco">R$ ${formatarPreco(produto.price)}</span>
                    <span>até ${parcelas}x de R$${formatarPreco(valorParcela)}</span>
                    <button type="button" class="btnComprar">comprar</button>
                </div>
            `;
        }

        let botoesComprar = document.getElementsByClassName("btnComprar");
        for (const botao of botoesComprar) {
            botao.onclick = () => {
                contadorCarrinho++;
                numeroCarrinho.innerText = contadorCarrinho;
            }
        }
    }

    carregarJSON();
    //renderizarProdutos();
    
}