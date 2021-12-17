const submitButton = document.querySelector("form button");
const cepInput = document.querySelector("form input");
const content = document.querySelector("main");

const formatCep = (cepInput) => {
  let cep = cepInput.value;

  cep = cep.replace(" ", "");
  cep = cep.replace(".", "");
  cep = cep.trim();

  return cep;
};

const makeRequest = (cep) => {
  axios
    .get(`https://viacep.com.br/ws/${cep}/json/`)
    .then(function (response) {
      let dataList = getData(response.data);

      validateCep(response.data, cep, dataList);
    })
    .catch(function (error) {
      console.log(error);
      createLine("Ops! Algo deu errado!");
    });
};

const getData = (data) => {
  let { logradouro, bairro, complemento, localidade, uf } = data;

  let dataList = [logradouro, bairro, complemento, [`${localidade}/${uf}`]];

  return dataList;
};

const validateCep = (data, cep, dataList) => {
  if (data.erro || cep.length > 8) {
    createLine("CEP inválido! Digite novamente!");
  } else {
    dataList.forEach(function (dataElement) {
      showData(dataElement);
    });
  }
}

const createLine = (text) => {
  let line = document.createElement("p"),
    lineText = document.createTextNode(text);

  line.appendChild(lineText);
  content.appendChild(line);
};

const showData = (dataElement) => {
  createLine(dataElement);
};

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  let cep = formatCep(cepInput);

  content.innerHTML = "";

  makeRequest(cep);
});
