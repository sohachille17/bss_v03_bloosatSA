import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { CustomersComponent } from './layouts/customers/customers.component';
import { CustomerFormComponent } from './layouts/customer-form/customer-form.component';
import { DeletedCustomersComponent } from './layouts/deleted-customers/deleted-customers.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProductsComponent } from './layouts/products/products.component';
import { CategoryComponent } from './layouts/category/category.component';
import { BillsComponent } from './layouts/bills/bills.component';
import { BillsFormComponent } from './layouts/bills-form/bills-form.component';
import { ReceiptComponent } from './layouts/receipt/receipt.component';
import { BlooServiceComponent } from './layouts/bloo-service/bloo-service.component';
import { SouscriptionKAFComponent } from './layouts/souscription-kaf/souscription-kaf.component';
import { SouscriptionIWAYComponent } from './layouts/souscription-i-way/souscription-i-way.component';
import { CustomerPaymentComponent } from './layouts/customer-payment/customer-payment.component';
import { UniqueCustomerBillComponent } from './layouts/unique-customer-bill/unique-customer-bill.component';
import { PaymentReceiptComponent } from './layouts/payment-receipt/payment-receipt.component';
import { BlooStarComponent } from './layouts/bloo-star/bloo-star.component';
import { MailReceiptComponent } from './shared/mail-receipt/mail-receipt.component';
import { LogsComponent } from './layouts/logs/logs.component';
import { TarifficationsComponent } from './layouts/tariffications/tariffications.component';
import { BigCustomersComponent } from './layouts/big-customers/big-customers.component';
import { CustomerSiteComponent } from './layouts/customer-site/customer-site.component';
import { ForfaitComponent } from './layouts/forfait/forfait.component';
import { BigUstomerReceiptComponent } from './layouts/big-ustomer-receipt/big-ustomer-receipt.component';
import { UniqueBigCustomerBillComponent } from './layouts/unique-big-customer-bill/unique-big-customer-bill.component';
import { SubscriptionBigComponent } from './layouts/subscription-big/subscription-big.component';
import { BigPaymentsComponent } from './layouts/big-payments/big-payments.component';
import { BigMailComponent } from './layouts/big-mail/big-mail.component';
import { BigPaymentReceiptComponent } from './layouts/big-payment-receipt/big-payment-receipt.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,

    canActivate: [AuthGuardService],
    children: [

      {
        path: '', component: DashboardComponent
      },
      {
        path: 'customers', component: CustomersComponent
      },
      {
        path: 'customers/:id', component: CustomersComponent
      },
      {
        path: 'customers-forms', component: CustomerFormComponent
      },
      {
        path: 'deleted-customers', component: DeletedCustomersComponent
      },
      {
        path: 'register-user', component: RegisterComponent
      },
      {
        path: 'products', component: ProductsComponent
      },
      {
        path: 'products/:id', component: ProductsComponent
      },
      {
        path: 'category', component: CategoryComponent
      },
      {
        path: 'bills', component: BillsComponent
      },
      {
        path: 'bills-form', component: BillsFormComponent
      },
      {
        path: 'bills-form/:id', component: BillsFormComponent
      },
      {
        path: 'receipt', component: ReceiptComponent
      },
      {
        path: 'receipt/:id', component: ReceiptComponent
      },{
        path: 'service', component: BlooServiceComponent
      },
      {
        path: 'souscription-KAF', component: SouscriptionKAFComponent
      },
      {
        path: 'souscription-KAF/:id', component: SouscriptionKAFComponent
      },
      {
        path: 'souscription-iWay', component: SouscriptionIWAYComponent
      },
      {
        path: 'customer-payment', component: CustomerPaymentComponent
      },
      {
        path: 'customer-payment/:id', component: CustomerPaymentComponent
      },
      {
        path: 'customer-unique-bill', component: UniqueCustomerBillComponent
      },
      {
        path: 'customer-unique-bill/:id', component: UniqueCustomerBillComponent
      },
      {
        path: 'payment-receipt', component: PaymentReceiptComponent
      },
      {
        path: 'payment-receipt/:id', component: PaymentReceiptComponent
      },
      {
        path:'i-way-soubscription', component: SouscriptionIWAYComponent
      },
      {
        path:'i-way-soubscription/:id', component: SouscriptionIWAYComponent
      },
      {
        path:'bloo-star', component: BlooStarComponent
      },
      {
        path:'bloo-star/:id', component: BlooStarComponent
      },
      {
        path: 'logs', component: LogsComponent
      },
      {
        path: 'tariffications', component: TarifficationsComponent
      },
      {
        path: 'big-customers', component: BigCustomersComponent
      },
      {
        path: 'big-customers/:id', component: BigCustomersComponent
      },
      {
        path: 'customerSite', component: CustomerSiteComponent
      },
      {
        path: 'customerSite/:id', component: CustomerSiteComponent
      },
      {
        path: 'forfaits', component: ForfaitComponent
      },
      {
        path: 'big-customer-reciept', component: BigUstomerReceiptComponent
      },
      {
        path: 'big-customer-reciept/:id', component: BigUstomerReceiptComponent
      },
      {
        path: 'unique-big-customer-bill', component: UniqueBigCustomerBillComponent
      },
      {
        path: 'unique-big-customer-bill/:id', component: UniqueBigCustomerBillComponent
      },
      {
        path: 'big-subscription', component: SubscriptionBigComponent
      },
      {
        path: 'big-subscription/:id', component: SubscriptionBigComponent
      },
      {
        path:'big-payments', component: BigPaymentsComponent
      },
      {
        path:'big-payments/:id', component: BigPaymentsComponent
      },
      {
        path: 'big-payment-receipte', component: BigPaymentReceiptComponent
      },
      {
        path: 'big-payment-receipte/:id', component: BigPaymentReceiptComponent
      },





    ]



  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'spinner', component: SpinnerComponent
  },
  {
    path: 'mail_reciept', component: MailReceiptComponent
  },
  {
    path: 'mail_reciept/:id', component: MailReceiptComponent
  },
  {
    path: 'big-customer-invoice', component: BigMailComponent
  },
  {
    path: 'big-customer-invoice/:id', component: BigMailComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
  })
  export class AppRoutingModule { }
