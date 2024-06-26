import { getProjectById } from "@/api/ProjectApi";
import EditProjectForm from "@/components/projects/EditProjectForm";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom"

const EditProjectView = () => {

    const params = useParams();
    const projectId = params.projectId!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProjec', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    })

    if (isLoading) return <Spinner />
    if (isError) return <Navigate to={'/404'}/>
    if (data) return <EditProjectForm data={data} projectId={projectId}/>    
}

export default EditProjectView