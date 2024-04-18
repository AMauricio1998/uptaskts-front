import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "@/views/projects/CreateProjectView";
import EditProjectView from "@/views/projects/EditProjectView";
import ProjectDetailsView from "@/views/projects/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import Error404 from "./components/Error404";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={ <AppLayout /> }>
                    <Route index path="/" element={ <DashboardView />}/>
                    <Route path="/projects/create" element={ <CreateProjectView />}/>
                    <Route path="/projects/:projectId" element={ <ProjectDetailsView />}/>
                    <Route path="/projects/:projectId/edit" element={ <EditProjectView />}/>
                    <Route path="/projects/:projectId/team" element={ <ProjectTeamView />}/>
                </Route>

                <Route element={ <AuthLayout /> }>
                    <Route index path="/auth/login" element={ <LoginView />}/>
                    <Route index path="/auth/register" element={ <RegisterView />}/>
                    <Route index path="/auth/confirm-account" element={ <ConfirmAccountView />}/>
                    <Route index path="/auth/request-code" element={ <RequestNewCodeView />}/>
                    <Route index path="/auth/forgot-password" element={ <ForgotPasswordView />}/>
                    <Route index path="/auth/new-password" element={ <NewPasswordView />}/>
                </Route>

                <Route path="*" element={ <Error404 /> }/>
            </Routes>
        </BrowserRouter>
    )
}