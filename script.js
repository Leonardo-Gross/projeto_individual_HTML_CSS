const transactionType = document.getElementById('transactionType');
const transactionName = document.getElementById('transactionName');
const transactionValue = document.getElementById('transactionValue');

const addTransaction = document.getElementById('addTransaction');
const deleteTransaction = document.getElementById('deleteTransaction');

const tbody = document.getElementById('tbody');
const result = document.getElementById('result');

const listTransactions = [];

let company = 0;
let sale = 0;
let resultValue = 0;

const functionAddTransaction = () => {
  let transaction = {
    type: transactionType.value,
    name: transactionName.value,
    value: transactionValue.value
  };

  listTransactions.push(transaction);

  loadTransaction();

  transactionType.value = 'Compra';
  transactionName.value = '';
  transactionValue.value = '';
};

const functionDeleteTransaction = () => {
  while (listTransactions.length) {
    listTransactions.pop();
  }

  loadTransaction();
};

const createElement = (tag, innerText = '') => {
  const element = document.createElement(tag);
  element.innerHTML = innerText;

  return element;
}

const createTable = (transaction) => {
  const {
    type,
    name,
    value
  } = transaction;

  const tr = createElement('tr');

  let tdType;
  if (type == 'Compra') {
    tdType = createElement('td', '-');
    company += parseInt(value);

  } else {
    tdType = createElement('td', '+');
    sale += parseInt(value);
  }

  const tdName = createElement('td', name);
  const tdvalue = createElement('td', `R$ ${value}`);

  tdType.classList.add('positivo_negativo');
  tdvalue.classList.add('elem_direita');

  tr.appendChild(tdType);
  tr.appendChild(tdName);
  tr.appendChild(tdvalue);

  return tr;
}

const loadTransaction = async () => {
  tbody.innerHTML = '';

  for (let index = 0; index < listTransactions.length; index++) {
    const tr = createTable(listTransactions[index]);
    tbody.appendChild(tr);
  }

  resultValue = sale - company;
  result.textContent = `R$: ${resultValue}`;

  resultValue = 0;
  company = 0;
  sale = 0;
}

addTransaction.addEventListener('click', functionAddTransaction);
deleteTransaction.addEventListener('click', functionDeleteTransaction);


loadTransaction();