import React, {useEffect} from 'react';
import Search from "../input/Search";
import CoinCapAxiosInstance from "../../axios/CoinCapAxiosInstance";
import {getUser} from "../../utils/userUtils";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const user = getUser()
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = React.useState('');
    const [searchResults, setSearchResults] = React.useState();
    const [isError, setIsError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [userCardOpen, setUserCardOpen] = React.useState(false);

    useEffect(() => {
        if (searchValue.length > 0) {
            setIsLoading(true);
            setIsError(false);
            const debounceSearchFn = setTimeout(() => {
                CoinCapAxiosInstance.get(`assets/${searchValue}`).then(response => {
                    console.log('response: ', response.data.data);
                    setSearchResults(response.data.data);
                    setIsError(false);
                }).catch(error => {
                    console.error('ERROR: ', error);
                    setSearchResults()
                    setIsError(true);
                }).finally(() => {
                    setIsLoading(false);
                });
            }, 1000);

            return () => {
                setIsLoading(false);
                setIsError(false);
                clearTimeout(debounceSearchFn)
            };
        }

    }, [searchValue]);

    const onChange = (e) => {
        if (e.target.value.length === 0) {
            setSearchResults();
        }
        setSearchValue(e.target.value);
    }

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login')

    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>

            </div>


            <div className="navbar-end gap-2">
                <div className={'relative'}>

                    {isLoading && (
                        <ul className="menu navbar-end bg-base-200 absolute left-0 top-14 z-20 rounded-box w-56">
                            <li>
                                <span className={'loading mx-auto'}>Loading...</span>
                            </li>
                        </ul>
                    )}

                    {isError && (
                        <ul className="menu navbar-end bg-base-200 absolute left-0 top-14 z-20 rounded-box w-56">
                            <li>
                                <a>Il faut renseigner le nom complet (pas moi c'est l'api)</a>
                            </li>
                        </ul>
                    )}

                    {searchResults && (
                        <ul className="menu navbar-end bg-base-200 absolute left-0 top-14 z-20 rounded-box w-56">
                            <li>
                                <a className={'flex justify-between'}>
                                    <span>{searchResults.id}</span>
                                    <span>{parseFloat(searchResults.priceUsd).toFixed(2)}$</span>
                                </a>
                            </li>
                        </ul>
                    )}
                    <Search value={searchValue} onChange={(e) => onChange(e)}/>
                </div>

                <div className=" border btn  h-10 w-10 inset-0" onClick={() => setUserCardOpen(true)}>
                    {user?.user.firstName[0] || ''}
                    {user?.user.lastName[0] || ''}
                </div>

                {userCardOpen && (
                    <>
                        <div className={'fixed top-0 right-0 left-0 bottom-0 bg-black/30 z-10'}
                             onClick={() => setUserCardOpen(false)}/>
                        <div
                            className={`flex card absolute flex-col gap-2 items-center bg-base-100 px-12 py-4 z-20 top-[72px] right-4 rounded-md shadow`}
                        >

                            <div className={'text-xl font-semibold h-20 w-20 rounded-full border flex items-center justify-center'}>
                                {user?.user.firstName[0] || ''}
                                {user?.user.lastName[0] || ''}
                            </div>
                            <div className="flex flex-row items-center">
                                <span className="text-xl">{user.user.firstName} {user.user.lastName}</span>
                            </div>

                            <div onClick={logout}
                                 className={'btn'}>
                                Déconnexion
                            </div>
                        </div>
                    </>
                )}
            </div>


        </div>
    );
};

export default Navbar;