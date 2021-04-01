import { Component, OnInit } from '@angular/core'
import { ContactService } from '../../services/contact.service'
import { NgForm } from '@angular/forms'
import { Contact } from 'src/app/models/contacts'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts()
  }

  resetForm(form: NgForm) {
    form.reset()
    this.getContacts()
  }

  getContacts() {
    this.contactService.getContacts().subscribe(
      (res) => {
        this.contactService.contacts = res
      },
      (err) => console.log(err)
    )
  }

  addContact(form: NgForm) {
    if(form.value._id) {
      this.contactService.updateContact(form.value).subscribe(
        (res) => {
          this.getContacts()
          form.reset()
        },
        (err) => console.error(err)
      )
    } else {
      this.contactService.createContact(form.value).subscribe(
        (res) => {
          this.getContacts()
          form.reset()
        },
        (err) => console.error(err)
      )
    }
  }

  deleteContact(id: string) {
    if (confirm("¿Está seguro de borrar este contacto?")) {
      this.contactService.deleteContact(id).subscribe(
        (res) => {
          this.getContacts()
        },
        (err) => console.error(err)
      )
    }
  }

  editContact(contact: Contact) {
    this.contactService.selContact = contact
  }

}
