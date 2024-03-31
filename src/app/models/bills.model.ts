import { ItemsQuantities } from "./items.model";

export interface Bills {

    customer_id?: string,
    dateLimit?: string,
    billNumber?: string,
    compantName?: string,
    serviceAddress?: string,
    postalAddress?: string,
    phoneNumber?: string,
    customerEmailAddress?: string,
    websiteLink?: string,
    type?:string,
    currency?:string,
    tvaAmount?:string,
    discount?: string,
    sub_total?: string,
    total?: string,
    status?: string,
    small_note?: string,


    // items quantities;
    invoice_item?: Array<ItemsQuantities>;




}