import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Contact } from '../models/contacts'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  URL_API = 'http://localhost:4000/api/contacts'

  contacts: Contact[]
  selContact: Contact = {
    name: '',
    lastname: '',
    nickname: '',
    phonenumber: '',
    email: '',
    picture: ''
  }

  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<Contact[]>(this.URL_API)
  }

  createContact(contact: Contact) {
    return this.http.post(this.URL_API, contact)
  }

  updateContact(contact: Contact) {
    return this.http.put(this.URL_API + "/" + contact._id, contact)
  }

  deleteContact(_id: string) {
    return this.http.delete(this.URL_API + "/" + _id)
  }

}
