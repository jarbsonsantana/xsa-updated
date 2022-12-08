import { createContext } from "react"

const default_user = {
    creditos: 0,
    email: '',
    img: '',
    nome: '',
    tipo: '',
    bonus: 0,
    bonuslib: 0,
    changeUser: (user:{}) =>{}
}

const UserContext = createContext(default_user);
export default UserContext;