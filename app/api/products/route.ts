import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import {products} from '@/app/_lib/db.json'
export async function GET(req: Request) {
  const data = products;
  const url = new URL(req.url);
  const urlPage: number = Number(url.searchParams.get('page') ?? 1);
  const paginate: number = !Number(url.searchParams.get('paginate')) ? data.length : Number(url.searchParams.get('paginate'));
  const page: number = Math.abs(Math.ceil(data.length / paginate));
  const pageNow = {
    start: (paginate * urlPage) - paginate ,
    end: paginate * urlPage,
  };
  const paginated = data.slice(pageNow.start, pageNow.end)
  return Response.json({
    paginate: pageNow,
    total_data: data.length,
    total_page: page,
    products: paginated,
  });
}

export async function POST(req: Request) {
  const jsonPath = process.cwd() + '/app/_lib/db.json';
  const file = await fs.readFile(jsonPath, 'utf8');
  const data = JSON.parse(file);

  const { name } = await req.json();

  if (!name)
    return Response.json({
      success: false,
      customer: data.customers[data.customers.length - 1],
    });

  const customer_code_first: string = data.customers[data.customers.length - 1].customer_code;
  const customer_code_seconds = customer_code_first.toString().split('_');
  const customer_code_final = Number(customer_code_seconds[1]) + 1;
  await data.customers.push({
    id: uuidv4(),
    customer_code: 'MM_' + customer_code_final.toString().padStart(4, '0'),
    name: name,
  });
  await fs.writeFile(jsonPath, JSON.stringify(data));
  return Response.json({
    success: true,
    customer: data.customers[data.customers.length - 1],
  });
}
