import { promises as fs } from 'fs';

export async function GET(req: Request) {
  const jsonPath = process.cwd() + '/app/_lib/db.json';
  const url = new URL(req.url);
  const splitting: string = url.pathname;
  const params: any[] = splitting.split('/');
  const file = await fs.readFile(jsonPath, 'utf8');
  const data = JSON.parse(file);
  const customer: any[] = data.customers;
//   const customersDetail = customer.filter((data) => data.id == params[3]);
 const customersDetail = data.customers.filter((data: any) => data.id == params[3]);
  return Response.json({
    customers: customersDetail[0],
  });
}

export async function POST(req: Request) {
  const jsonPath = process.cwd() + '/app/_lib/db.json';
  const url = new URL(req.url);
  const splitting: string = url.pathname;
  const params: any[] = splitting.split('/');
  const file = await fs.readFile(jsonPath, 'utf8');
  const data = JSON.parse(file);
  const customer: any[] = data.customers;
  const customersDetail = customer.filter((data) => data.id == 'sdsda');
  return Response.json({
    customers: customersDetail,
  });
}