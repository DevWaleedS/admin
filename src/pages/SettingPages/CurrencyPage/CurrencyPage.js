import React, { useState } from "react";
import PageNavigate from "../../../components/PageNavigate/PageNavigate";
import TableComp from "../../../components/SettingComp/CurrencyPageComp/TableComp/TableComp";
import AddNewCurrency from "../../../components/SettingComp/CurrencyPageComp/AddNewCurrency/AddNewCurrency";

import Button from "../../../UI/Button/Button";
import { AiOutlinePlus } from "react-icons/ai";

const CurrencyPage = () => {
  const [showAddCurrency, setShowAddCurrency] = useState(false);
  return (
			<div className={`px-4 pt-6 pl-36 pb-20`} style={{ backgroundColor: '#F7F7F7' }}>
				<div className='flex justify-between items-center'>
					<PageNavigate nestedPage={true} parentPage={'الاعدادات'} currentPage={'العملات'} />
					<Button
						className='h-14 w-[213px]'
						svg={<AiOutlinePlus color='#fff' className='w-5 h-5'/>}
						type={'normal'}
						style={{ backgroundColor: '#B6BE34' }}
						fontSize={'text-2xl font-light'}
						onClick={() => {
							setShowAddCurrency(true);
						}}
					>
						اضافة عملة
					</Button>
				</div>
				{showAddCurrency && (
					<AddNewCurrency
						cancel={() => {
							setShowAddCurrency(false);
						}}
					></AddNewCurrency>
				)}
				<div className='mt-16' dir='ltr'>
					<TableComp></TableComp>
				</div>
			</div>
		);
};

export default CurrencyPage;
