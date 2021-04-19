export interface EditCustomerPropsInterface {

    customer: {
        firstname: string;
        lastname: string;
        streetaddress: string;
        postcode: string;
        city: string;
        email: string;
        phone: string;
        links: { href: string }[];
    };

    updateCustomer: (
        arg0: {
            firstname: string;
            lastname: string;
            streetaddress: string;
            postcode: string;
            city: string;
            email: string;
            phone: string;
        },
        arg1: any
    ) => void;
}