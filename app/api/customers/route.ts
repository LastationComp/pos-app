import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
// export async function GET() {
//     const jsonPath = process.cwd() + '/app/_lib/db.json'
//     const file = await fs.readFile(jsonPath, 'utf8')
//     const data = JSON.parse(file)
//     return Response.json({
//         customers: data.customers
//     })
// }

export async function GET() {
  const jsonPath = process.cwd() + '/app/_lib/db.json';
  const file = await fs.readFile(jsonPath, 'utf8');
  const data = JSON.parse(file);
  return Response.json({
    customers: data.customers,
  });
}

// export async function POST(req: Request) {
//   const jsonPath = process.cwd() + '/app/_lib/db.json';
//   const file = await fs.readFile(jsonPath, 'utf8');
//   const data = JSON.parse(file);
//   const customersDetail = data.customers.filter((data: any) => data.id == '4e3d0a88-b76e-423d-b480-bd0cbce9d24a');
//   if (customersDetail.length !== 0) {
//     await data.customers.push({
//       id: 'sadasdksladja-asdasdksajdkasd-sndksadmsakd',
//     });
//   }
//   await fs.writeFile(jsonPath, JSON.stringify(data));
//   return Response.json({
//     customer: customersDetail,
//   });
// }

export async function POST(req: Request) {
  const jsonPath = process.cwd() + '/app/_lib/db.json';
  const file = await fs.readFile(jsonPath, 'utf8');
  const data = JSON.parse(file);

  const { name } = await req.json();

  if (!name || name == '')
    return Response.json({
      success: false,
      customer: data.customers[data.customers.length - 1],
    });

    const customer_code_first: string = data.customers[data.customers.length - 1].customer_code
    const customer_code_seconds = customer_code_first.toString().split('_')
    const customer_code_final = Number(customer_code_seconds[1]) + 1
  await data.customers.push({
    id: uuidv4(),
    customer_code: 'MM_' + customer_code_final.toString().padStart(4, '0'),
    name: name,
  });
  await fs.writeFile(jsonPath, JSON.stringify(data));
  return Response.json({
    success: true,
    customer: data.customers[data.customers.length - 1]
  });
}
