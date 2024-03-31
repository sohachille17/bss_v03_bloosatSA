import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './shared/home/home.component';
import { NavComponent } from './shared/nav/nav.component';
import { LoginComponent } from './auth/login/login.component';
import { CustomersComponent } from './layouts/customers/customers.component';
import { RegisterComponent } from './auth/register/register.component';
import { CustomerFormComponent } from './layouts/customer-form/customer-form.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { DeletedCustomersComponent } from './layouts/deleted-customers/deleted-customers.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {NgxPrintModule} from 'ngx-print';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProductsComponent } from './layouts/products/products.component';
import { BillsComponent } from './layouts/bills/bills.component';
import { BillsRecieptComponent } from './layouts/bills-reciept/bills-reciept.component';
import { CategoryComponent } from './layouts/category/category.component';
import { BillsFormComponent } from './layouts/bills-form/bills-form.component';
import { ReceiptComponent } from './layouts/receipt/receipt.component';
import {NgConfirmModule} from 'ng-confirm-box';
import { SearchPipe } from './pipe/search.pipe';
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
import { SpinnerTwoComponent } from './spinner-two/spinner-two.component';
import { BigPaymentReceiptComponent } from './layouts/big-payment-receipt/big-payment-receipt.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    CustomersComponent,
    RegisterComponent,
    CustomerFormComponent,
    DashboardComponent,
    DeletedCustomersComponent,
    SpinnerComponent,
    ProductsComponent,
    BillsComponent,
    BillsRecieptComponent,
    CategoryComponent,
    BillsFormComponent,
    ReceiptComponent,
    SearchPipe,
    BlooServiceComponent,
    SouscriptionKAFComponent,
    SouscriptionIWAYComponent,
    CustomerPaymentComponent,
    UniqueCustomerBillComponent,
    PaymentReceiptComponent,
    BlooStarComponent,
    MailReceiptComponent,
    LogsComponent,
    TarifficationsComponent,
    BigCustomersComponent,
    CustomerSiteComponent,
    ForfaitComponent,
    BigUstomerReceiptComponent,
    UniqueBigCustomerBillComponent,
    SubscriptionBigComponent,
    BigPaymentsComponent,
    BigMailComponent,
    SpinnerTwoComponent,
    BigPaymentReceiptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgConfirmModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxPrintModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
