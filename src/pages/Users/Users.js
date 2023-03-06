import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import UsersTable from '../../components/UsersPageComp/UsersTable';
import AddNewUser from '../../components/UsersPageComp/AddNewUser/AddNewUser';
import FunctionalRoles from '../../components/UsersPageComp/FunctionalRoles/FunctionalRoles';
import CreateRole from '../../components/UsersPageComp/CreateRole/CreateRole';
import EditRole from '../../components/UsersPageComp/EditRole/EditRole';
import { AiOutlinePlus } from 'react-icons/ai';
import PageNavigate from "../../components/PageNavigate/PageNavigate";
import useFetch from '../../hooks/useFetch';

const Users = () => {
	const { fetchedData, loading, reload, setReload } = useFetch('https://backend.atlbha.com/api/Admin/user');
	const [showAddNewUser, setShowAddNewUser] = useState(false);
	const [showFunctionalRoles, setShowFunctionalRoles] = useState(false);
	const [showCreateRole, setShowCreateRole] = useState(false);
	const [showEditRole, setShowEditRole] = useState(null);

	return (
		<div className='relative md:pl-36 p-4 pt-0'>
			<div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-y-4'>
				<PageNavigate currentPage={"جدول المستخدمين"} />
				<div className='md:w-auto w-full flex flex-row items-center gap-4'>
					<Button
						className='md:h-14 h-[45px] md:w-[198px] w-full text-lg whitespace-nowrap'
						type={'outline'}
						svg={<AiOutlinePlus color='#B6BE34' className='w-5 h-5' />}
						style={{ borderColor: '#B6BE34' }}
						textStyle={{ color: '#B6BE34' }}
						onClick={() => {
							setShowAddNewUser(true);
						}}
					>
						اضافة مستخدم
					</Button>
					<Button
						className='md:h-14 h-[45px] md:w-[180px] w-full text-xl whitespace-nowrap'
						onClick={() => {
							setShowFunctionalRoles(true);
						}}
						type={'normal'}
					>
						الأدوار
					</Button>
				</div>
			</div>
			{showCreateRole && (
				<CreateRole
					cancel={() => {
						setShowCreateRole(false);
					}}
				></CreateRole>
			)}

			{showEditRole && (
				<EditRole
					cancel={() => {
						setShowEditRole(false);
					}}
					role={showEditRole}
				></EditRole>
			)}

			{showFunctionalRoles && (
				<FunctionalRoles
					cancel={() => {
						setShowFunctionalRoles(false);
					}}
					openCreateRole={() => {
						setShowCreateRole(true);
					}}
					EditRole={(role) => {
						setShowEditRole(role);
					}}
				></FunctionalRoles>
			)}

			{showAddNewUser && (
				<AddNewUser
					reload={reload}
					setReload={setReload}
					cancel={() => {
						setShowAddNewUser(false);
					}}
				></AddNewUser>
			)}

			<UsersTable
				users={fetchedData?.data?.users}
				loading={loading}
				reload={reload}
				setReload={setReload}
			/>
		</div>
	);
};

export default Users;
