//variavel transacoesCru recebe os itens dentro de 'transacoes', se após isso, não tiver nada dentro de  transacoesCru, 'transacoes' recebe transacoesCru em objeto JS, se tiver algo dentro de transacoesCru, transacoes recebe uma array vazia (para que se possa adicionar os itens da tabela)
var transacoesCru = localStorage.getItem('transacoes')
if (transacoesCru != null) {
    var transacoes = JSON.parse(transacoesCru)
} else {;   
    var transacoes = [];
}

//mostra as transações já feitas
function mostraTransacoes() {
    transacoes= []
}


//escreve no HTML em forma de tabela os itens da tabela em suas respectivas posições 
for (item in transacoes) {
    document.querySelector('table.tabelaExtrato tbody').innerHTML += (
    `<tr>
        <td>${(transacoes[item].compra == 'true' ? ' - ' : ' + ')}</td>
        <td>${transacoes[item].name}</td>
        <td style='text-align:right'>R$&nbsp;${transacoes[item].valor}</td>
    </tr>`
    )
}

//quando clica pra submeter formulário, a função 'preventDefault()' previne a ação padrão do navegador que seria submeter o formulário 
function testaFormulario(e) {
    e.preventDefault();
    
    var transacoesCru = localStorage.getItem('transacoes')

    if (transacoesCru != null) {
        var transacoes = JSON.parse(transacoesCru)
    } else {;   
        var transacoes = [];
    }

    //ele mostra as transacoes e manda as informações dos inputs para seus respectivos índices na array transacao, 
    function mostraTransacoes() {
        transacoes= []
    }   

    transacoes.push({
        compra: e.target.elements['tipo_transacao'].value,
        name: e.target.elements['nome'].value,
        valor: e.target.elements['valor'].value
    })

    //transforma os objetos JS em strings JSON e cadastra os itens nos seus respectivos índices
    localStorage.setItem('transacoes', JSON.stringify(transacoes))

    //recarrega a página
    paginaInicial()
}

//Função para formatação monetária, nesse caso em moeda brasileira
function formatterCurrency(value) {
  const valueFormat = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return valueFormat;
}

//Método para formatar números de acordo com a localidade
var formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2,
});

//função que calcula e mostra o total do extrato até agora
function totalExtrato() {
    var total = 0;
    let valorInput;
  
    for (item in transacoes) {
      if (transacoes[item].tipo_transacao == "true") {
        valorInput = transacoes[item];
        total -= Number(transacoes[item].valor);
      } else {
        total += Number(transacoes[item].valor);
      }
    }
  
    if (transacoes.length > 0) {

      document.querySelector("table.tabelaExtrato conteudo_tabela").innerHTML = `
        <tr>
          <td class="tabela_rodape">Total</td>
          <td class="tabela_rodape">${formatter.format(total)}</td>
        </tr>
        `

        document.querySelector("table tfoot").innerHTML += `
        <tr>
          <td>${Math.sign(total) > 0 ? "[LUCRO]" : "[PREJUÍZO]"}</td>
        </tr>
        `
        //TENTANDO excluir a informação 'Nenhuma transação cadastrada'
        // var conteudo_tabela = document.querySelector('conteudo_tabela'); 
        // conteudo_tabela.remove('td')
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

//Função máscara monetária para o padrão BR
function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e){  
  var sep = 0;  
  var key = '';  
  var i = j = 0;  
  var len = len2 = 0;  
  var strCheck = '0123456789';  
  var aux = aux2 = '';  
  var whichCode = (window.Event) ? e.which : e.keyCode;  
  if (whichCode == 13 || whichCode == 8) return true;  
  key = String.fromCharCode(whichCode); // Valor para o código da Chave  
  if (strCheck.indexOf(key) == -1) return false; // Chave inválida  
  len = objTextBox.value.length;  
  for(i = 0; i < len; i++)  
      if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;  
  aux = '';  
  for(; i < len; i++)  
      if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);  
  aux += key;  
  len = aux.length;  
  if (len == 0) objTextBox.value = '';  
  if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;  
  if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + aux;  
  if (len > 2) {  
      aux2 = '';  
      for (j = 0, i = len - 3; i >= 0; i--) {  
          if (j == 3) {  
              aux2 += SeparadorMilesimo;  
              j = 0;  
          }  
          aux2 += aux.charAt(i);  
          j++;  
      }  
      objTextBox.value = '';  
      len2 = aux2.length;  
      for (i = len2 - 1; i >= 0; i--)  
      objTextBox.value += aux2.charAt(i);  
      objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);  
  }  
  return false;  
}