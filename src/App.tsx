import { store } from 'app/store/store';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';

import './css/index.css';
import { RouterProvider } from 'react-router/dom';
import { createMainRouter } from 'app/router/router';
import { getUserInfo } from 'shared/utils';

const App = () => {
    const isAuthenticated = !!getUserInfo();

    console.log({ isAuthenticated });

    const mainRouter = createMainRouter(isAuthenticated);

    return (
        <StrictMode>
            <Provider store={store}>
                <RouterProvider router={mainRouter} />
            </Provider>
        </StrictMode>
    );
};

export default App;
