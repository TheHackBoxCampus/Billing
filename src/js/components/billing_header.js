export default class BILLING_HEADER extends HTMLElement {
  constructor() {
    super();
  }

  static async get_component() {
    return await (
      await fetch("src/js/components/templates/billing.html")
    ).text();
  }

  handleEvent(e) {
    e.type == "click" ? this.getInfo(e) : undefined;
  }

  templateBill(data) {
    if(!data) return;
    this.bill = this.querySelector(".bill"); 

    let tmp = /* html */`
        <span>Numero de factura: ${data.N_bill}</span><br>
        <span>Fecha de la compra: ${data.date_buy}</span><br>
        <span>Vendedor: ${data.seller}</span><br>
        <span>Identificación del cliente: ${data.ID_user}</span><br>
        <span>Nombre completo: ${data.full_name}</span><br>
        <span>Correo electronico: ${data.email}</span><br>
        <span>Dirección: ${data.address}</span><br>
        <span>Numero de contacto: ${data.contact_number}</span><br>
        <span>Codigo de producto: ${data.cod_product}</span><br>
        <span>Nombre de producto: ${data.name_product}</span><br>
        <span>Cantidad: ${data.amount}</span><br>
        <span>Valor de producto por unidad: ${data.value_init}</span>
    `; 

    this.bill.insertAdjacentHTML('beforeend', tmp); 
  }

  amount(element) {
    let amount = this.querySelector('[name="amount"]');
    let currentValue = Number(amount.value);

    switch (element.target.textContent) {
      case "+":
        currentValue++;
        amount.value = currentValue;
        break;
      case "-":
        currentValue--;
        amount.value == 0 ? (amount.value = 0) : (amount.value = currentValue);
        break;
    }
  }

  addDataForm(inputs) {
    let data = new FormData();
    const dataForm = {};

    for (let input = 0; input < inputs.length; input++) {
        if(inputs[input].value == '') return window.alert('rellena los campos'); 
        else  {
            data.append(inputs[input].name, inputs[input].value);
        }
    }

    for (const [input, inputValue] of data.entries()) {
      dataForm[input] = inputValue;
    }        
    return dataForm;
  }

  getInfo(e) {
    this.inputs_product = this.querySelectorAll(".input_products");
    let res = this.addDataForm(this.inputs_product);
    this.templateBill(res); 
}

  connectedCallback() {
    Promise.resolve(BILLING_HEADER.get_component()).then((html) => {
      this.innerHTML = html;
      this.btnBuy = this.querySelector("#buy");
      this.btnBuy.addEventListener("click", this.handleEvent.bind(this));
      this.btnPlus = this.querySelector("#amount-plus");
      this.btnLess = this.querySelector("#amount-less");
      this.btnPlus.addEventListener("click", this.amount.bind(this));
      this.btnLess.addEventListener("click", this.amount.bind(this));
    });
  }
}

customElements.define("billing-form", BILLING_HEADER);
