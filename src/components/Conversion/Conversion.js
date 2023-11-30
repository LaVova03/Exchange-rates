import './Conversion.css';
import React, { useEffect, useState } from 'react';
import Eur from '../../assets/Europe.png';
import Usa from '../../assets/usa.png';
import Ukr from '../../assets/Ukr.webp';
import { API_URL } from '../../constans/Constants';

const Conversion = () => {

    const [inputValue, setInputValue] = useState(null);

    const [inputValue2, setInputValue2] = useState(null);

    const [selectedCurrency, setSelectedCurrency] = useState({
        select1: 'usd',
        select2: 'uah',
    });

    const [exchangeRate, setExchangeRate] = useState({
        usd: '',
        eur: '',
    });
    const [results, setResults] = useState({
        result1: 0,
        result2: 0,
    })

    useEffect(() => {
        if (exchangeRate.usd === '') {
            fetchExchangeRate()
        }

        const setResult = () => {
            setResults((prevResults) => ({
                ...prevResults,
                result1: selectedCurrency.select1 === 'usd' && selectedCurrency.select2 === 'uah' ? +exchangeRate.usd * +inputValue :
                    selectedCurrency.select1 === 'eur' && selectedCurrency.select2 === 'uah' ? +exchangeRate.eur * +inputValue :
                        selectedCurrency.select1 === 'uah' && selectedCurrency.select2 === 'usd' ? +inputValue / +exchangeRate.usd :
                            selectedCurrency.select1 === 'uah' && selectedCurrency.select2 === 'eur' ? +inputValue / +exchangeRate.eur :
                                selectedCurrency.select1 === 'usd' && selectedCurrency.select2 === 'eur' ? +inputValue * +exchangeRate.usd / +exchangeRate.eur :
                                    selectedCurrency.select1 === 'eur' && selectedCurrency.select2 === 'usd' ? +inputValue * +exchangeRate.eur / +exchangeRate.usd : 0
            }))
        }

        const setResult2 = () => {
            setResults((prevResults) => ({
                ...prevResults,
                result2: selectedCurrency.select2 === 'usd' && selectedCurrency.select1 === 'uah' ? +exchangeRate.usd * +inputValue2 :
                    selectedCurrency.select2 === 'eur' && selectedCurrency.select1 === 'uah' ? +exchangeRate.eur * +inputValue2 :
                        selectedCurrency.select2 === 'uah' && selectedCurrency.select1 === 'usd' ? +inputValue2 / +exchangeRate.usd :
                            selectedCurrency.select2 === 'uah' && selectedCurrency.select1 === 'eur' ? +inputValue2 / +exchangeRate.eur :
                                selectedCurrency.select2 === 'usd' && selectedCurrency.select1 === 'eur' ? +inputValue2 * +exchangeRate.usd / +exchangeRate.eur :
                                    selectedCurrency.select2 === 'eur' && selectedCurrency.select1 === 'usd' ? +inputValue2 * +exchangeRate.eur / +exchangeRate.usd : 0
            }))
        }


        setResult();
        setResult2();
    }, [inputValue, inputValue2, exchangeRate, selectedCurrency]);

    const fetchExchangeRate = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            setExchangeRate({
                ...exchangeRate,
                usd: data[24].rate,
                eur: data[31].rate,
            });
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
        }
    };

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