import React, {useEffect, useState} from 'react';
import Navbar from "../components/navbar/Navbar";
import Drawer from "../components/drawer/Drawer";
import MarketGraph from "../components/graphs/MarketGraph";
import MarketInfo from "../components/market/MarketInfo";
import ArrayWithTitle from "../components/arrayWithTitle/ArrayWithTitle";
import Footer from "../components/footer/Footer";
import {TempAssetsData} from "../tempData/TempAssetsData";

const Home = () => {
    const [assets, setAssets] = useState([]);
    const [selectedExchange, setSelectedExchange] = useState(null);

    useEffect(() => {
        setAssets(TempAssetsData);
        /*coinCapAxiosInstance.get('exchanges').then(response => {
            console.log('response: ', response);
            setExchanges(response.data.data);
        })*/
    }, []);

    const handleOnSelect = (exchange) => {
        setSelectedExchange(exchange);
    }

    return (
        <div>
            <Navbar/>
            <Drawer/>
            <div className={'flex flex-col gap-6 px-10'}>
                <div className={'flex flex-row gap-6'}>
                    <MarketGraph title={selectedExchange?.name || ''} selectedAsset={selectedExchange}/>
                    <MarketInfo exchange={selectedExchange}/>
                </div>
                <ArrayWithTitle title={"Market"} array={assets} onSelect={handleOnSelect}/>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;