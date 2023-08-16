import React, { useEffect, useState } from 'react'
import '../App.css';

const Pagination1 = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const fetchProducts = async () => {
        const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
        const data = await res.json();
        setProducts(data.products);
        setTotalPage(data.total / 10);
    }
    useEffect(() => {
        fetchProducts();
    }, [page]);

    const selectPageHandler = (selectedPage) => {
        if(selectedPage >= 1 && selectedPage <= totalPage && selectedPage !== page){
            setPage(selectedPage);
        }      
    }
  return (
    <div>
        {
              products.length > 0 && (
                <div className='products'>{products.map((prod) => {
                    return (
                    <span className='products__single' key={prod.id}>
                    <img src={prod.thumbnail} alt={prod.title}/>
                    <span>{prod.title}</span>
                    </span>
                )
            })
            } </div>
            )
        }
        {
            products.length > 0 && (
                <div className='pagination'>
                    <span className={page > 1 ? "" : "pagination_disable"} onClick={() => selectPageHandler(page - 1)}>◀</span>
                        {[...Array(totalPage)].map((_, i) => {
                        return <span className={page === i+1 ? 'selected_page' : ''} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
                    })}
                    <span className={page < totalPage ? "" : "pagination_disable"} onClick={() => selectPageHandler(page + 1)}>▶</span>
                </div>
            )
        }
    </div>
  )
}

export default Pagination1