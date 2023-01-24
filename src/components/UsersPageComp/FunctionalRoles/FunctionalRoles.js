import React from "react";
import styles from "./FunctionalRoles.module.css";
import Button from "../../../UI/Button/Button";
import { ReactComponent as BsTrash } from '../../../assets/Icons/icon-24-delete.svg';
import { FiEdit } from "react-icons/fi";


const roles = ['آدمن', 'سوبر آدمن', 'دعم فنى', 'خدمات عملاء', 'تسويق'];

const BackDrop = ({ onClick, openCreateRole }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed back_drop bottom-0 left-0  w-full bg-slate-900  z-10 ${styles.back_drop}`}
      style={{ height: "calc(100% - 4rem)" }}
    ></div>
  );
};

const FunctionalRoles = ({ cancel, openCreateRole, EditRole }) => {
  return (
			<>
				<BackDrop onClick={cancel}></BackDrop>
				<div className={`fixed bottom-0  left-28 bg-slate-50 z-20 otlobha_new_product ${styles.container}`} style={{ width: '978px', maxWidth: '70%', height: 'calc(100% - 4rem)' }}>
					<div className='flex h-full flex-col justify-between'>
						<div
							className='p-8  flex justify-between items-end '
							style={{
								height: '165px',
								backgroundColor: 'rgba(235, 235, 235, 1)',
							}}
						>
							<div className=' '>
								<h2 className='font-bold text-2xl  mb-3'>الأدوار الوظيفية</h2>
								<h2 className='text-[#7C7C7C] text-xl font-medium'>
									<span className='text-black '>جدول المستخدمين / </span>
									الأدوار الوظيفية
								</h2>
							</div>
							<Button
								type={'normal'}
								className={'h-14  w-[217px] font-normal text-xl '}
								onClick={() => {
									openCreateRole();
								}}
							>
								إنشاء دور
							</Button>
						</div>
						<div className={`flex-1 overflow-y-scroll py-12 h-[708px]   ${styles.content}`}>
							<div>
								{roles.map((role, index) => {
									return (
										<div className='flex justify-between items-center bg-[#FAFAFA] shadow-[0px_3px_6px_#0000000F] mb-3 py-2 mx-2 px-4'>
											<h2 className='font-medium text-[20px]'>{role}</h2>
											<div className='flex gap-4 '>
												<Button
													className='w-[111px] h-[47px] text-lg '
													textStyle={{ color: '#0099FB' }}
													style={{ backgroundColor: '#EBF7FF' }}
													svg={<FiEdit color='#0099FB' className='w-6 h-6' />}
													type={'normal'}
													onClick={() => {
														EditRole(role);
													}}
												>
													تحرير
												</Button>
												<Button
													className='w-[111px] h-[47px] text-lg '
													textStyle={{ color: '#FF3838' }}
													style={{ backgroundColor: '#FFF7F7' }}
													svg={<BsTrash color='#FF3838' className='w-6 h-6' />}
													type={'normal'}
												>
													حذف
												</Button>
											</div>
										</div>
									);
								})}
							</div>
						</div>
						<div
							className='p-8 flex justify-center gap-4'
							style={{
								height: '135px',
								backgroundColor: 'rgba(235, 235, 235, 1)',
							}}
						>
							<Button
								style={{
									borderColor: `rgba(2, 70, 106, 1)`,
								}}
								textStyle={{ color: 'rgba(2, 70, 106, 1)' }}
								className={'h-14 w-[113px] text-xl font-normal'}
								type={'outline'}
								onClick={cancel}
							>
								اغلاق
							</Button>
						</div>
					</div>
				</div>
			</>
		);
};

export default FunctionalRoles;
