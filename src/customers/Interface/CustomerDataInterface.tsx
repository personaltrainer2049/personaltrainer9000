export interface CustomerDataInterface {
    data: {
        firstname: string;
        lastname: string;
        streetaddress: string;
        postcode: string;
        city: string;
        email: string;
        phone: string;
        links: {
            href: string; }[];
    };
}