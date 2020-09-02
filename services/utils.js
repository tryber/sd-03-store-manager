 const sales = await Sales.listSales();
    res.status(200).send({ sales });
