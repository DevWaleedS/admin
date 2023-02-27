import React, { useState } from "react";
import useFetch from '../../../hooks/useFetch';

import FilteringOptions from "../../../components/MarketingPageComp/CouponsPageComp/FilteringOptions/FilteringOptions";
import AddNewCoupon from "../../../components/MarketingPageComp/CouponsPageComp/AddNewCoupon/AddNewCoupon";
import TableComp from "../../../components/MarketingPageComp/CouponsPageComp/TableComp/TableComp";

import Button from "../../../UI/Button/Button";


// icons
import { AiOutlinePlus } from "react-icons/ai";

const CouponsPage = () => {
  const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/coupons');
  
  const [showAddNewCoupon, setShowAddNewCoupon] = useState(false);
  const [couponDetails, setCouponDetails] = useState(null);


  return (
			<div style={{ backgroundColor: '#FAFAFA' }} className='relative md:pt-[50px] md:pl-[134px] md:pr-[56px] p-4 pt-0'>
				<div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-4'>
					<h3 style={{ fontSize: '22px', color: '#011723' }} className='font-bold '>
						جدول الكوبونات
					</h3>
					<Button
						type={'normal'}
						style={{ backgroundColor: '#B6BE34' }}
						textStyle={{ color: '#EFF9FF', fontSize: '20px' }}
						className={'md:w-[216px] w-full md:h-[56px] h-[45px] font-medium px-4'}
						svg={<AiOutlinePlus fill='#fff' className='w-5 h-5' />}
						onClick={() => {
							setShowAddNewCoupon(true);
							setCouponDetails(null);
						}}
					>
						اضافة خصم
					</Button>
				</div>

				{/** filter */}
				<FilteringOptions />

				{/** add new coupon page */}
				{showAddNewCoupon && (
					<AddNewCoupon
						cancel={() => {
							setShowAddNewCoupon(false);
						}}
						couponDetails={couponDetails}
					/>
				)}

				{/**  coupon page table */}
				<div dir='ltr'>
					<TableComp
						setUser={(row) => {
							setCouponDetails(row);
							setShowAddNewCoupon(true);
						}}
						fetchedData={fetchedData}
						loading={loading}
						reload={reload}
						setReload={setReload}
					/>
				</div>
			</div>
		);
};

export default CouponsPage;
