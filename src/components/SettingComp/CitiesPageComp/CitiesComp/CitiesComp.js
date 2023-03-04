import React from "react";
import FormControl from "@mui/material/FormControl";
import TableComp from "./TableComp/TableComp";
import { AiOutlineSearch } from "react-icons/ai";



const UsersTable = ({ fetchedData, loading, reload, setReload, setData, showCity }) => {
	return (
		<div className='mt-3'>
			<div className='mb-4'>
				<FormControl className='flex flex-row gap-4' sx={{ minWidth: 120, maxWidth: '100%', flex: '1' }}>
					<label className={`flex-1 md:h-14 h-[45px] relative `}>
						<input
							className='md:w-[376px] w-full h-full outline-0 pr-12 rounded-lg text-lg font-normal'
							placeholder=' ابحث عن مدينة'
							type='text'
							name='name'
							onChange={() => {
								console.log('zed');
							}}
							style={{
								border: '1px solid #A7A7A7',
								backgroundColor: '#FFFFFF00',
							}}
						/>
						<div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
							<AiOutlineSearch color='#1DBBBE' size={'20px'}></AiOutlineSearch>
						</div>
					</label>
				</FormControl>
			</div>

			<div dir={'ltr'} className={'md:mt-12 mt-6'}>
				<TableComp
					data={fetchedData}
					loading={loading}
					reload={reload}
					setReload={setReload}
					setDataRow={(data) => {
						setData(data);
					}}
					setShowCity={(data) => {
						showCity(data);
					}}
				></TableComp>
			</div>
		</div>
	);
};

export default UsersTable;
