import React from "react";
import FormControl from "@mui/material/FormControl";

import TableComp from "./TableComp/TableComp";
import { AiOutlineSearch } from "react-icons/ai";



const UsersTable = ({ setData }) => {
  return (
			<div className='mt-3'>
				<div className='mb-4'>
					<FormControl className='flex flex-row gap-4' sx={{ minWidth: 120, flex: '1' }}>
						<label className={`flex-1  h-14 relative `}>
							<input
								className=' h-full outline-0 pr-12 rounded-lg  text-lg font-normal '
								placeholder=' ابحث عن دولة'
								type='text'
								name='name'
								onChange={() => {}}
								style={{
									width: '376px',
									border: '1px solid #A7A7A7',
									backgroundColor: '#FFFFFF00',
								}}
							/>
							<div className={`absolute top-1/2 right-4 -translate-y-2/4`}>
								<AiOutlineSearch color='#B6BE34' size={'20px'}></AiOutlineSearch>
							</div>
						</label>
					</FormControl>
				</div>

				<div dir={'ltr'} className={'mt-12'}>
					<TableComp
						setDataRow={(data) => {
							setData(data);
						}}
					></TableComp>
				</div>
			</div>
		);
};

export default UsersTable;
