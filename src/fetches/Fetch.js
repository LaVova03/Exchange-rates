import { useState, useEffect } from 'react';

const Fetch = (url) => {
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [exchangeRate, setExchangeRate] = useState({
        usd: '',
        eur: '',
        uah: 1,
        date: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                const rates = data.reduce((accumulator, currency) => {
                    if (currency.cc === 'USD') {
                        accumulator.usd = currency.rate.toFixed(2);
                        accumulator.date = currency.exchangedate;
                    } else if (currency.cc === 'EUR') {
                        accumulator.eur = currency.rate.toFixed(2);
                    }
                    return accumulator;
                }, {});

                setExchangeRate({
                    ...exchangeRate,
                    ...rates,
                });
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { exchangeRate, loading, error };
};

export default Fetch;
