export default class BILLING_HEADER extends HTMLElement {
    constructor() {
        super();
    }

    static async get_component() {
        return await (await fetch('src/js/components/templates/billing.html')).text(); 
    }

    connectedCallback() {
        Promise.resolve(BILLING_HEADER.get_component()).then(html => 
            this.innerHTML = html
        ); 
    }
}

customElements.define('billing-form', BILLING_HEADER); 