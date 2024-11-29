import toast from "react-hot-toast"

export const handleSuccess = (mess) =>{
    toast.success(mess,{
        position:'top-center'
    })
}
export const handleError = (mess) =>{
    toast.error(mess,{
        position:'top-center'
    })
}