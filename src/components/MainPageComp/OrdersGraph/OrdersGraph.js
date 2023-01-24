import React from "react";
import DatePicker from "./DatePicker/DatePicker";
import GraphSec from "./GraphSec/GraphSec";

const OrdersGraph = () => {
  return (
			<div className='shadow-[0px_3px_6px_#0000001A] h-96 mt-16 py-6 pl-12 pr-4 rounded-lg' style={{ backgroundColor: '#fff' }}>
				<div className='flex justify-between'>
					<div className='pr-16'>
						<h2 className='font-medium text-[22px]'>احصائيات الطلبات</h2>
						<h2 className='font-bold text-[22px]'>250</h2>
					</div>
					<DatePicker />
				</div>
				<GraphSec />
			</div>
		);
};

export default OrdersGraph;
