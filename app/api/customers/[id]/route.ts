import { Validator } from '@/app/_lib/Validator';
import { promises as fs } from 'fs';

export async function GET(req: Request, route: { params: { id: string } }) {
  const jsonPath = process.cwd() + '/app/_lib/db.json';
  const file = await fs.readFile(jsonPath, 'utf8');
  const data = JSON.parse(file);
  const customersDetail = data.customers.filter((data: any) => data.id == route.params.id);
  return Response.json({
    customers: customersDetail[0],
  });
}

export async function POST(req: Request, route: { params: { id: string } }) {
  
  const { name, email, phone, point } = await req.json();


  const jsonPath = process.cwd() + '/app/_lib/db.json';
  const file = await fs.readFile(jsonPath, 'utf8');

  const data = JSON.parse(file);

  const oldData = data.customers.filter((data: any) => data.id == route.params.id);

  if (!oldData[0])
    return Response.json({
      success: false,
      message: 'Data Not Found',
    });

  const newData = {
    ...oldData[0],
    name: name,
    email: email,
    phone: phone,
    point: point
  };

  const customer = data.customers.filter((data: any) => data.id !== route.params.id);
  await customer.push(newData);
  customer.sort((a: any, b: any) => {
    if (a.customer_code < b.customer_code) return -1;
  });
  data.customers = customer;

  await fs.writeFile(jsonPath, JSON.stringify(data));
  return Response.json({
    success: true,
    customer: data.customers[data.customers.length - 1],
  });
}

export async function DELETE(req: Request) {
  const jsonPath = process.cwd() + '/app/_lib/db.json';
  const file = await fs.readFile(jsonPath, 'utf8');
  const data = JSON.parse(file);
  const url = new URL(req.url)
  const id = url.pathname.toString().split('/')[3]
  const exists = data.customers.filter((data: any) => data.id == id);
  if (!exists[0])
    return Response.json({
      success: false,
      message: 'Data Not Found',
    });

  const newData = data.customers.filter((data: any) => data.id !== id);
  data.customers = newData
  await fs.writeFile(jsonPath, JSON.stringify(data));
  return Response.json({
    success: true,
    message: 'Data Deleted Successfully',
  });
}
