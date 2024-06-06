import { Outlet } from 'react-router-dom';
import HeaderCustomer from "../../components/Header/HeaderCustomer";
import CustomerBreadcrums from '../../components/Breadcrumbs/CustomerBreadcrums';

const CustomerLayout = () => {
    return (
        <>
            <HeaderCustomer />
            <CustomerBreadcrums />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default CustomerLayout;