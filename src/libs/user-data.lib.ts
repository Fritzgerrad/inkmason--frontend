import { User } from "@src/models/User";
import { createUser, removeUser, selectUser } from "@src/redux/features/auth/userSlice";
import { useAppDispatch, useAppSelector } from '@src/redux/hooks';

export const UserService = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const saveUser = (user: User) => {
        dispatch(createUser(user));
        if (typeof window !== "undefined" && sessionStorage) {
            sessionStorage.setItem("name", user.firstname);
            sessionStorage.setItem("id", user.id);
            sessionStorage.setItem("role", user.role);
            //sessionStorage.setItem("loginTime", String(new Date()));
            window.location.reload();
        }
    };

    const getUser = (): User | null => {

        if(user == null){
            if (typeof window !== "undefined" && sessionStorage) {
            const firstname = sessionStorage.getItem("name");
            const id = sessionStorage.getItem("id");
            const role = sessionStorage.getItem("role");
            if (firstname && id && role) {
                dispatch(createUser({ firstname, id, role }));
                return { firstname, id, role }
            }
        }}
        
        return user.user;
    };

    const deleteUser = () => {
        if (typeof window !== "undefined" && sessionStorage) {
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("role");
            window.location.reload();
        }
        dispatch(removeUser());
    };

    return { saveUser, getUser, deleteUser };
};
