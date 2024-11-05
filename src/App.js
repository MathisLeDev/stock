import './App.css';
import {useEffect, useState} from "react";
import coinCapAxiosInstance from "./axios/CoinCapAxiosInstance";
import Navbar from "./components/navbar/Navbar";
import Drawer from "./components/drawer/Drawer";
import Footer from "./components/footer/Footer";
import {TempAssetsData} from "./tempData/TempAssetsData";
import ArrayWithTitle from "./components/arrayWithTitle/ArrayWithTitle";
import MarketGraph from "./components/graphs/MarketGraph";
import MarketInfo from "./components/market/MarketInfo";

function App() {
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



    return (<div>
            <Navbar />
            <Drawer />
            <div className={'flex flex-col gap-6 px-10'}>
                <div className={'flex flex-row gap-4'}>
                    <MarketGraph title={selectedExchange?.name || ''}/>
                    <MarketInfo exchange={selectedExchange}/>
                </div>
                <ArrayWithTitle title={"Market"} array={assets} onSelect={handleOnSelect}/>
            </div>
            <Footer />
        </div>
    );
}

export default App;
