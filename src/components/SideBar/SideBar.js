import React, { useState } from 'react';
import TreeView from '@mui/lab/TreeView/TreeView';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import TreeItem from '@mui/lab/TreeItem/TreeItem';
import treeItemClasses from '@mui/lab/TreeItem/treeItemClasses';
import styles from './SideBar.module.css';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import { GiPlainCircle } from 'react-icons/gi';
import { ReactComponent as Dashboard } from '../../assets/Icons/icon-24-dashboard.svg';
import { ReactComponent as Market } from '../../assets/Icons/icon-24-market.svg';
import { ReactComponent as Store } from '../../assets/Icons/icon-24-store.svg';
import { ReactComponent as Category } from '../../assets/Icons/icon-24-Category.svg';
import { ReactComponent as Graduation } from '../../assets/Icons/icon-24-graduatioin.svg';
import { ReactComponent as Template } from '../../assets/Icons/icon-24-template.svg';
import { ReactComponent as Pages } from '../../assets/Icons/icon-24-pages.svg';
import { ReactComponent as User } from '../../assets/Icons/icon-24-user.svg';
import { ReactComponent as Marketing } from '../../assets/Icons/icon-24-marketing.svg';
import { ReactComponent as SalesMan } from '../../assets/Icons/icon-24-sales man.svg';
import { ReactComponent as Order } from '../../assets/Icons/icon-24-order.svg';
import { ReactComponent as Wallet } from '../../assets/Icons/icon-24-wallet.svg';
import { ReactComponent as Support } from '../../assets/Icons/icon-24-support.svg';
import { ReactComponent as Price } from '../../assets/Icons/icon-24-price.svg';
import { ReactComponent as Setting } from '../../assets/Icons/icon-24-setting.svg';
import { ReactComponent as DolarIcon } from '../../assets/Icons/dolar icon.svg';
import { ReactComponent as CityIcon } from '../../assets/Icons/icon-24-city.svg';
import { ReactComponent as EmailIcon } from '../../assets/Icons/icon-24- email.svg';
import { ReactComponent as ReportIcon } from '../../assets/Icons/icon-24-report.svg';
import { ReactComponent as Shipping } from '../../assets/Icons/shipping.svg';
import { ReactComponent as PaymentGateway } from '../../assets/Icons/Payment gateway.svg';

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
	color: theme.palette.text.secondary,
	[`& .${treeItemClasses.content}`]: {
		flexDirection: 'row-reverse',
		paddingRight: theme.spacing(1),
		fontWeight: theme.typography.fontWeightNormal,
		padding: '0.5rem 0 0.5rem 0.5rem',
		width: '100% !important',
		height: '60px',
		'&.Mui-expanded': {
			fontWeight: theme.typography.fontWeightNormal,
		},
		'&:hover': {
			backgroundColor: theme.palette.action.hover,
			borderRadius: '8px',
		},
		'&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
			backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
			color: 'var(--tree-view-color)',
		},
		[`& .${treeItemClasses.label}`]: {
			fontWeight: 'inherit',
			color: 'inherit',
		},
	},
	[`& .${treeItemClasses.group}`]: {
		marginLeft: 0,
		[`& .${treeItemClasses.content}`]: {
			paddingLeft: theme.spacing(2),
		},
	},
}));

function StyledTreeItem(props) {
	const { bgColor, color, svg, labelIcon: LabelIcon, labelText, number, ...other } = props;

	return (
		<StyledTreeItemRoot
			label={
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						p: 0.5,
						pr: 0,
					}}
				>
					{LabelIcon && <img src={LabelIcon} color='inherit' style={{ height: '1.2rem', zIndex: '10' }} alt='' />}
					{svg}
					<Typography
						variant='body2'
						className='whitespace-nowrap'
						sx={{
							fontWeight: '400',
							flexGrow: 1,
							fontSize: '0.9rem',
							fontFamily: 'Tajawal, sans-serif !important',
						}}
					>
						{labelText}
					</Typography>
					{number && (
						<div className='number flex flex-col items-center justify-center opacity-0' style={{ width: '25px', height: '25px', backgroundColor: '#B6BE34', borderRadius: '50%' }}>
							<span style={{ fontSize: '16px', color: '#F7FCFF' }}>{number}</span>
						</div>
					)}
				</Box>
			}
			style={{
				'--tree-view-color': color,
				'--tree-view-bg-color': bgColor,
				margin: '0.25rem 0',
			}}
			{...other}
		/>
	);
}

