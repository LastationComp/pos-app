import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { string as strlost, number as numlost } from '@/app/_lib/database/randomString.json';

export async function POST(req: Request) {
  function randomString(num: number) {
    const chars = strlost;
    let result = '';
    for (let i = 0; i < num; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }
  function randomNumber(num: number) {
    const chars = numlost;
    let result = '';
    for (let i = 0; i < num; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  const jsonPath = process.cwd() + '/app/_lib/database/db.json';
  const file = await fs.readFile(jsonPath, 'utf8');
  const data = JSON.parse(file);

  const { many } = await req.json();

  const customer_code_first: string = data.customers[data.customers.length - 1].customer_code;
  const customer_code_seconds = customer_code_first.toString().split('_');
  const customer_code_final = Number(customer_code_seconds[1]) + 1;

  for (let i = 0; i < many; i++) {
    await data.products.push({
      barcode: randomNumber(15),
      product_name: randomString(9),
      stock: randomNumber(2),
      selling_units: [
        { selling_unit: 'kardus', price: randomNumber(5), stock: randomNumber(2) },
        { selling_unit: 'lembar', price: randomNumber(5), stock: randomNumber(2) },
        { selling_unit: 'biji', price: randomNumber(5), stock: randomNumber(2) },
      ],
    });
  }
  await fs.writeFile(jsonPath, JSON.stringify(data));
  return Response.json({
    success: true,
  });
}
