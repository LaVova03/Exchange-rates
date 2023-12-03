import './Conversion.css';
import React, { useEffect, useState } from 'react';
import Eur from '../../assets/Europe.png';
import Usa from '../../assets/usa.png';
import Ukr from '../../assets/Ukr.webp';
import { API_URL } from '../../constans/Constants';
import Fetch from '../../fetches/Fetch';

const Conversion = () => {

    const { exchangeRate, loading, error } = Fetch(API_URL);

    const [inputValue, setInputValue] = useState('');

    const [inputValue2, setInputValue2] = useState('');

    const [selectedCurrency, setSelectedCurrency] = useState({
        select1: 'usd',
        select2: 'uah',
    });

    const [results, setResults] = useState({
        result1: 0,
        result2: 0,
    })

    useEffect(() => {

        const calculateResult = (res, inp) => {
            let keySelect1 = null;
            let keySelect2 = null;
            for (let item in exchangeRate) {
                if (selectedCurrency.select1 === item) {
                    keySelect1 = exchangeRate[item]
                } else if (selectedCurrency.select2 === item) {
                    keySelect2 = exchangeRate[item]
                }
                setResults((prevResults) => ({
                    ...prevResults,
                    [res]: inp === inputValue ? inp * keySelect1 / keySelect2 : inp * keySelect2 / keySelect1,
                }))
            }
        }

        calculateResult('result1', inputValue)
        calculateResult('result2', inputValue2)

    }, [inputValue, inputValue2]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const handleCurrencyChange = (event) => {
        setSelectedCurrency({
            ...selectedCurrency,
            select1: event.target.value
        });
        setInputValue('');
        setInputValue2('');
    };

    const handleCurrencyChange2 = (event) => {
        setSelectedCurrency({
            ...selectedCurrency,
            select2: event.target.value
        });
        setInputValue('');
        setInputValue2('');
    };

    const handleInput1Change = (event) => {
        const inputText = event.target.value;
        const filteredValue = inputText.replace(/[^0-9]/g, '');
        setInputValue(filteredValue);
        setInputValue2('');
    }

    const handleInput2Change = (event) => {
        const inputText = event.target.value;
        const filteredValue = inputText.replace(/[^0-9]/g, '');
        setInputValue2(filteredValue);
        setInputValue('');
    }

    return (
        <div className='Conversion'>
            <h1>Обміняти валюту</h1>
            <div className="custom-number-input">
                <input type="text" value={inputValue2 ? '' : inputValue} onChange={handleInput1Change} placeholder={results.result2 ? results.result2.toFixed(2) : 0} />
                <select value={selectedCurrency.select1} onChange={handleCurrencyChange}>
                    {selectedCurrency.select2 === 'usd' ? null : <option value='usd'>USD $</option>}
                    {selectedCurrency.select2 === 'eur' ? null : <option value='eur'>EUR €</option>}
                    {selectedCurrency.select2 === 'uah' ? null : <option value='uah'>UAH ₴</option>}
                </select>
            </div>
            <div className="custom-number-input">
                <input type="text" value={inputValue ? '' : inputValue2} onChange={handleInput2Change} placeholder={results.result1 ? results.result1.toFixed(2) : 0} />
                <select value={selectedCurrency.select2} onChange={handleCurrencyChange2}>
                    {selectedCurrency.select1 === 'usd' ? null : <option value='usd'>USD $</option>}
                    {selectedCurrency.select1 === 'eur' ? null : <option value='eur'>EUR €</option>}
                    {selectedCurrency.select1 === 'uah' ? null : <option value='uah'>UAH ₴</option>}
                </select>
            </div>
            <img className='conversion__input1__logo' src={selectedCurrency.select1 === 'usd' ? Usa
                : selectedCurrency.select1 === 'eur' ? Eur
                    : selectedCurrency.select1 === 'uah' ? Ukr : null} alt="logo" />
            <img className='conversion__input2__logo' src={selectedCurrency.select2 === 'usd' ? Usa
                : selectedCurrency.select2 === 'eur' ? Eur
                    : selectedCurrency.select2 === 'uah' ? Ukr : null} alt="logo" />
        </div >
    )
};

export default Conversion;