# 🌐 Simple REST API with Node.js and Express.js

Welcome to my REST API project! This repository contains the source code for a basic REST API implemented in Node.js and Express.js. The API offers a variety of useful services, from QR code generation to country and book information.

## Available Endpoints 🛤️
- **Generate QR Code:**
  - `GET /qrcode?text=your_text`: Generates a QR code for the provided text.

- **Binary Encoding:**
  - `GET /binEncode?text=your_text`: Encodes a text string to binary.

- **Binary Decoding:**
  - `GET /binDecode?text=your_binary`: Decodes binary to a text string.

- **Password Generator:**
  - `GET /passGen?length=optional_length`: Generates a random password with optional length.

- **Lorem Ipsum Generator:**
  - `GET /loremIpsum?count=optional_count&units=optional_units`: Generates Lorem Ipsum text with optional count and units.

- **UUID Generator:**
  - `GET /uuidGen`: Generates a unique UUID.

- **Credit Card Validation:**
  - `GET /validateCreditCard?cardNumber=your_card_number`: Validates a credit card number using the Luhn algorithm.

- **Country Information:**
  - `GET /countryInfo?country=country_name`: Retrieves detailed information about a country using the RestCountries API.

- **Book Information:**
  - `GET /bookInfo?title=book_title`: Retrieves information about a book using the Open Library API.

## Contributions 🤝
Contributions are welcome! If you find bugs, improvements, or have ideas for new services, feel free to open an issue or submit a pull request.

## Important Notes 📝
- This is a simple implementation for educational purposes.
- Make sure to have Node.js installed on your system before running the application.

I hope you find this simple API useful! If you have any questions, feel free to contact me!