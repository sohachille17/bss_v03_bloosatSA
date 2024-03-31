/**
 * @author SOH ACHILLE
 * @Description
 * -> Ok welcome , here we established our URL BLOOSAT connection
 * from our backend api feel free to getr in touch with me
*/


/**
 *@author SOH ACHILLE
 *@description environment for secret connection.
 *
 */
//const laptopConnection = "http://192.168.1.104:8000/api/"
const laptopConnection = "https://ssobloosat.com/api_bss_v3/public/api/"

export const environmentAPI = {
    production: true,
    development: false,
    environment: {

      BLOOSAT_BSS_URL_CONNECTION: laptopConnection
    }
  };

/**
 *
 *@author SOH ACHILLE\
 *@description environment for secret connection.
 */
