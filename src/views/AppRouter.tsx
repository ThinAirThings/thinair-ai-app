import { Outlet, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { AuthenticationView } from "./AuthenticationView/AuthenticationView";
import { AuthenticationProvider, ProtectedRoute } from "../air-systems/Authentication.configure";
import { ReactQueryProvider } from "../clients/ReactQuery/ReactQueryProvider";
import { InfinitySpinSuspense } from "../interface/InfinitySpinSuspense/InfinitySpinSuspense";
import styled from "@emotion/styled";
import { stack } from "../styles/stackStyle";
import { AppNavigation } from "../interface/AppNavigation/AppNavigation";
import { Components } from "../routes/components/Components";
import { Home } from "../routes/home/Home";
import { Settings } from "../routes/settings/Settings";


const AppContainer = styled.div(stack('h', 'left', 'top'), {
    width: '100%',
    height: '100%',
})
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="*" element={
            <AuthenticationProvider>
                <ReactQueryProvider>
                    <InfinitySpinSuspense width={200}>
                        <Routes>
                            <Route path='/*' element={
                                <ProtectedRoute>
                                    <AppContainer>
                                        <AppNavigation/>
                                        <Outlet/>
                                    </AppContainer>
                                </ProtectedRoute>
                            }>
                                <Route path="" element={
                                    <Home/>
                                }>
                                </Route>
                                <Route path="components" element={
                                    <Components/>
                                }/>
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





