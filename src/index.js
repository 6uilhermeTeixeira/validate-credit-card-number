// Function to validate credit card number using Luhn algorithm
function validateCreditCardNumber(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

// Function to determine the card type (flag) using regex
function determineCardType(cardNumber) {
    const cardPatterns = {
        "Visa": /^4[0-9]{12}(?:[0-9]{3})?$/,
        "Visa 16 Digits": /^4[0-9]{15}$/,
        "Mastercard": /^(5[1-5][0-9]{14}|2(2[2-9][0-9]{12}|[3-6][0-9]{13}|7[01][0-9]{12}|720[0-9]{12}))$/,
        "Elo": /^(4011|4312|4389|4514|4576|5041|5066|5067|5090|6277|6362|6363|6500|6504|6505|6516|6550)[0-9]{12}$/,
        "American Express": /^3[47][0-9]{13}$/,
        "Discover": /^(6011|65|64[4-9])[0-9]{12}$/,
        "Hipercard": /^606282[0-9]{10}$/,
        "Diners Club": /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        "EnRoute": /^(2014|2149)[0-9]{11}$/,
        "JCB": /^(?:2131|1800|35\d{3})\d{11}$/,
        "Voyager": /^8699[0-9]{11}$/,
        "Aura": /^50[0-9]{14,17}$/
    };

    for (const [flag, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(cardNumber)) {
            return flag;
        }
    }
    return "Unknown";
}

// Main function to validate card and determine card type
function validateCard(cardNumber) {
    if (validateCreditCardNumber(cardNumber)) {
        const cardType = determineCardType(cardNumber);
        return {
            isValid: true,
            flag: cardType
        };
    } else {
        return {
            isValid: false,
            flag: null
        };
    }
}

// Example usage
const cardNumber = "4539339619664604";
const result = validateCard(cardNumber);
console.log(result);