StyledTreeItem.propTypes = {
	bgColor: PropTypes.string,
	color: PropTypes.string,
	labelIcon: PropTypes.elementType,
	labelInfo: PropTypes.string,
	labelText: PropTypes.string.isRequired,
};

const SideBar = ({ openSidebar, closeSidebar, closeSidebarOnly }) => {
	const BackDrop = ({ closeSidebarOnly }) => {
		return(
			openSidebar && <div onClick={closeSidebarOnly} className='fixed back_drop bottom-0 left-0 h-full w-full z-50'></div> 
		)
	};
	const [expanded, setExpanded] = useState(['1']);
	const handleExpanding = (id) => () => {
		setExpanded([id]);
	};
	return (
		<>
			<BackDrop
				closeSidebarOnly={() => {
					closeSidebarOnly()
				}}
			></BackDrop>
			<Box
				sx={{
					'&  path': {
						fill: '#02466A',
					},
					'&  .Mui-expanded .MuiTreeItem-iconContainer': {
						display: 'none',
					},
					'&  .Mui-expanded .MuiTreeItem-iconContainer path': {
						fill: '#fff',
					},
					'&  .Mui-expanded .MuiTreeItem-label path, .single_link .Mui-selected .MuiTreeItem-label path': {
						fill: '#1DBBBE',
					},
					'&  .Mui-expanded .MuiTreeItem-label g, .single_link .Mui-selected .MuiTreeItem-label g': {
						fill: '#1DBBBE',
					},
				}}
				className={`${styles.sidebar} ${openSidebar ? styles.active : ''}`}
			>
				<TreeView
					aria-label='file system navigator'
					defaultCollapseIcon={<IoIosArrowDown />}
					defaultExpandIcon={<IoIosArrowBack />}
					expanded={expanded}
					sx={{
						flexGrow: 1,
						maxWidth: 400,
						overflowY: 'auto',
						overflowX: 'hidden',
						'& .MuiTreeItem-group .MuiTreeItem-content': {
							paddingLeft: 0,
						},
						'& .MuiTypography-root': {
							color: '#02466A',
							fontSize: '18px',
							fontWeight: 400,
							paddingRight: '10px',
						},
						'& .Mui-expanded .MuiTypography-root , & .single_link .Mui-selected .MuiTypography-root': {
							color: '#fff',
						},
						'& > .MuiTreeItem-root .MuiTreeItem-root ': {
							backgroundColor: '#C0E9FF',
							margin: '0.25rem 0',
							borderRadius: '8px',
							padding: '0.25rem 1rem',
						},
						'& > a .MuiTreeItem-root:has(.Mui-expanded) .MuiCollapse-root .MuiTreeItem-root ': {
							backgroundColor: '#C0E9FF',
							margin: '0.25rem 0',
							borderRadius: '8px',
							padding: '0.25rem 1rem 0.25rem 12px',
						},
						'& > .MuiTreeItem-root .Mui-expanded.MuiTreeItem-content': {
							width: '100%',
							backgroundColor: '#02466A !important',
							color: '#fff !important',
							transition: '0.1s',
							borderRight: '6px solid #1DBBBE',
							borderRadius: '8px',
							paddingRight: '2px',
						},
						'& .MuiTreeItem-root .MuiTreeItem-label': {
							fontFamily: 'Tajawal, sans-serif !important',
						},
						'& > .MuiTreeItem-root .MuiCollapse-root .MuiCollapse-wrapper li:has(> .MuiTreeItem-content.Mui-selected) , & > a .MuiTreeItem-root .MuiCollapse-root .MuiCollapse-wrapper li:has(> .MuiTreeItem-content.Mui-selected)':
						{
							backgroundColor: '#1DBBBE',
						},
						'& > .MuiTreeItem-root .MuiCollapse-root .MuiCollapse-wrapper .MuiTreeItem-content.Mui-selected,& > .MuiTreeItem-root .MuiCollapse-root .MuiCollapse-wrapper .MuiTreeItem-content.Mui-focused ': {
							backgroundColor: 'transparent !important',
						},
						'& > a .MuiTreeItem-root .MuiCollapse-root .MuiCollapse-wrapper .MuiTreeItem-content.Mui-selected': {
							backgroundColor: 'transparent !important',
						},
						'& > a .MuiTreeItem-root .MuiCollapse-root .MuiCollapse-wrapper .MuiTreeItem-content.Mui-selected .number': {
							opacity: '1 !important',
						},
						'& > .MuiTreeItem-root .MuiCollapse-root .MuiCollapse-wrapper .MuiTreeItem-content:hover,& > a .MuiTreeItem-root .MuiCollapse-root .MuiCollapse-wrapper .MuiTreeItem-content:hover ': {
							backgroundColor: 'transparent',
						},
						'& > a .MuiTreeItem-root .Mui-expanded.MuiTreeItem-content , & > a.single_link .MuiTreeItem-root .Mui-selected.MuiTreeItem-content': {
							backgroundColor: '#02466A !important',
							color: '#fff !important',
							transition: '0.1s',
							borderRight: '6px solid #1DBBBE',
							borderRadius: '8px',
							paddingRight: '2px',
						},
					}}
				>
					<Link className='single_link' onClick={() => { closeSidebar(); }} to={'/'}>
						<StyledTreeItem nodeId='1' onClick={handleExpanding('1')} labelText='????????????????' svg={<Dashboard style={{ height: '1.2rem', zIndex: '10' }} />} />
					</Link>
					<StyledTreeItem nodeId='2' onClick={handleExpanding('2')} labelText='??????????' svg={<Market style={{ height: '1.2rem', zIndex: '10' }} />}>
						<Link onClick={() => { closeSidebar(); }} to={'/??????_????????????'}>
							<StyledTreeItem
								className='pr-5'
								nodeId='33'
								labelText='?????? ????????????'
								svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />}
							></StyledTreeItem>
						</Link>
						<Link to={'/??????????_??????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem
								className='pr-5'
								nodeId='34'
								labelText='?????????? ??????????'
								svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />}
							></StyledTreeItem>
						</Link>
						<Link to={'/??????????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem className='pr-5' nodeId='35' labelText='??????????????' svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />} />
						</Link>
					</StyledTreeItem>

					<Link to={'/??????????????'}>
						<StyledTreeItem

							onClick={handleExpanding('4')}
							sx={{
								'& .MuiCollapse-root': {
									transitionDuration: '3s ',
								},
							}}
							nodeId='4'
							labelText='??????????????'
							svg={<Store style={{ height: '1.2rem', zIndex: '10' }} />}
						>
							<Link to={'/????????_??????????????'} onClick={() => { closeSidebar(); }}>
								<StyledTreeItem
									className='pr-5'
									svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />}
									nodeId='5'
									labelText='???????? ??????????????'
								></StyledTreeItem>
							</Link>

							<Link to={'/??????_??????????????'} onClick={() => { closeSidebar(); }}>
								<StyledTreeItem className='pr-5' svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />} nodeId='6' labelText='??????????????' />
							</Link>
							<Link to={'/????????????????'} onClick={() => { closeSidebar(); }}>
								<StyledTreeItem className='pr-5' svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />} nodeId='7' labelText='????????????????' />
							</Link>
							<Link to={'/??????????????'} onClick={() => { closeSidebar(); }}>
								<StyledTreeItem
									className='pr-5'
									svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />}
									nodeId='8'
									number={2}
									labelText='??????????????'
								/>
							</Link>
						</StyledTreeItem>
					</Link>

					<Link to={'/??????????????'}>
						<StyledTreeItem
							sx={{
								'& .MuiCollapse-root': {
									transitionDuration: '3s ',
								},
							}}
							onClick={handleExpanding('9')}
							nodeId='9'
							labelText='??????????????'
							svg={<Price style={{ height: '1.2rem', zIndex: '10' }} />}
						>
							<Link to={'/????????????????????_??????????????'} onClick={() => { closeSidebar(); }}>
								<StyledTreeItem nodeId='10' svg={<DolarIcon style={{ height: '1.2rem', zIndex: '10' }} />} labelText='???????????????????? ??????????????' />
							</Link>
						</StyledTreeItem>
					</Link>

					<Link className='single_link' to={'/??????????????'} onClick={() => { closeSidebar(); }}>
						<StyledTreeItem nodeId='11' onClick={handleExpanding('')} labelText='??????????????' svg={<Category style={{ height: '1.2rem', zIndex: '10' }} />}></StyledTreeItem>
					</Link>
					<Link className='single_link' to={'/????????????????_????????????'} onClick={() => { closeSidebar(); }}>
						<StyledTreeItem nodeId='12' onClick={handleExpanding('')} labelText='???????????????? ????????????' svg={<Graduation style={{ height: '1.2rem', zIndex: '10' }} />}></StyledTreeItem>
					</Link>
					<Link to={'/????????????'}>
						<StyledTreeItem
							sx={{
								'& .MuiCollapse-root': {
									transitionDuration: '3s ',
								},
							}}
							nodeId='13'
							labelText='????????????'
							onClick={handleExpanding('13')}
							svg={<Template style={{ height: '1.2rem', zIndex: '10' }} />}
						>
							<Link to={'/????????????????'} onClick={() => { closeSidebar(); }}>
								<StyledTreeItem className='pr-5' svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />} nodeId='14' labelText='????????????????' />
							</Link>
							<Link to={'/??????????????'} onClick={() => { closeSidebar(); }}>
								<StyledTreeItem className='pr-5' svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />} nodeId='15' labelText='??????????????' />
							</Link>
						</StyledTreeItem>
					</Link>
					<Link className='single_link' to={'/??????????????'} onClick={() => { closeSidebar(); }}>
						<StyledTreeItem nodeId='16' labelText='??????????????' onClick={handleExpanding('')} svg={<Pages style={{ height: '1.2rem', zIndex: '10' }} />}></StyledTreeItem>
					</Link>
					<Link className='single_link' to={'/????????_????????????????????'} onClick={() => { closeSidebar(); }}>
						<StyledTreeItem nodeId='17' labelText='????????????????????' onClick={handleExpanding('')} svg={<User style={{ height: '1.2rem', zIndex: '10' }} />}></StyledTreeItem>
					</Link>
					<StyledTreeItem
						sx={{
							'& .MuiCollapse-root': {
								transitionDuration: '3s ',
							},
						}}
						nodeId='18'
						labelText='??????????????'
						onClick={handleExpanding('18')}
						svg={<Marketing style={{ height: '1.2rem', zIndex: '10' }} />}
					>
						<Link to={'/??????????????_??????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem className='pr-5' svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />} nodeId='19' labelText='?????????????? ??????????' />
						</Link>
					</StyledTreeItem>
					<StyledTreeItem
						sx={{
							'& .MuiCollapse-root': {
								transitionDuration: '3s ',
							},
						}}
						nodeId='20'
						labelText='??????????????????'
						onClick={handleExpanding('20')}
						svg={<SalesMan style={{ height: '1.2rem', zIndex: '10' }} />}
					>
						<Link to={'/??????_????????????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem className='pr-5' svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />} nodeId='21' labelText='?????? ????????????????' />
						</Link>
						<Link to={'/????????_??????????_??????????????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem className='pr-5' svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />} nodeId='22' labelText='???????? ??????????????' />
						</Link>
					</StyledTreeItem>
					<StyledTreeItem
						sx={{
							'& .MuiCollapse-root': {
								transitionDuration: '3s ',
							},
						}}
						nodeId='23'
						labelText='??????????????????'
						onClick={handleExpanding('23')}
						svg={<Category style={{ height: '1.2rem', zIndex: '10' }} />}
					>
						<Link to={'/??????????????_??????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem className='pr-5' svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />} nodeId='24' labelText='?????????????? ??????????' />
						</Link>
						<Link to={'/??????????????_??????????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem className='pr-5' svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />} nodeId='25' labelText='?????????????? ??????????????' />
						</Link>
					</StyledTreeItem>
					<Link className='single_link' to={'/??????????????'} onClick={() => { closeSidebar(); }}>
						<StyledTreeItem nodeId='26' labelText='??????????????' onClick={handleExpanding('')} svg={<Order style={{ height: '1.2rem', zIndex: '10' }} />}></StyledTreeItem>
					</Link>
					<Link className='single_link' to={'/'} onClick={() => { closeSidebar(); }}>
						<StyledTreeItem nodeId='27' labelText='??????????????' onClick={handleExpanding('')} svg={<Wallet style={{ height: '1.2rem', zIndex: '10' }} />}></StyledTreeItem>
					</Link>
					<Link className='single_link' to={'/??????????_??????????'} onClick={() => { closeSidebar(); }}>
						<StyledTreeItem nodeId='28' labelText='?????????? ??????????' onClick={handleExpanding('')} svg={<Support style={{ height: '1.2rem', zIndex: '10' }} />}></StyledTreeItem>
					</Link>
					<Link className='single_link' to={'/??????????_??????????'} onClick={() => { closeSidebar(); }}>
						<StyledTreeItem nodeId='29' labelText='?????????? ??????????' onClick={handleExpanding('')} svg={<Shipping style={{ height: '1.2rem', zIndex: '10' }} />}></StyledTreeItem>
					</Link>
					<Link className='single_link' to={'/????????????_??????????'} onClick={() => { closeSidebar(); }}>
						<StyledTreeItem nodeId='30' labelText='???????????? ??????????' onClick={handleExpanding('')} svg={<PaymentGateway style={{ height: '1.2rem', zIndex: '10' }} />}></StyledTreeItem>
					</Link>
					<StyledTreeItem
						sx={{
							'& .MuiCollapse-root': {
								transitionDuration: '3s ',
							},
						}}
						nodeId='31'
						labelText='??????????????????'
						onClick={handleExpanding('31')}
						svg={<Setting style={{ height: '1.2rem', zIndex: '10' }} />}
					>
						<Link to={'/????????????????_????????????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem
								className='pr-5'
								svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />}
								nodeId='32'
								labelText='?????????????????? ????????????????'
							/>
						</Link>
						<Link to={'/??????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem svg={<CityIcon style={{ height: '1.2rem', zIndex: '10' }} />} nodeId='36' labelText='??????????' />
						</Link>
						<Link to={'/??????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem svg={<CityIcon style={{ height: '1.2rem', zIndex: '10' }} />} nodeId='37' labelText='??????????' />
						</Link>
						<Link to={'/??????????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem svg={<DolarIcon style={{ height: '1.2rem', zIndex: '10' }} />} nodeId='40' labelText='??????????????' />
						</Link>
						<Link to={'/????????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem svg={<EmailIcon style={{ height: '1.2rem', zIndex: '10' }} />} nodeId='41' labelText='????????????' />
						</Link>
						<Link to={'/????????????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem svg={<ReportIcon style={{ height: '1.2rem', zIndex: '10' }} />} nodeId='42' labelText='????????????????' />
						</Link>
						<Link to={'/??????????????_??????????????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem
								className='pr-5'
								svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />}
								nodeId='43'
								labelText='?????????????? ??????????????????'
							/>
						</Link>
						<Link to={'/??????????_??????????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem className='pr-5' svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />} nodeId='44' labelText='???????? ??????????????' />
						</Link>
						<Link to={'/??????????????????'} onClick={() => { closeSidebar(); }}>
							<StyledTreeItem className='pr-5' svg={<GiPlainCircle style={{ position: 'absolute', right: '-10px', height: '1rem', width: '1rem', zIndex: '10' }} />} nodeId='45' labelText='??????????????????' />
						</Link>
					</StyledTreeItem>
				</TreeView>
			</Box>
		</>
	);
};

export default SideBar;
