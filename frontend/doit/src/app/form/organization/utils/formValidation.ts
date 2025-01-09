export const validateVATNumber = (vat: string): boolean => {
    const vatPatterns = [
        /^(AT|BE|BG|CY|CZ|DE|DK|EE|ES|FI|FR)\d{8,12}$/,
        /^(HR|HU|IE|IT|LT|LU|LV|MT|NL|PL|PT)\d{8,12}$/,
        /^(RO|SE|SI|SK)\d{8,12}$/
    ];
    return vatPatterns.some(pattern => pattern.test(vat));
};

export const validateWebSite = (website: string): boolean => {
    const websiteRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/;
    return websiteRegex.test(website);
};