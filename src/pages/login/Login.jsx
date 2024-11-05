import React, {useState} from 'react';
import axiosInstance from "../../axios/AxiosInstance";
import {useNavigate} from "react-router-dom";
import {addAlert} from "../../rxjs/services/alertService";

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const handleLogin = async (e) => {
        e.preventDefault();
        const body = {email, password};
        setLoading(true);
        axiosInstance.post('login', body).then(response => {
            addAlert({type: 'success', message: 'Login successful'})
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
        }).catch(error => {
            setError(error);
            console.log('error: ', error);
        }).finally(() => {
            setLoading(false);
        })
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-100">
            <div className="w-full max-w-sm p-6 shadow-md rounded-md bg-base-200">
                <h2 className="mb-4 text-2xl font-semibold text-center">Connexion</h2>
                {error && <div className="text-red-500 text-sm mb-4">{"Wrong credentials"}</div>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Entrez votre email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Entrez votre mot de passe"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`btn btn-primary w-full mt-4 ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Connexion...' : 'Connexion'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;