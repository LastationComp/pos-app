import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function TransactionDetail({ trx, setTrx }: { trx: any[]; setTrx: any }) {
  // const [trxList, setTrxList] = useState(trx);
  const [domState, setDomSet] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [change, setChange] = useState(0)

  const handleChange = async (barcode: string, unitValue: string) => {
    setDomSet(domState + 1);
    const selling_unit = unitValue.split(',');
    const price: HTMLElement | null = document.getElementById('price-' + barcode);
    const qty: any = document.getElementById('qty-' + barcode);
    if (price && qty) {
      price.innerHTML = '-';
      price.innerHTML = String(Number(selling_unit[0]) * Number(qty.value)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      if (selling_unit[0] == '-') return (price.innerHTML = '-');
    }
    setDomSet(domState + 1);
  };
  const handleChangeQty = (barcode: string, value: number, notOnchange: boolean = false) => {
    const price: HTMLElement | null = document.getElementById('price-' + barcode);
    const qty: any = document.getElementById('qty-' + barcode);
    const slu: any = document.getElementById('slu-' + barcode);
    const singlePrice: any = slu.value.split(',');
    if (price && qty) {
      let total_qty = Number(qty.value) + Number(value);
      if (notOnchange) total_qty = value;
      if (total_qty === 0) {
        const result = trx.filter((data) => data.barcode !== barcode);
        return setTrx(result);
      }
      qty.value = total_qty;
      price.innerHTML = String(Number(singlePrice[0]) * Number(total_qty)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      if (singlePrice[0] == '-') return (price.innerHTML = '-');

      setDomSet(domState + 1);
    }
  };
  const handleTransaction = () => {
    let subTotalTrx: number = 0;
    trx.forEach((data) => {
      const price: HTMLElement | null = document.getElementById('price-' + data.barcode);

      if (!price) return;
      if (price?.innerHTML !== '-') {
        subTotalTrx += Number(price?.innerHTML.toString().replaceAll('.', ''));
      }
    });

    setSubTotal(subTotalTrx)
  };

  const handleBuyPrice = () => {

    const change = Number(buyPrice) - Number(subTotal)
    setChange(change)
  }
  useEffect(() => {
    handleTransaction();
    handleBuyPrice()
  }, [domState, trx, buyPrice, subTotal]);
  return (
    <>
      <h1 className="">Transaction Details</h1>
      <section className="flex flex-col justify-between">
        <div className="h-[500px] overflow-y-auto">
          {trx.length == 0 ? <h1 className="text-lg text-center flex justify-center items-center h-[500px]"> No Product Selected</h1> : ''}
          <div className="flex flex-col gap-3">
            {trx &&
              trx?.map((data: any, i: number) => (
                <div key={i} className="bg-slate-300 rounded px-3 py-2 flex justify-between items-stretch">
                  <div className="grid grid-cols-2 w-full gap-2">
                    <span className="text-black col-span-2">{data.product_name}</span>
                    <select name="select_unit" defaultValue={'-'} id={'slu-' + data.barcode} placeholder="Select One" onChange={(e) => handleChange(data.barcode, e.target.value)} className="rounded">
                      <option value={'-'}>Select Unit</option>
                      {data?.selling_units?.map((unit: any, i: number) => (
                        <option value={unit.price + ',' + unit.selling_unit} key={i}>
                          {unit.selling_unit}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2 text-black w-full">
                      <button className="rounded bg-red-500 px-2" onClick={(e) => handleChangeQty(data.barcode, -1)}>
                        -
                      </button>
                      <input type="text" id={'qty-' + data.barcode} onChange={(e) => handleChangeQty(data.barcode, Number(e.target.value), true)} className="w-[20px] text-center rounded text-white" defaultValue={1} />
                      <button className="rounded bg-green-500 px-2" onClick={(e) => handleChangeQty(data.barcode, +1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col justify-between">
                    <span className="text-black">Price</span>
                    <span className="text-black">
                      <b>
                        Rp. <span id={'price-' + data.barcode}>-</span>
                      </b>
                    </span>
                  </div>
                </div>
              ))}
            {/* <div className="bg-slate-300 rounded px-3 py-2 flex justify-between items-stretch">
              <div className="grid grid-cols-2 w-full gap-2">
                <span className="text-black col-span-2">Product Name</span>
                <select name="select_unit" placeholder="Select One" className="rounded">
                  <option value={'-'}>Select Unit</option>
                  <option value="">Biji</option>
                </select>
                <div className="flex gap-2 text-black w-full">
                  <button className="rounded bg-red-500 px-2">-</button>
                  <input type="text" className="w-[20px] text-center rounded text-white" />
                  <button className="rounded bg-green-500 px-2">+</button>
                </div>
              </div>
              <div className="w-1/2 flex flex-col justify-between">
                <span className="text-black">Price</span>
                <span className="text-black">
                  <b>Rp. 10.000</b>
                </span>
              </div>
            </div> */}
          </div>
        </div>
        <div className="divide-y bg-gray-700 mt-5 px-3 rounded ">
          <div className="flex flex-col gap-3 mb-3">
            <div className="flex justify-between">
              <span className="w-full">PNP</span>
              <span className="w-full">Rp. 0</span>
            </div>
            <div className="flex justify-between">
              <span className="w-full">Bayar</span>
              <div className="flex w-full gap-1">
                <span>Rp. </span>
                <input
                  type="text"
                  placeholder="Input your price..."
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(Number(e.target.value))}
                  className="w-full transition rounded outline outline-0 focus:outline-1 px-2 focus:outline-blue-400"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <span className="w-full">Kembalian</span>
              <span className="w-full">Rp. {change.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
            </div>
          </div>
          <div className="py-3">
            <div className="bg-gray-900 rounded flex flex-wrap justify-between items-center">
              <span className="px-3">Subtotal</span>

              <span className="px-3">
                Rp. <span id="subtotal-transaction">{subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
              </span>
              <button className="w-full bg-green-500 text-black rounded p-2">Checkout</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
