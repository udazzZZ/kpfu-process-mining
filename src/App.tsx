import { store } from "app/store/store";
import { StrictMode } from "react";
import { Provider } from "react-redux";

import "./css/index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "app/router/router";

const App = () => {
    return (
        <StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </StrictMode>
    );
};

export default App;
