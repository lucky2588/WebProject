import { useNavigate } from "react-router";
import {  useRegisterMutation } from "../app/service/authApi"
import { toast } from "react-toastify";

export const useRegister = () => {
    const natigave = useNavigate();
    const [registerUser] = useRegisterMutation();
    const submitUser = (data) => {
        registerUser(data)
        .unwrap()
            .then(
                () => {
                    toast.success("Đăng kí tài khoản thành công , hãy kiểm tra email để lấy mã token ")
                    natigave("/register/confirm")
                }
            )
            .catch((err) => {
                console.log(err)
              alert(err.data.message)
                 return;
            })
    }

//   const confirmUser = (data) => {
//     confirmToken(data)
//         .unwrap()
//             .then((res) => {
//                     alert(res)
//                     natigave("/login")
//                 }
//             )
//             .catch((err) => {
//                 return alert("Không tìm thấy Token này ")
//             })
//   }
    return {
        submitUser
    }
};
export default useRegister;