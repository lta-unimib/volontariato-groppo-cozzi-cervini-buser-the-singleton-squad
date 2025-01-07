export const validateVATNumber = (vat: string): boolean => {
    const vatRegex = /^(AT|BE|BG|CY|CZ|DE|DK|EE|EL|ES|FI|FR|HR|HU|IE|IT|LT|LU|LV|MT|NL|PL|PT|RO|SE|SI|SK|GB|GR)[0-9]{8,12}$/;
    return vatRegex.test(vat);
};

export const validateWebSite = (website: string): boolean => {
    const websiteRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/;
    return websiteRegex.test(website);
};