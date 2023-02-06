import React from "react";
import styles from "./PageNavigate.module.css";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

const PageNavigate = ({ currentPage, parentPage, nestedPage }) => {
  return (
			<div className='flex flex-row items-start'>
				<Link to={'/'} className={'flex items-center gap-2'}>
					<div className={` ${styles.arrow_con}`}>
						<GoArrowRight style={{ color: '#02466A', fontSize: '1.2rem' }} />
					</div>
					<h2 className="md:text-lg text-[16px] font-medium md:ml-4 ml-2 whitespace-nowrap"> الرئيسية </h2>
				</Link>
				{nestedPage && <h2 className='md:text-lg text-[16px] font-medium md:ml-4 ml-2 whitespace-nowrap'> / {parentPage} </h2>}
				{parentPage && !nestedPage && (
					<Link to={`/${parentPage}`}>
						<h2 className='md:text-lg text-[16px] font-medium md:ml-4 ml-2 whitespace-nowrap'> / {parentPage} </h2>
					</Link>
				)}
				<h3 className='md:text-lg text-[16px] font-medium ' style={{ color: '#67747B' }}>
					/ {currentPage}
				</h3>
			</div>
		);
};

export default PageNavigate;
