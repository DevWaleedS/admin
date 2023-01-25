import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import UsersTable from '../../components/UsersPageComp/UsersTable';
import AddNewUser from '../../components/UsersPageComp/AddNewUser/AddNewUser';
import FunctionalRoles from '../../components/UsersPageComp/FunctionalRoles/FunctionalRoles';
import CreateRole from '../../components/UsersPageComp/CreateRole/CreateRole';
import EditRole from '../../components/UsersPageComp/EditRole/EditRole';
import { AiOutlinePlus } from 'react-icons/ai';

const Users = () => {
	const [showAddNewUser, setShowAddNewUser] = useState(false);
	const [showFunctionalRoles, setShowFunctionalRoles] = useState(false);
	const [showCreateRole, setShowCreateRole] = useState(false);
	const [showEditRole, setShowEditRole] = useState(null);

	return (
		<div className='relative pl-36 '>
			<div className='flex justify-end'>
				<div className='flex gap-4'>
					<Button
						className='h-14 w-[198px] text-lg'
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
						className='h-14 w-[180px] text-xl'
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
					cancel={() => {
						setShowAddNewUser(false);
					}}
				></AddNewUser>
			)}

			<UsersTable></UsersTable>
		</div>
	);
};

export default Users;
