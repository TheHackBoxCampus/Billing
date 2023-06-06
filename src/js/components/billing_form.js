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

  async addProduct(e) {
    this.productContainer = this.querySelector('#products'); 
    let html = await (await fetch('src/js/components/templates/product.html')).text(); 
    let parse = new DOMParser().parseFromString(html, "text/html");
    let arr = [...parse.body.childNodes]; 
    let number = JSON.parse(localStorage.getItem('newProduct')); 
    let HTMLRender; 
    
     for(let x = 0; x < arr.length; x++){
       for(let y = 0; y < arr[x].childNodes.length; y++) {
           let setNumber = parseInt(number) + 1; 
           localStorage.setItem("newProduct", setNumber); 
           HTMLRender = arr[x].childNodes[y].nextElementSibling; 
           HTMLRender.setAttribute('id', `product_${setNumber}`);
           break;
        }
     }
   
    this.productContainer.insertAdjacentElement('beforeend', HTMLRender); 
    this.amount();
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
     this.bill.classList.add('bg-secondary');
     this.bill.insertAdjacentHTML('beforeend', tmp); 
  }

  amount() {
    let buttons = this.querySelectorAll('.amount'); 
    let copy = [...buttons]; 
    
    copy.map(button => {
      button.onclick = function() {
        let signe = button.innerHTML
        let amount = button.parentNode.parentNode.querySelector('[name="amount"]')
        let currentValue = Number(amount.value);

        switch (signe) {
              case "+":
                  currentValue++;
                  amount.value = currentValue;
                  break;
              case "-":
                  currentValue--;
                  let elementForRemove = button.parentNode.parentNode; 
                  amount.value == 0 ? elementForRemove.parentNode.removeChild( ): 
                  (amount.value = currentValue);
                  break;
            }
        }
    })
  }

  addDataForm(inputs) {
    let data = new FormData();
    const dataForm = {};

    for (let input = 0; input < inputs.length; input++) {
        if(inputs[input].value == '') return window.alert('rellena los campos'); 
        else data.append(inputs[input].name, inputs[input].value);
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
      localStorage.setItem('newProduct', "1"); 
      this.innerHTML = html;
      this.btnBuy = this.querySelector("#buy");
      this.btnBuy.addEventListener("click", this.handleEvent.bind(this));
      this.btnAddProduct = this.querySelector('#add'); 
      this.btnAddProduct.addEventListener('click', this.addProduct.bind(this)); 
      this.amount(); 
    });
  } 
}

customElements.define("billing-form", BILLING_HEADER);
