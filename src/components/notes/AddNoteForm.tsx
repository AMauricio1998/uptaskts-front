import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteApi";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

const AddNoteForm = () => {

    const params = useParams();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const projectId = params.projectId!;
    const taskId = queryParams.get('viewTask')!;

    const initialValues : NoteFormData = {
        content: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues});

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            reset();
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['task', taskId] });
        }
    })

    const hadleAddNote = (formData : NoteFormData) => {
        mutate({
            projectId,
            taskId,
            formData
        })
    }

    return (
        <form
            onClick={handleSubmit(hadleAddNote)}
            noValidate
            className="space-y-3"
        >
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="content">Crear Nota</label>
                <input 
                    type="text" 
                    id="content"
                    placeholder="Contenido de la nota"
                    className="w-full p-3 border border-gray-300"
                    {...register('content', { required: 'El contenido de la nota es obligatorio' })}
                />
                {errors.content && (

                    <ErrorMessage>{ errors.content.message }</ErrorMessage>
                )}
            </div>

            <input 
                type="submit"
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
            />
        </form>
    )
}

export default AddNoteForm