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
        <td>${(transacoes[item].compra ? ' - ' : ' + ')}</td>
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

     transacoes.push ({
        compra: e.target.elements['Tipo de Transção'].value,
         name: e.target.elements['Nome da Mercadoria'].value,
         valor: e.target.elements['Valor'].value
     })

     console.log(transacoes)
}


// HTMLFormControlsCollection(4) [select#Tipo de transa￧￣o, input#Nome da Mercadoria, input#Valor, input#botao, Tipo de transação: select#Tipo de transa￧￣o, Nome da Mercadoria: input#Nome da Mercadoria, Valor: input#Valor, botao: input#botao]