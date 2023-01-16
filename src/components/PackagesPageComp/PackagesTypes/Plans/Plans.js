import React from 'react';
import { ReactComponent as ProEmoji } from '../../../../assets/Icons/icon-38-emojy.svg';
import { ReactComponent as TraderEmoji } from '../../../../assets/Icons/icon-38-emojy2.svg';
import { ReactComponent as BeginnerEmoji } from '../../../../assets/Icons/icon-38-happy emojy.svg';
import { BsCheckLg } from 'react-icons/bs';
import styles from './Plans.module.css';
import Button from '../../../../UI/Button/Button';
import CustomSwitch from '../../../../UI/CustomSwitch/CustomSwitch';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';

const packageOptions = ['100 منتج', '10 تصنيفات', 'دعم فني 24', 'تجربة مجانية', 'توفير مخازن', 'تخصيص القالب', 'خدمات الاستشارة'];

function createData(option1, option2, option3, option4, option5, option6, option7) {
	return [option1, option2, option3, option4, option5, option6, option7];
}
const yearlyPrices = [800, 2500, 1400];
const monthlyPrice = [350, 750, 500];
const icons = [<BeginnerEmoji style={{ fill: 'red' }} />, <TraderEmoji style={{ fill: '#fff' }} />, <ProEmoji style={{ fill: '#1DBBBE' }} />];
const title = ['التاجر المبتدأ', 'العلامة التجارية', 'التاجر المحترف'];

const rows = [createData(true, true, true, true, false, false, false), createData(true, true, true, true, true, true, true), createData(true, true, true, true, true, true, false)];

const Plans = ({ yearlyPlan, editPackage, editPackageTemplate }) => {
	return (
		<div>
			<div className='flex gap-4 items-center'>
				{rows.map((row, idx) => {
					const proPackage = idx === 1 ? styles.pro : styles.normal;
					return (
						<div key={idx} className={`flex-1 p-5 shadow-xl rounded-lg ${proPackage}`}>
							<div className='py-6 '>
								<h2 className='flex items-center text-2xl font-medium gap-4 mb-6 justify-center'>
									{title[idx]}
									{icons[idx]}
								</h2>
								<h2 className='text-center'>
									<span className='text-4xl font-semibold ml-1'>{yearlyPlan ? yearlyPrices[idx] : monthlyPrice[idx]}</span>
									ر.س
								</h2>
								<h2 className='text-center'>{yearlyPlan ? '/سنويا' : '/شهريا'}</h2>
								<div className='pr-12'>
									{row.map((item, index) => {
										return (
											<h2 className={`font-medium my-4 text-xl whitespace-nowrap`} style={{ color: !item ? '#ADB5B9' : '' }} key={index}>
												<BsCheckLg
													style={{
														color: item ? '#3AE374' : '#ADB5B9',
														display: 'inline-block',
														marginLeft: '1rem',
														fontSize: '1.25rem',
													}}
												></BsCheckLg>
												{packageOptions[index]}
											</h2>
										);
									})}
								</div>
							</div>
							<div className='w-full flex justify-center items-center mb-6'>
								<CustomSwitch />
							</div>
							<Button
								svg={<FiEdit style={{ color: '#0099FB' }} />}
								type={idx === 1 ? 'normal' : 'outline'}
								className={`mb-2 w-full h-14  text-xl font-medium  ${idx === 1 ? 'bg-slate-50 text-[#0099FB]' : ''} `}
								style={{ borderColor: idx === 1 ? '' : '#0099FB' }}
								textStyle={{ color: '#0099FB' }}
								onClick={() => {
									editPackage(row);
								}}
							>
								تعديل خصائص الباقة
							</Button>
							<Button
								svg={<AiOutlineEye style={{ color: `  ${idx === 1 ? '#fff' : '#67747B'} ` }} />}
								className={'w-full h-14 text-xl font-medium '}
								type={'outline'}
								style={{ border: ` 1px solid ${idx === 1 ? '#EFF9FF' : '#67747B'} ` }}
								textStyle={{ color: idx === 1 ? '#EFF9FF' : '#67747B' }}
								onClick={() => {
									editPackageTemplate();
								}}
							>
								عرض قوالب الباقة
							</Button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Plans;
