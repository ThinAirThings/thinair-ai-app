import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AuthenticationView } from "./AuthenticationView/AuthenticationView";
import { AuthenticationProvider, ProtectedRoute } from "../air-systems/Authentication.configure";
import { App } from "./App/App";
import { QuickBuild } from "../routes/QuickBuild/QuickBuild";
import { ReactQueryProvider } from "../clients/ReactQuery/ReactQueryProvider";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="*" element={
            <AuthenticationProvider>
                <ReactQueryProvider>
                <Routes>
                    <Route path='/' element={
                        <ProtectedRoute>
                            <App/>
                        </ProtectedRoute>
                    }>
                        <Route path="quick-build" element={<QuickBuild/>}>
                            
                        </Route>
                    </Route>
                    <Route path="/authentication/*" element={<AuthenticationView/>}/>
                </Routes>
                </ReactQueryProvider>
            </AuthenticationProvider>
        }/>
    )
)

export const AppRouter = () => <RouterProvider
    router={router}
/>



