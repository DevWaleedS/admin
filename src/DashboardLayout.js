import React, { useState, useContext } from "react";
import ActionCompleteComp from "./components/ActionCompleteComp/ActionCompleteComp";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import { Navbar, SideBar, BackToTop } from './components/index';
import Context from "./store/context";
import { NotificationContext } from "./store/NotificationProvider";
import SearchInput from "./components/SearchInput/SearchInput";

export default function DashboardLayout() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const contextStore = useContext(Context);
    const NotificationStore = useContext(NotificationContext);
    const { title, setTitle } = contextStore;
    const { notificationTitle } = NotificationStore;
    return (
        <>
            <Navbar
                openSidebar={() => { setOpenSidebar(!openSidebar) }}
            >
            </Navbar>

            {title && <ActionCompleteComp></ActionCompleteComp>}
            {notificationTitle && <DeleteModal></DeleteModal>}
            <div className='flex mx-auto mt-20 ' style={{ maxWidth: '1920px' }}>
                <SideBar openSidebar={openSidebar} closeSidebar={() => setOpenSidebar(!openSidebar)} />
                <div className='p-4 flex-1 app-page'>
                    <div className="md:hidden flex relative h-12 max-w-[90%] mx-auto mb-4 mt-2">
                        <SearchInput />
                    </div>
                    <BackToTop />
                </div>
            </div>
        </>
    )
}
