import React from 'react';
import axiosInstance from "../../axios/AxiosInstance";
import {addAlert} from "../../rxjs/services/alertService";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const {navigate} = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const body = {email, password, firstName, lastName};
        setLoading(true);
        axiosInstance.post('/user', body).then(response => {
            addAlert({type: 'success', message: 'Register successful'})
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
        }).catch(error => {
            setError(error);
            console.log('error: ', error);
        }).finally(() => {
            setLoading(false);
        })
    }


    return (
        <div className="w-full max-w-sm p-6 shadow-md rounded-md bg-base-200">
            <h2 className="mb-4 text-2xl font-semibold text-center">Register</h2>
            {error && <div className="text-red-500 text-sm mb-4">{"Wrong credentials"}</div>}
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">First name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter your first name"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">Last name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter your last name"
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
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`btn btn-primary w-full mt-4 ${loading ? 'loading' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Register;