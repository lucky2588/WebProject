import { useNavigate } from "react-router";
import { useConfirmUserQuery } from "../app/service/authApi";
import { toast } from "react-toastify";


export const useConfirm = (token) => {
    const natigave = useNavigate();
    const {data , isError} = useConfirmUserQuery(token);
       if(data){
        toast.success("create Account Thành công !! ")
       }
       if(isError){
         alert(isError)
       }
 };
export default useConfirm;