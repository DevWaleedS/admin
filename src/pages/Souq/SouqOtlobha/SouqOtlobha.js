import React, { useState } from 'react';
import { Filter, Product } from '../../../assets/Icons/index';
import PageNavigate from '../../../components/PageNavigate/PageNavigate';
import Button from '../../../UI/Button/Button';
import ProductsTable from '../../../components/SouqOtlobhaComp/ProductsTable/ProductsTable';
import FilteringOptions from '../../../components/SouqOtlobhaComp/FilteringOptions/FilteringOptions';
import NewProduct from '../../../components/SouqOtlobhaComp/NewProduct/NewProduct';
import OrdersStats from '../../../components/OrdersStats/OrdersStats';

const SouqOtlobha = () => {
	const [showFilteringOptions, setShowFilteringOptions] = useState(false);
	const [showNewProductInfo, setShowNewProductInfo] = useState(false);
	const [editProduct, setEditProduct] = useState(null);
	return (
		<div className={`p-4 pl-36 `} style={{ backgroundColor: '#fafafa' }}>
			<div className='flex items-center justify-between mb-6'>
				<PageNavigate currentPage={'سوق اطلبها'} nestedPage={true} parentPage={'السوق'} />
				<div className='flex gap-2 '>
					<Button
						onClick={() => {
							setShowFilteringOptions(!showFilteringOptions);
						}}
						type={'outline'}
						img={Filter}
						className={'rounded '}
						fontSize={'font-light'}
					>
						فرز
					</Button>
					<Button
						onClick={() => {
							setShowNewProductInfo(true);
							setEditProduct(false);
						}}
						type={'normal'}
						img={Product}
						color={'bTow'}
						className={'rounded '}
						fontSize={'font-light'}
					>
						إضافة منتج جديد
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
				<OrdersStats />
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
