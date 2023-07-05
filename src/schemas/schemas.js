import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const registerFrom = yup.object(
  {
     name : yub.string().required("Tên không được để trống"),
     email : yub.string().required("Email khong duoc de trong !! ")
  }
)