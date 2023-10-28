import React, { useEffect, useState } from 'react';
import { getBrandsData } from '../firebase/getBrands';

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBrandsData(setBrands, setLoading);
    }, []);

    if (loading) {
        return <h1>Loading Firebase data...</h1>
    }

    return (
        <div className='container'>
            {brands.length > 0 ? (
                brands.map((brand) => (
                    <div key={brand._id}>
                        <h2>{brand.name}</h2>
                        <p>Created At: {brand.createdAt}</p>
                        <img src={brand.image} alt={brand.name} />
                        <p>Slug: {brand.slug}</p>
                        <p>Updated At: {brand.updatedAt}</p>
                    </div>
                ))
            ) : (
                <h1>No brands :(</h1>
            )}
        </div>
    );
};

export default Brands;