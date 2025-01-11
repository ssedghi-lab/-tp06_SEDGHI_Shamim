exports.get = (req, res) => {
    const products = [
        { ref: "1234", libelle: "productA", prix: 10 },
        { ref: "5678", libelle: "productB", prix: 20 }
    ];

    res.setHeader('Content-Type', 'application/json');
    res.send(products);
};