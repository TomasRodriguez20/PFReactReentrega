import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../index';
import ProductList from './ProductsList';

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, 'ItemCollection');

        let q;
        if (categoryId) {
          q = query(productsRef, where('category', '==', categoryId));
        } else {
          q = productsRef;
        }

        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(items);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <p>Cargando...</p>;
  if (!loading && products.length === 0)
    return <p>No hay productos disponibles en esta categoría.</p>;

  return (
    <div>
      <h2>{categoryId ? `Categoría: ${categoryId}` : 'Todos los productos'}</h2>
      <ProductList products={products} />{' '}
      {/* Pasamos los productos como props */}
    </div>
  );
};

export default ItemListContainer;
