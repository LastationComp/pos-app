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

  

  for (let i = 0; i < many; i++) {
    const customer_code_first: string = data.customers[data.customers.length - 1].customer_code;
    const customer_code_seconds = customer_code_first.toString().split('_');
    const customer_code_final = Number(customer_code_seconds[1]) + 1;
    await data.customers.push({
      id: uuidv4(),
      customer_code: 'MM_' + customer_code_final?.toString().padStart(4, '0'),
      name: randomString(12),
      email: randomString(5) + '@gmail.com',
      phone: randomNumber(9),
      point: randomNumber(3)
    });
  }
  await fs.writeFile(jsonPath, JSON.stringify(data));
  return Response.json({
    success: true,
  });
}
