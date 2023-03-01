import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Context from '../../../../store/context';

// ICONS
import { ReactComponent as CheckMarkImageIcon } from '../../../../assets/Icons/icon-24-checkmark-image.svg';
import Button from '../../../../UI/Button/Button';

const PersonalInfo = ({ fetchedData, loading, reload, setReload }) => {
	const token = localStorage.getItem('token');
	const contextStore = useContext(Context);
	const { setEndActionTitle } = contextStore;

  const [mainInfo, setMainInfo] = useState({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
    user_name: '',
    phonenumber: '',
    image: null,
    checkbox_field: '',

  });


  const handleMainInfo = (event) => {
    const { name, value } = event.target;
    setMainInfo((prevState) => {
      return { ...prevState, [name]: value}
    })

    
  }

	return (
		<div className='mt-14'>
			<h2 className='text-xl font-semibold mb-3'>البيانات الأساسية</h2>
			<div className='py-4 px-5' style={{ backgroundColor: '#fff' }}>
				<div className='mb-5'>
					<h2 className='font-medium' style={{ fontSize: '18px' }}>
						الاسم كامل
					</h2>
					<label htmlFor=''>
						<input
							className='outline-none w-full p-3 mt-3 rounded'
							style={{ border: '1px solid #E9E9E9' }}
							type='text'
							placeholder='عبد العزيز محمد'
							name='name'
							value={mainInfo.name}
							onChange={handleMainInfo}
						/>
					</label>
				</div>
				<div className='mb-5'>
					<h2 className='font-medium' style={{ fontSize: '18px' }}>
						اسم المستخدم
					</h2>
					<label htmlFor=''>
						<input
							className='outline-none w-full p-3 mt-3 rounded'
							style={{ border: '1px solid #E9E9E9' }}
							type='text'
							placeholder='Abed32'
							name='user_name'
							value={mainInfo.user_name}
							onChange={handleMainInfo}
						/>
					</label>
				</div>
				<div className={`mb-5 flex gap-3 `}>
					<div className='mb-5 flex-1'>
						<h2 className='font-medium' style={{ fontSize: '18px' }}>
							كلمة المرور
						</h2>
						<label htmlFor=''>
							<input
								className='outline-none w-full p-3 mt-3 rounded'
								style={{ border: '1px solid #E9E9E9' }}
								type='password'
								placeholder='•••••••'
								name='password'
								value={mainInfo.password}
								onChange={handleMainInfo}
							/>
						</label>
					</div>
					<div className='mb-5 flex-1'>
						<h2 className='font-medium' style={{ fontSize: '18px' }}>
							تأكيد كلمة المرور
						</h2>
						<label htmlFor=''>
							<input
								className='outline-none w-full p-3 mt-3 rounded'
								style={{ border: '1px solid #E9E9E9' }}
								type='password'
								placeholder='•••••••'
								name='password_confirm'
								value={mainInfo.password_confirm}
								onChange={handleMainInfo}
							/>
						</label>
					</div>
				</div>
				<div className={`mb-5 flex gap-3 `}>
					<div className='mb-5 flex-1'>
						<h2 className='font-medium' style={{ fontSize: '18px' }}>
							البريد الالكترونى
						</h2>
						<label htmlFor=''>
							<input
								className='outline-none w-full p-3 mt-3 rounded'
								style={{ border: '1px solid #E9E9E9' }}
								type='email'
								placeholder='Abed@gmail.com'
								name='email'
								value={mainInfo.email}
								onChange={handleMainInfo}
							/>
						</label>
					</div>
					<div className='mb-5 flex-1'>
						<h2 className='font-medium' style={{ fontSize: '18px' }}>
							رقم التواصل
						</h2>
						<label htmlFor=''>
							<input
								className='outline-none w-full p-3 mt-3 rounded'
								style={{ border: '1px solid #E9E9E9' }}
								type='number'
								placeholder='96621513515'
								name='name'
								value={mainInfo.name}
								onChange={handleMainInfo}
							/>
						</label>
					</div>
				</div>
				<div className={`mb-5 flex gap-3 items-end `}>
					<div
						className='flex items-center rounded justify-center'
						style={{
							backgroundColor: '#D3D3D3',
							height: '161px',
							width: '130px',
						}}
					>
						<CheckMarkImageIcon style={{ width: '32px', height: '32px' }} />
          </div>
          
					<div className='flex flex-1'>
						<label className='flex-1' htmlFor=''>
							<input
								className='outline-none flex-1 w-full h-full p-3  
                rounded'
								style={{ border: '1px solid #E9E9E9' }}
								type='text'
								placeholder=''
								name='image'
								value={mainInfo.image}
								onChange={handleMainInfo}
							/>
						</label>
						<Button
							type={'normal'}
							style={{
								backgroundColor: '#ADB5B9',
								height: '56px',
								width: '180px',
							}}
						>
							استعراض
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PersonalInfo;
