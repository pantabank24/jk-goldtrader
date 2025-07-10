"use client"

import React, { useState } from 'react';
import { Printer, Plus, Trash2, Save, ChevronDown, ChevronLeft } from 'lucide-react';
import { QuotationModel } from '../app/models/Quotations';
import { Input } from '@heroui/input';
import moment from 'moment';
import { Switch } from '@heroui/switch';

interface Props {
  items: QuotationModel[],
  onChange: (value: boolean) => void;
}

const QuotationComponent = ({items, onChange}: Props) => {

  const [isSelected, setIsSelected] = React.useState(false);
  const [cusName, setCusName] = useState("");
  const [cusTel, setCusTel] = useState("");

  const companyInfo = {
    name: 'JK Goldtrader',
    website: 'WWW.JK-GOLDTRADER.COM',
    address: 'ตลาดพระเครื่องกรีนไลน์ บางกะปิ ลาดพร้าว 129 แขวงคลองจั่น เขตบางกะปิ 10240 โทร 0639325566',
    shopName: 'ร้านจ่าคิง ปากพนัง',
    license: 'เลขประจำตัวผู้เสียภาษี',
    taxId: '1-8098-00097-66-1'
  };

  const quotationInfo = {
    title: 'ใบเสร็จ ซื้อ ขาย ทองคำ',
    customerName: 'ลูกค้า คุณวิชัย สุนิคำ',
    date: '6/07/2568'
  };

  const calculateTotalWeight = () => {
    return items.reduce((sum, item) => sum + (item.laborCost || 0), 0);
  };

  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    const dataStr = JSON.stringify(items, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `goldtrader-quotation-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="max-w-5xl mx-auto mt-20 p-4 ">
      <div className="mb-6 flex gap-4 print:hidden flex-col">
        <div>
          <button
            onClick={() => onChange(false)}
            className=" transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 flex flex-row items-center pr-4"
          >
            <ChevronLeft size={20} />
            <span>ย้อนกลับ</span>
          </button>
        </div>
        <span className="text-3xl font-bold bg-gradient-to-b items-center justify-center flex from-white to-gray-500 bg-clip-text text-transparent">
          พรีวิวใบเสนอราคา
        </span>  
      </div>
      <div className="flex flex-col gap-2 mb-5 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full px-2 py-2">
          <Switch color='success' isSelected={isSelected} onValueChange={setIsSelected}>
            หัวใบเสร็จ JK Goldtrader
          </Switch>
        </div>
      <div className=' flex flex-row mb-5 gap-2 max-md:flex-col'>
         <Input placeholder='ชื่อลูกค้า' size="lg" className=" min-w-80 text-base" type="text" inputMode="text" value={cusName} onValueChange={(i) => setCusName(i)} />
         <Input placeholder='เบอร์โทร' size="lg" className=" min-w-80 text-base" step="1" type="text" inputMode="decimal" min="0" max="100" value={cusTel} onValueChange={(i) => setCusTel(i)} />
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-blue-500 to-blue-700 text-white rounded-xl  hover:bg-blue-700 transition-colors"
        >
          <Printer size={20} />
          พิมพ์
        </button>
      </div>
      
      {/* Document */}
      <div id="print-section" className="bg-white border border-gray-400 print:border-none text-black" >
        {/* Header */}
        {
          isSelected
          ? <div>
            <div className="text-center py-6  border-gray-400">
              <h1 className="text-2xl font-bold mb-2">{companyInfo.name}</h1>
              <p className="text-lg font-semibold mb-2">{companyInfo.website}</p>
              <p className="text-sm mb-2">{companyInfo.address}</p>
            </div>

            <div className=' flex  flex-col ml-5 border-b'>
              <p className="text-sm mb-2">{companyInfo.shopName}</p>
              <p className="text-sm mb-2">{companyInfo.license}</p>
              <p className="text-sm font-semibold">{companyInfo.taxId}</p>
              <p></p>
            </div>
          </div>
          : null
        }

        {/* Title and Info */}
        <div className="p-1">
          <h2 className="text-xl font-bold text-center mb-4">{quotationInfo.title}</h2>
          <div className="flex justify-between items-center mb-1">
            <div>
              <p className="font-semibold">ชื่อลูกค้า: {cusName}</p>
              <p className="">เบอร์โทร: {cusTel}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">วันที่: {moment(new Date).locale('th').format('D MMMM YYYY')}</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">ลำดับ</th>
                <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">ราคาทอง</th>
                <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">ราคาบวก</th>
                <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">% ซื้อ</th>
                <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">น้ำหนัก</th>
                <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">ต่อกรัม</th>
                <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">จำนวนเงิน</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index+1} className="hover:bg-gray-50">
                  <td className="border border-gray-400 px-2 text-center text-sm">{index + 1}</td>
                  <td className="border border-gray-400 px-2 text-center text-sm">
                    {item.goldPrice.toLocaleString()}
                  </td>
                  <td className="border border-gray-400 px-2  text-center text-sm">
                    {item.weightBaht.toLocaleString()}
                  </td>
                  <td className="border border-gray-400 px-2  text-center text-sm">
                    {item.percentage.toLocaleString()}
                  </td>
                  <td className="border border-gray-400 px-2  text-center text-sm">
                    {item.laborCost.toLocaleString()}
                  </td>
                  <td className="border border-gray-400 px-2  text-center text-sm">
                    {item.costPerBaht.toLocaleString()}
                  </td>
                  <td className="border border-gray-400 px-2 text-center text-sm">
                    {item.totalAmount.toLocaleString()}
                  </td>
                </tr>
              ))}
              
              {/* Empty rows for spacing */}
              {Array.from({ length: Math.max(0, 10 - items.length) }).map((_, index) => (
                <tr key={`empty-${index}`}>
                  <td className="border border-gray-400 px-2 text-center text-sm">{items.length + index + 1}</td>
                  <td className="border border-gray-400 px-2 text-center text-sm"></td>
                  <td className="border border-gray-400 px-2 text-center text-sm"></td>
                  <td className="border border-gray-400 px-2 text-center text-sm"></td>
                  <td className="border border-gray-400 px-2 text-center text-sm"></td>
                  <td className="border border-gray-400 px-2 text-center text-sm"></td>
                  <td className="border border-gray-400 px-2 text-center text-sm"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="p-4">
          <div className="flex justify-end">
            <div className="w-80">
              <div className="border border-gray-400">
                <div className="flex justify-between p-1 border-b border-gray-400">
                  <span className="font-semibold">น้ำหนักรวม</span>
                  <span className="font-semibold">{calculateTotalWeight().toFixed(1)}</span>
                </div>
                <div className="flex justify-between p-1 border-b border-gray-400">
                  <span className="font-semibold">รวมเป็นเงิน</span>
                  <span className="font-semibold">{calculateGrandTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-1">
                  <span className="font-semibold">อื่น ๆ</span>
                  <span className="font-semibold"></span>
                </div>
                <div className="flex justify-between p-1 border-t border-gray-400">
                  <span className="font-bold">จำนวนรวมทั้งสิ้น</span>
                  <span className="font-bold">{calculateGrandTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body { margin: 0; font-size: 12px; }
          .print\\:hidden { display: none !important; }
          .print\\:border-none { border: none !important; }
          .print\\:bg-transparent { background: transparent !important; }
          input { 
            border: none !important;
            background: transparent !important;
            outline: none !important;
          }
          @page {
            size: A4;
            margin: 1cm;
          }
        }
      `}</style>
    </div>
  );
};

export default QuotationComponent;