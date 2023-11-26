import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AuthenticationView } from "./AuthenticationView/AuthenticationView";
import { AuthenticationProvider, ProtectedRoute } from "../air-systems/Authentication.configure";
import { App } from "./App/App";
import { QuickBuild } from "../routes/QuickBuild/QuickBuild";
import { ReactQueryProvider } from "../clients/ReactQuery/ReactQueryProvider";
import { Settings } from "../routes/Settings/Settings";
import { InfinitySpinSuspense } from "../interface/InfinitySpinSuspense/InfinitySpinSuspense";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="*" element={
            <AuthenticationProvider>
                <ReactQueryProvider>
                    <InfinitySpinSuspense width={200}>
                        <Routes>
                            <Route path='/' element={
                                <ProtectedRoute>
                                    <App/>
                                </ProtectedRoute>
                            }>
                                <Route path="quick-build" element={<QuickBuild/>}/>
                                <Route path="settings" element={
                                    <Settings/>
                                }/>
                            </Route>
                            <Route path="/authentication/*" element={<AuthenticationView/>}/>
                        </Routes>
                    </InfinitySpinSuspense>
                </ReactQueryProvider>
            </AuthenticationProvider>
        }/>
    )
)

export const AppRouter = () => <RouterProvider
    router={router}
/>



