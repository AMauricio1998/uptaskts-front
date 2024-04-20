import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import Spinner from "../Spinner"
import { useMemo } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "@/api/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

type NoteDetailsProps = {
    note: Note
}

const NoteDetails = ({ note } : NoteDetailsProps) => {

    const { data, isLoading } = useAuth();
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);
    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const projectId = params.projectId!;
    const taskId = queryParams.get('viewTask')!;

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['task', taskId] });
        }
    })

    if(isLoading) return <Spinner />

    return (
        <>
            <div className="flex justify-between bg-white shadow-md p-1 rounded-md my-2">
                <div>
                    <p className="text-lg text-slate-600">{note.content}</p>
                    <p className="text-xs text-gray-500 mt-2">Creado por: {note.createdBy.name} el { formatDate(note.createdAt) }</p>
                </div>


                {canDelete && (
                    <div className="flex justify-center items-center">
                        <button
                            className="bg-red-400 hover:bg-red-500 text-xs p-2 text-white font-bold cursor-pointer transition-colors rounded-lg"
                            onClick={() => mutate({ projectId, taskId, noteId: note._id})}
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default NoteDetails