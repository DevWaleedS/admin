import "./App.css";
import React, {useContext } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ActionCompleteComp from "./components/ActionCompleteComp/ActionCompleteComp";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import { Navbar, SideBar, BackToTop } from './components/index';
import Context from "./store/context";
import { NotificationContext } from "./store/NotificationProvider";

import {
  MainPage,
  SouqOtlobha,
  GeneralSouq,
  Storage,
  Markets,
  MarketsActivity,
  MarketsTable,
  ProductsTable,
  VerificationTable,
  RecordingStatus,
  Packages,
  CurrentSubscriptions,
  ServicesPage,
  OtlobhaAcademy,
  TemplatePage,
  SliderPage,
  PartitionsPage,
  PagesPage,
  Users,
  CouponsPage,
  DelegatesTablePage,
  AddNewDelegatePage,
  EditDelegatePage,
  StatusPage,
  ShopVarieties,
  MarketsVarieties,
  OrdersPage,
  SupportPage,
  ShippingCompaniesPage,
  PaymentGatewaysPage,
  PrimarySettings,
  CountriesPages,
  CitiesPage,
  CurrencyPage,
  EmailSettingPage,
  SocialMediaLinksPage,
  RegistrationCasesPage,
  NotificationsPage
} from "./pages/index";
function App() {
  const contextStore = useContext(Context);
  const NotificationStore = useContext(NotificationContext);
  const { title, setTitle } = contextStore;
  const {notificationTitle} = NotificationStore;

  return (
			<BrowserRouter>
				<Navbar></Navbar>
				{title && <ActionCompleteComp></ActionCompleteComp>}
				{notificationTitle && <DeleteModal></DeleteModal>}
				<div className='flex mx-auto mt-20 ' style={{ maxWidth: '1920px' }}>
					<SideBar />
					<div className='p-4 flex-1 app-page'>
						<BackToTop />
						<Routes>
							<Route exact path='/' element={<MainPage />} />
							{/*************************** السوق ************************/}
							{/* <Route path="/السوق" element={<Souq />} /> */}
							<Route path='/سوق_اطلبها' element={<SouqOtlobha />} />
							<Route path='/السوق_العام' element={<GeneralSouq />} />
							<Route path='/المخزون' element={<Storage />} />
							{/************************* المتاجر **********************/}
							<Route path='/المتاجر' element={<Markets />} />
							<Route path='/نشاط_المتاجر' element={<MarketsActivity />} />
							<Route path='/عرض_المتاجر' element={<MarketsTable />} />
							<Route path='/المنتجات' element={<ProductsTable />} />
							<Route path='/التوثيق' element={<VerificationTable />} />
							<Route path='/حالة_التسجيل' element={<RecordingStatus />} />
							{/************************* الباقات ***********************/}
							<Route path='/الباقات' element={<Packages />} />
							<Route path='/الاشتراكات_الحالية' element={<CurrentSubscriptions />} />
							{/********************** الخدمات *******************/}
							<Route path='/الخدمات' element={<ServicesPage />} />
							{/* الاكاديمية  */}
							<Route path='/أكاديمية_اطلبها' element={<OtlobhaAcademy />} />
							{/* القالب */}
							<Route path='/القالب' element={<TemplatePage />} />

							<Route path='/السلايدر' element={<SliderPage />} />
							<Route path='/التقسيم' element={<PartitionsPage />} />

							{/* الصفحات */}
							<Route path='/الصفحات' element={<PagesPage />} />
							{/* المستخدمين */}
							<Route path='/جدول_المستخدمين' element={<Users />} />
							{/* التسويق */}
							<Route path='/كوبونات_الخصم' element={<CouponsPage />} />

							{/* المندوبين */}
							<Route path='/عرض_المناديب' element={<DelegatesTablePage />} />
							<Route path='/إضافة_مندوب_جديد' element={<AddNewDelegatePage />} />
							<Route path='/تعديل_مندوب' element={<EditDelegatePage />} />
							<Route path='/حالة_تسجيل_المندوبين' element={<StatusPage />} />

							{/* التصنيفات */}
							<Route path='/تصنيفات_السوق' element={<ShopVarieties />} />
							<Route path='/تصنيفات_المتاجر' element={<MarketsVarieties />} />
							{/* الطلبات */}
							<Route path='/الطلبات' element={<OrdersPage />} />

							{/* الدعم الفنى */}
							<Route path='/الدعم_الفنى' element={<SupportPage />} />

							{/* شركات_الشحن */}
							<Route path='/شركات_الشحن' element={<ShippingCompaniesPage />} />

							{/* بوابات_الدفع */}
							<Route path='/بوابات_الدفع' element={<PaymentGatewaysPage />} />

							{/* الإعدادات */}
							<Route path='/الاعدادت_الأساسية' element={<PrimarySettings />} />
							<Route path='/الدول' element={<CountriesPages />} />
							<Route path='/المدن' element={<CitiesPage />} />
							<Route path='/العملات' element={<CurrencyPage />} />
							<Route path='/البريد' element={<EmailSettingPage />} />
							<Route path='/التواصل_الاجتماعى' element={<SocialMediaLinksPage />} />
							<Route path='/حالات_التسجيل' element={<RegistrationCasesPage />} />
							<Route path='/الاشعارات' element={<NotificationsPage />} />
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		);
}

export default App;
