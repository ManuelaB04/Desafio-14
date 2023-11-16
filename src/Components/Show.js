import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDoc, getDocs, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../FirebaseConfig/Firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {
    //CONFIGURACIÓN DE HOOKS
    const [products, setProducts] = useState ( [] )

 

    //REFERENCIAR DATA BASE DE FIRESTORE
    const productsCollection = collection(db, "products")

    //FUNCIÓN PARA MOSTRAR TODOS LOS DOCUMENTOS
    const getProducts = async () => {
       const data = await getDocs(productsCollection)
       setProducts(
            data.docs.map( (doc) => ( {...doc.data(), id:doc.id}))
        )
    }

    //FUNCIÓN PARA ELIMINAR UN DOCUMENTO
    const deleteProduct = async (id) => {
        const productDoc = doc (db, "products", id)
        await deleteDoc(productDoc)
        getProducts()
    }

    //FUNCIÓN DE CONFIRMACIÓN PARA SWEET ALERT 2
    const confirmDelete = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
                //LLAMAMOS A LA FUNCIÓN PARA ELIMINAR
                if (result.isConfirmed) {
                    deleteProduct(id)
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
    }

    //UTILIZACIÓN DE USEEFFECT
    useEffect(()=>{
        getProducts()
    }, [])

    //RETORNAR NUESTROS COMPONENTES
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="d-grid gap-2">
                            <Link to="/create" className="btn btn-secondary mt-2 mb-2">Create</Link>
                        </div>

                        <table className="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Note</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-red-300'> 
                                { products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.description}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                                            <button onClick={() => {confirmDelete(product.id)}} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show