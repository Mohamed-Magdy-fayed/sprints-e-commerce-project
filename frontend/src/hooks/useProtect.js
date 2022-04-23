import axios from "axios";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import StoreContext from "../context/store/StoreContext";

export const useProtect = () => {
    const navigate = useNavigate();
    const { loginUser, logoutUser, setAppData, setLoading } = useContext(StoreContext);
    const url = useLocation().pathname;

    const checkAuth = () => {
        setLoading(true)
        const checkToken = localStorage.getItem('token')
        if (checkToken) {
            const { id, token } = JSON.parse(checkToken)
            const config = {
                method: 'get',
                url: `https://mina-jpp1.herokuapp.com/api/users/${id}?token=${token}`,
                headers: {}
            }
            axios(config).then(res => {
                const userData = {
                    user: res.data,
                    token,
                }
                loginUser(userData)
                setLoading(false)
                if (url === '/login' || url === '/register') {
                    navigate('/')
                }
            })
        } else {
            logoutUser()
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
