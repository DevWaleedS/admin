import React from "react";
import DatePicker from "./DatePicker/DatePicker";
import GraphSec from "./GraphSec/GraphSec";

const OrdersGraph = () => {
  return (
			<div className='shadow-[0px_3px_6px_#0000001A] md:h-96 md:mt-16 mt-5 md:py-6 md:pl-12 md:pr-4 p-4 rounded-lg md:bg-[#FFFFFF] bg-[#FAFAFA]'>
				<div className='w-full flex flex-col md:flex-row justify-between'>
					<div className='flex md:flex-col flex-row gap-x-[105px] md:pr-16 pr-4 mb-2'>
						<h2 className='font-medium md:text-[22px] text-[16px]'>احصائيات الطلبات</h2>
						<h2 className='font-bold md:text-[22px] text-[18px]'>250</h2>
					</div>
					<DatePicker />
				</div>
				<GraphSec />
			</div>
		);
};

export default OrdersGraph;
