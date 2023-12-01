import './Header.css';
import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.png';
import Eur from '../../assets/Europe.png';
import Usd from '../../assets/usa.png';
import { API_URL } from '../../constans/Constants';
import Fetch from '../../fetches/Fetch';

const Header = () => {

    const { data, loading, error } = Fetch(API_URL);

    const [exchangeRate, setExchangeRate] = useState({
        usd: '',
        euro: '',
        date: '',
    });

    useEffect(() => {
        const updateExchangeRate = () => {
            if (data) {
                setExchangeRate({
                    ...exchangeRate,
                    usd: data[24].rate.toFixed(2),
                    euro: data[31].rate.toFixed(2),
                    date: data[31].exchangedate,
                });
            }
        };

        updateExchangeRate();
    }, [data]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className='Header'>
            <div className='header__div__logo'>
                <img className='header__img' src={Logo} alt="logo" />
                Курс валют від {exchangeRate.date}
            </div>
            <div className='header__courses'>
                <table>
                    <tbody>
                        <tr>
                            <th>Валюта</th>
                            <th>Курс</th>
                        </tr>
                        <tr>
                            <td className='header__td__logo'>
                                <img className='header__logo__flags' src={Eur} alt="logo" />
                                EUR
                            </td>
                            <td>{exchangeRate.euro}</td>
                        </tr>
                        <tr>
                            <td className='header__td__logo'>
                                <img className='header__logo__flags' src={Usd} alt="logo" />
                                USD
                            </td>
                            <td>{exchangeRate.usd}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    )
};


export default Header;