import './Header.css';
import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.png';
import Eur from '../../assets/Europe.png';
import Usd from '../../assets/usa.png';
import { API_URL } from '../../constans/Constants';

const Header = () => {

    const [exchangeRate, setExchangeRate] = useState({
        usd: '',
        euro: '',
        date: '',
    });

    useEffect(() => {
        if (exchangeRate.usd === '') {
            fetchExchangeRate()
        }
    },);

    const fetchExchangeRate = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            setExchangeRate({
                ...exchangeRate,
                usd: data[24].rate.toFixed(2),
                euro: data[31].rate.toFixed(2),
                date: data[31].exchangedate,
            });
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
        }
    };

    return (
        <div className='Header'>
            <div className='header__div__logo'>
                <img className='header__img' src={Logo} alt="logo" />
                Курс валют на {exchangeRate.date}
            </div>
            <div className='header__courses'>
                <table>
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
                </table>
            </div>
        </div >
    )
};


export default Header;