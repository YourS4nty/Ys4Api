__path = process.cwd()
const { Router } = require('express');
const axios = require('axios');
const qrcode = require('qrcode')
const fs = require('fs');
const { loremIpsum } = require('lorem-ipsum');
const { v4: uuidv4 } = require('uuid');
const router = Router()

loghandler = {
    error: {
        status: false,
        creator: `Santy`,
        message: 'Erorr!'
    }
}

/* Routes */

// router.get('/test', (req, res) => {
// if (error) return res.sendFile(__path + '/src/Views/error.html')
//     const data = {
//         "name": 'santiago',
//         "webSite" : "www.example.com"
//     }
//     res.json(data)
// })

router.get('/qrcode', async (req, res) => {
    var text = req.query.text
    if (!text) return res.json(loghandler.error)
    var qr = await qrcode.toDataURL(text.slice(0, 2048), { scale: 10 })
    var hasil = qr.split`,`[1]
    fs.writeFileSync(__path + '/tmp/qr.png', hasil, 'base64')
    res.sendFile(__path + '/tmp/qr.png')
})

// Encoder: Convierte una cadena de texto a binario
function textToBinary(text) {
    return Buffer.from(text, 'utf-8').toString('base64');
}

router.get('/binEncode', (req, res) => {
    const text = req.query.text;
    if (!text) return res.json({ error: 'Textt not found!!' });

    const binary = textToBinary(text);
    let data = {
        status: 200,
        creator: "@yours4nty",
        yourString: text,
        encodedText: binary
    }
    res.json(data);
});

// Decoder: Convierte binario a una cadena de texto
function binaryToText(binary) {
    return Buffer.from(binary, 'base64').toString('utf-8');
}

router.get('/binDecode', (req, res) => {
    const binary = req.query.text;
    if (!binary) return res.json({ error: 'Código binario no proporcionado' });

    const text = binaryToText(binary);
    let data = {
        status: 200,
        creator: "@yours4nty",
        yourBinary: binary,
        decodedText: text
    }
    res.json(data);
});

router.get('/passGen', (req, res) => {
    const passwordLength = req.query.length || 10;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    let data = {
        status: 200,
        creator: "@yours4nty",
        length: passwordLength,
        yourPassword: password
    }
    res.json(data);
});


router.get('/loremIpsum', (req, res) => {
    const { count, units } = req.query;

    const paragraphCount = count ? parseInt(count) : 3;
    const loremUnits = units || 'paragraphs';

    const loremText = loremIpsum({ count: paragraphCount, units: loremUnits });

    const data = {
        status: 200,
        creator: "@yours4nty",
        lorem: {
            count: paragraphCount,
            units: loremUnits,
            text: loremText
        },
        settings: "you can use: paragraphs or sentences"
    };

    res.json(data);
});


router.get('/uuidGen', (req, res) => {
    const uuid = uuidv4();
    let data = {
        status: 200,
        creator: "@yours4nty",
        uuid: uuid
    }
    res.json(data);
});

router.get('/validateCreditCard', (req, res) => {
    const { cardNumber } = req.query;

    if (!cardNumber) {
        return res.status(400).json({ error: 'Número de tarjeta de crédito no proporcionado' });
    }

    // Elimina espacios en blanco y verifica si el número contiene solo dígitos
    const sanitizedCardNumber = cardNumber.replace(/\s/g, '');
    if (!/^\d+$/.test(sanitizedCardNumber)) {
        return res.status(400).json({ error: 'El número de tarjeta de crédito debe contener solo dígitos' });
    }

    // Aplica el algoritmo de Luhn para validar el número de tarjeta de crédito
    const digits = sanitizedCardNumber.split('').map(Number);
    const reversedDigits = digits.reverse();

    let sum = 0;
    for (let i = 0; i < reversedDigits.length; i++) {
        let digit = reversedDigits[i];
        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
    }

    const isValid = sum % 10 === 0;

    let data = {
        status: 200,
        creator: "@yours4nty",
        isValid: isValid
    };

    res.json(data);
});

router.get('/countryInfo', async (req, res) => {
    const { country } = req.query;

    if (!country) {
        return res.status(400).json({ error: 'País no proporcionado' });
    }

    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
        const countryInfo = response.data[0];

        const formattedResponse = {
            status: 200,
            creator: "@yours4nty",
            countryInfo: {
                name: {
                    common: countryInfo.name.common,
                    official: countryInfo.name.official,
                    nativeName: countryInfo.name.nativeName,
                },
                flag: countryInfo.flag,
                capital: countryInfo.capital,
                tld: countryInfo.tld,
                cca2: countryInfo.cca2,
                ccn3: countryInfo.ccn3,
                cca3: countryInfo.cca3,
                cioc: countryInfo.cioc,
                independent: countryInfo.independent,
                status: countryInfo.status,
                unMember: countryInfo.unMember,
                currencies: countryInfo.currencies,
                idd: countryInfo.idd,
                altSpellings: countryInfo.altSpellings,
                region: countryInfo.region,
                subregion: countryInfo.subregion,
                languages: countryInfo.languages,
                latlng: countryInfo.latlng,
                landlocked: countryInfo.landlocked,
                borders: countryInfo.borders,
                area: countryInfo.area,
                demonyms: countryInfo.demonyms,
                maps: countryInfo.maps,
                population: countryInfo.population,
                gini: countryInfo.gini,
                fifa: countryInfo.fifa,
                car: countryInfo.car,
                timezones: countryInfo.timezones,
                continents: countryInfo.continents,
                flags: countryInfo.flags,
                coatOfArms: countryInfo.coatOfArms,
                startOfWeek: countryInfo.startOfWeek,
                capitalInfo: {
                    latlng: countryInfo.capitalInfo.latlng,
                },
                translations: countryInfo.translations,
            },
        };

        res.json(formattedResponse);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener información del país' });
    }
});

router.get('/bookInfo', async (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({ error: 'Título del libro no proporcionado' });
    }

    try {
        const response = await axios.get(`https://openlibrary.org/search.json?title=${title}`);
        const bookInfo = response.data.docs[0];

        // Formatea la respuesta para que sea más legible
        const formattedResponse = {
            status: 200,
            creator: "@yours4nty",
            bookInfo: {
                title: bookInfo.title,
                author_name: bookInfo.author_name,
                first_publish_year: bookInfo.first_publish_year,
                subject: bookInfo.subject,
                language: bookInfo.language,
                publish_date: bookInfo.publish_date,
                publisher: bookInfo.publisher,
                cover_i: bookInfo.cover_i,
                edition_count: bookInfo.edition_count,
                publish_year: bookInfo.publish_year,
                publish_month: bookInfo.publish_month,
                publish_day: bookInfo.publish_day,
                author_key: bookInfo.author_key,
                isbn: bookInfo.isbn,
                oclc: bookInfo.oclc,
                lccn: bookInfo.lccn,
                publish_place: bookInfo.publish_place,
                publishing_format: bookInfo.publishing_format,
                number_of_pages: bookInfo.number_of_pages,
                publishers: bookInfo.publishers,
                works: bookInfo.works,
                subject_places: bookInfo.subject_places,
            }
        };

        res.json(formattedResponse);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener información del libro' });
    }
});

module.exports = router;


module.exports = router