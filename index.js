var transacoesCru = localStorage.getItem('transacoes')
if (transacoesCru != null) {
    var transacoes = JSON.parse(transacoesCru)
} else {;   
    var transacoes = [];
}

function mostraTransacoes() {
    transacoes= []
}

linha = [...document.querySelectorAll('table.tabelaExtrato .di')]

for (item in transacoes) {
    document.querySelector('table.tabelaExtrato').innerHTML += (
    `<tr>
        <td>${(transacoes[item].compra == 'true' ? ' - ' : ' + ')}</td>
        <td>${transacoes[item].name}</td>
        <td style='text-align:right'>${transacoes[item].valor}</td>
    </tr>`
    )
}

function testaFormulario(e) {
    e.preventDefault();
    
    var transacoesCru = localStorage.getItem('transacoes')

    if (transacoesCru != null) {
        var transacoes = JSON.parse(transacoesCru)
    } else {;   
        var transacoes = [];
    }

    function mostraTransacoes() {
        transacoes= []
    }   

    transacoes.push({
        compra: e.target.elements['tipo_transacao'].value,
        name: e.target.elements['nome'].value,
        valor: e.target.elements['valor'].value
    })

    localStorage.setItem('transacoes', JSON.stringify(transacoes))

    document.getElementById('pag_inicial').click 

    paginaInicial()
}

function totalExtrato() {
    var total = 0;
    let valorInput;
  
    for (produto in transacoes) {
      if (transacoes[produto].tipo_transacao == "true") {
        valorInput = transacoes[produto];
        total -= Number(transacoes[produto].valor);
      } else {
        total += Number(transacoes[produto].valor);
      }
    }
  
    if (transacoes.length > 0) {
      document.querySelector("#tabela tfoot").innerHTML = `
        <tr class="container_tabela_4">
          <td class="tabela_rodape">Total</td>
          <td class="tabela_rodape">${formatter.format(total)}</td>
        </tr>
        `
        document.querySelector("#tabela tfoot").innerHTML += `
        <tr>
          <td class="tabela_rodape status">${Math.sign(total) > 0 ? "[LUCRO]" : "[PREJUÍZO]"}</td>
        </tr>
        `
    }
  }
  

function deletaLocalStorage() {
    if(transacoes.length <= 0) {
        alert("Nenhum registro de transação");
      } else {
        let caixaTexto = confirm("Deseja excluir as transações?");
      
        if(caixaTexto == true) {
          localStorage.clear();
          alert("Transações excluídas");
        } else {
          alert("Exclusões canceladas");
        }
      }
      paginaInicial()
    }

let linkExcluir = document.getElementById("link_limpar");
linkExcluir.addEventListener("click", deletaLocalStorage)

function paginaInicial() {
    location.href="./index.html"
}