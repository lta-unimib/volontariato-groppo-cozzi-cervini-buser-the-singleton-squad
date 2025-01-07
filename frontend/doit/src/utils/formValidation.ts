export const validateVATNumber = (vat: string): boolean => {
    const vatRegex = /^[0-9]{11}$/;
    return vatRegex.test(vat);
};

export const validateWebSite = (website: string): boolean => {
    const websiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return websiteRegex.test(website);
};