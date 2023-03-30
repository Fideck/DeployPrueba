import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export const createForm = ():FormGroup => {
  return new FormBuilder().group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    stock: ['', Validators.required],
    assurance_months: ['', Validators.required],
    industry: ['', Validators.required],
    marca: ['', Validators.required],
    purchase_price: ['', [Validators.required, Validators.min(0)]],
    selling_price: ['', [Validators.required, Validators.min(0)]],
    branchOffice: ['', Validators.required],
    supplier:['', Validators.required],
    image: [''],
  })
}
