import React, { useState } from 'react';
import { Filter, Product } from '../../../assets/Icons/index';
import PageNavigate from '../../../components/PageNavigate/PageNavigate';
import Button from '../../../UI/Button/Button';
import ProductsTable from '../../../components/SouqOtlobhaComp/ProductsTable/ProductsTable';
import FilteringOptions from '../../../components/SouqOtlobhaComp/FilteringOptions/FilteringOptions';
import NewProduct from '../../../components/SouqOtlobhaComp/NewProduct/NewProduct';
import OrdersStats from '../../../components/OrdersStats/OrdersStats';
import useFetch from '../../../hooks/useFetch';

const SouqOtlobha = () => {
	const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/etlobha');
	const [showFilteringOptions, setShowFilteringOptions] = useState(false);
	const [showNewProductInfo, setShowNewProductInfo] = useState(false);
	const [editProduct, setEditProduct] = useState(null);
	console.log(editProduct);
	return (
		<div className={`p-4 md:pl-36 pt-0`} style={{ backgroundColor: '#fafafa' }}>
			<div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-y-4 mb-5'>
				<PageNavigate currentPage={'سوق اطلبها'} nestedPage={true} parentPage={'السوق'} />
				<div className='md:w-auto w-full flex gap-2 '>
					<Button
						onClick={() => {
							setShowFilteringOptions(!showFilteringOptions);
						}}
						type={'outline'}
						img={Filter}
						className={'flex justify-center items-center md:w-[140px] w-full md:h-[56px] h-[45px] md:text-lg text-[16px] whitespace-nowrap rounded'}
					>
						فرز
					</Button>
					<Button
						onClick={() => {
							setShowNewProductInfo(true);
							setEditProduct(false);
						}}
						type={'normal'}
						color={'bTow'}
						className={'flex flex-row justify-center items-center md:w-[180px] w-full md:h-[56px] h-[45px] rounded md:bg-[#1DBBBE] bg-[#EDEDEF]'}
						textStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '10px' }}
					>
						<img className='md:invert' src={Product} alt="icon" />
						<h2 className='md:text-lg text-[16px] md:text-[#FFFFFF] text-[#011723] whitespace-nowrap'>إضافة منتج جديد</h2>
					</Button>
				</div>
			</div>

			{showNewProductInfo && (
				<NewProduct
					cancel={() => {
						setShowNewProductInfo(false);
					}}
					editProduct={editProduct}
				/>
			)}

			<div className='relative'>
				{/** orders state section */}
				<OrdersStats fetchedData={fetchedData?.data}/>
				{/** filter form  */}
				<FilteringOptions
					showFilteringOptions={showFilteringOptions}
					hideFilteringOptions={() => {
						setShowFilteringOptions(false);
					}}
				></FilteringOptions>
			</div>

			{/** Products Table */}
			<div className='mt-4' dir='ltr'>
				<ProductsTable
					data={fetchedData?.data?.products}
					loading={loading}
					reload={reload}
					setReload={setReload}
					editProduct={(item) => {
						setEditProduct(item);
						setShowNewProductInfo(true);
					}}
				/>
			</div>
		</div>
	);
};

export default SouqOtlobha;
