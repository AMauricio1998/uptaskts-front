import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import ProjectForm from "@/components/projects/ProjectForm";
import { toast } from 'react-toastify';
import { useMutation } from "@tanstack/react-query";

import { ProjectFormData } from "@/types/index";
import { createProjectView } from "@/api/ProjectApi";

const CreateProjectView = () => {

    const navigate = useNavigate();
    const initialValues : ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    };

    const { register, handleSubmit, formState: { errors }} = useForm({ defaultValues: initialValues});

    const { mutate } = useMutation({
        mutationFn: createProjectView,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate('/');
        }
    })

    // mutation.mutateAsync(formData);
    const handleForm = (formData : ProjectFormData) => mutate(formData); // maneja automaticamente la peticiones asíncrona

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear proyecto</h1>
                <p className="text-2xl font-light text-gray-600 mt-5">Llena el siguiente formulario para crear un proyecto</p>

                <nav className="my-5">
                    <Link
                        className="bg-purple-500 hover:bg-purple-600 px-6 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
                        to={'/'}
                    >
                        Volver a Proyectos
                    </Link>
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >

                    <ProjectForm 
                        register={register}
                        errors={errors}
                    />

                    <input 
                        type="submit" 
                        value={'Crear proyecto'}
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
                    />
                </form>
            </div>
        </>
    )
}

export default CreateProjectView