import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { customers } from '@/app/_lib/db.json';
export async function GET(req: Request) {
  const jsonPath = process.cwd() + '/app/_lib/db.json';
  const file = await fs.readFile(jsonPath, 'utf8');
  const data = customers;

  const url = new URL(req.url);
  const urlPage: number = Number(url.searchParams.get('page') ?? 1);
  const paginate: number = !Number(url.searchParams.get('paginate')) ? data.length : Number(url.searchParams.get('paginate'));
  const page: number = Math.abs(Math.ceil(data.length / paginate));
  const pageNow = {
    start: paginate * urlPage - paginate,
    end: paginate * urlPage,
  };
  const paginated = data.slice(pageNow.start, pageNow.end);
  return Response.json({
    paginate: pageNow,
    total_data: data.length,
    total_page: page,
    customers: paginated,
  });
}

export async function POST(req: Request) {
  const jsonPath = process.cwd() + '/app/_lib/db.json';
  const file = await fs.readFile(jsonPath, 'utf8');
  const data = JSON.parse(file);
  
  const { name, email, phone } = await req.json();

  if (!name || !email || !phone)
    return Response.json({
      success: false,
      message: 'Please Fill your Data',
    });

    let customer_code_first: string;
    let customer_code_seconds: any[];
    let customer_code_final
  if (data.customers.length !== 0) {
    customer_code_first = data.customers[data.customers.length - 1].customer_code;
    customer_code_seconds = customer_code_first.toString().split('_');
    customer_code_final = Number(customer_code_seconds[1]) + 1;
  } else {
    customer_code_final = 1
  }

  await data.customers.push({
    id: uuidv4(),
    customer_code: 'MM_' + customer_code_final?.toString().padStart(4, '0'),
    name: name,
    phone: phone,
    email: email,
    point: 0

  });
  await fs.writeFile(jsonPath, JSON.stringify(data));
  return Response.json({
    success: true,
    customer: data.customers[data.customers.length - 1],
  });
}
