import { promises as fs } from 'fs';

export async function POST(req: Request, route: { params: { barcode: string } }) {
  const jsonPathDatabase = process.cwd() + '/app/_lib/database/db.json';
  const jsonPathTransaction = process.cwd() + '/app/_lib/database/transaction.json';

  const noParseDB = await fs.readFile(jsonPathDatabase, 'utf8');
  const noParseDBTrx = await fs.readFile(jsonPathTransaction, 'utf8');

  const parsedDatabase = JSON.parse(noParseDB);
  const parsedTrx = JSON.parse(noParseDBTrx);
  const products: any[] = parsedDatabase.products;
  const transaction: any[] = parsedTrx.product_selected;

  const selectedProduct = products.filter((data) => data.barcode === route.params.barcode)[0];

  if (!selectedProduct)
    return Response.json(
      {
        message: 'Data Not Found',
      },
      { status: 404 }
    );

  transaction.push({
    product_name: selectedProduct.product_name,
    barcode: selectedProduct.barcode,
    select_selling_units: selectedProduct.selling_units,
    qty: 1
  });

  parsedTrx.product_selected = transaction;

  await fs.writeFile(jsonPathTransaction, JSON.stringify(parsedTrx));
  return Response.json({
    message: 'Product successfully added',
    parsedTrx: parsedTrx,
  });
}

export async function DELETE(req: Request, route: { params: { barcode: string } }) {
  const jsonPathTransaction = process.cwd() + '/app/_lib/database/transaction.json';
  const noParseDBTrx = await fs.readFile(jsonPathTransaction, 'utf8');

  const parsedTrx = JSON.parse(noParseDBTrx);
  const transaction: any[] = parsedTrx.product_selected;

  const selectedProduct = transaction.filter((data) => data.barcode === route.params.barcode)[0];

  const newTransaction = transaction.filter((data) => data.barcode !== route.params.barcode);
  if (!selectedProduct)
    return Response.json(
      {
        message: 'Data Not Found',
      },
      { status: 404 }
    );


  parsedTrx.product_selected = newTransaction;

  await fs.writeFile(jsonPathTransaction, JSON.stringify(parsedTrx));
  return Response.json({
    message: 'Product successfully Deleted',
    parsedTrx: parsedTrx,
  });
}