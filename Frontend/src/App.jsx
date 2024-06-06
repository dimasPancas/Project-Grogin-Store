import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BadgeProvider } from './contexts/BadgeContext';
import { CategoryProvider } from './contexts/CategoryContext';
import route from './routes/routes';
import './assets/css/index.css'
import Snackbar from './components/Snackbar/Snackbar';
import { Provider } from 'react-redux'
import store from './redux/store.js'

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BadgeProvider>
          <CategoryProvider>
            <RouterProvider router={route} />
            <Snackbar />
          </CategoryProvider>
        </BadgeProvider>
      </AuthProvider>
    </Provider>
  );
}