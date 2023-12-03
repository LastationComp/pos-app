import { promises as fs } from 'fs';

export async function POST(req: Request, route: { params: { barcode: string } }) {
  const { selling_unit, qty, price, discount, buy_price, change, sub_total } = await req.json();
  const jsonPathDatabase = process.cwd() + '/app/_lib/database/db.json';
  const jsonPathTransaction = process.cwd() + '/app/_lib/database/transaction.json';

  const noParseDB = await fs.readFile(jsonPathDatabase, 'utf8');
  const noParseDBTrx = await fs.readFile(jsonPathTransaction, 'utf8');

  const parsedDatabase = JSON.parse(noParseDB);
  const parsedTrx = JSON.parse(noParseDBTrx);
  const products: any[] = parsedDatabase.products;
  const transaction: any[] = parsedTrx.product_selected;

  const indexSelectedProduct = transaction.findIndex((data) => data.barcode === route.params.barcode)
  let oldSelectedProduct = transaction.filter((data) => data.barcode === route.params.barcode)[0];

  let total_price: number = 0

  transaction.forEach((data) => {
    total_price += data.price
  })
  if (!oldSelectedProduct)
    return Response.json(
      {
        message: 'Data Not Found',
      },
      { status: 404 }
    );

  transaction[indexSelectedProduct] = {
    ...oldSelectedProduct,
    selling_unit,
    qty,
    price: qty * price,
  };

  parsedTrx.product_selected = transaction;
  parsedTrx.discount = discount ?? 0
  parsedTrx.buy_price = buy_price ?? 0
  parsedTrx.change = total_price - buy_price
  parsedTrx.sub_total = total_price

  await fs.writeFile(jsonPathTransaction, JSON.stringify(parsedTrx));
  return Response.json({
    message: 'Product successfully Edit',
    parsedTrx: parsedTrx,
  });
}
