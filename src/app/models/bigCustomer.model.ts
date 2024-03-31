export interface BigCustomer {

  /**
   * @ Description
   * Big customer may have the same properties
   * like simple customers ( TOUS LES CLIENTS )
   *
   */

  id?: string,
  username?: string,
  type?: string,
  name?: string,
  country?: string,
  city?: string,
  active?: boolean,
  email?: string,
  email_2?: string,
  status?: any,
  deleted?: boolean,
  region?: string,
  telephone1?: number,
  telephone2?: number,
  registeredBy?: string
}
