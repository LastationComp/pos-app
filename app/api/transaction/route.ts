import { promises as fs } from 'fs';
export async function GET() {
  const jsonPathDatabase = process.cwd() + '/app/_lib/database/db.json';
  const jsonPathTransaction = process.cwd() + '/app/_lib/database/transaction.json';

   const noParseDB = await fs.readFile(jsonPathDatabase, 'utf8');
   const noParseDBTrx = await fs.readFile(jsonPathTransaction, 'utf8');

   const parsedDatabase = JSON.parse(noParseDB);
   const parsedTrx = JSON.parse(noParseDBTrx);
   const products: any[] = parsedDatabase.products;
   const transaction: any[] = parsedTrx.product_selected;

   

   return Response.json({
    transaction_list: transaction
   })
}


