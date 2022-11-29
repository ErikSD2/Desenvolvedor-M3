export class filtro {
    constructor() {
        this._cor = null;
        this.tamanho = null;
        this.faixaPreco = null;
    }

    set cor(idCor) {
        switch (idCor) {
            case "0": this._cor = "Amarelo"; break;
            case "1": this._cor = "Azul"; break;
            case "2": this._cor = "Branco"; break;
            case "3": this._cor = "Cinza"; break;
            case "4": this._cor = "Laranja"; break;
            case "5": this._cor = "Verde"; break;
            case "6": this._cor = "Vermelho"; break;
            case "7": this._cor = "Preto"; break;
            case "8": this._cor = "Rosa"; break;
            case "9": this._cor = "Vinho"; break;
            default: this._cor = null; break;
        }
        console.log(this._cor);
    }
    get cor(){
        return this._cor;
    }

    isProdutoValido(produto){
        if (this.isCorValida(produto) && this.isTamanhoValido(produto) && this.isPrecoValido(produto)){
            return true;
        }else{
            return false;
        }
    }

    isCorValida(produto) {
        if (produto.color == null) return false;
        if (this.cor == null) return true;

        if (this.cor.toUpperCase() == produto.color.toUpperCase()) {
            return true;
        } else {
            return false;
        }
    }

    isTamanhoValido(produto) {
        if (produto.size == null) return false;
        if (this.tamanho == null) return true;

        for (const tamanho of produto.size) {
            if (tamanho.toUpperCase() == this.tamanho.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    isPrecoValido(produto) {
        const isPrecoValidoBase = (precoMin, precoMax) => {
            if (
                produto.price >= precoMin &&
                ((precoMax != null && produto.price <= precoMax) || precoMax == null)) {
                return true;
            } else {
                return false;
            }
        }

        if (produto.price == null) {
            return false;
        }
        switch (this.faixaPreco) {
            case null: return true;
            case 0: return isPrecoValidoBase(0, 50);
            case 1: return isPrecoValidoBase(51, 150);
            case 2: return isPrecoValidoBase(151, 300);
            case 3: return isPrecoValidoBase(301, 500);
            case 4: return isPrecoValidoBase(500, null);
            default: return false;
        }
    }
}