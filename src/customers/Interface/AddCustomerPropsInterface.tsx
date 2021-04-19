export interface AddCustomerPropsInterface {
    saveCustomer(customer: {
        firstname: string;
        lastname: string;
        streetaddress: string;
        postcode: string;
        city: string;
        email: string;
        phone: string;
    }): void;
}