import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../FirebaseConfig/Firebase'


function Create() {
    //CONFIGURAR LOS HOOKS
    const [description, setDescription] = useState ('')
    const [stock, setStock] = useState(0)
    const navigate = useNavigate()

    const productsCollection = collection(db, 'products')
    const store = async (e) => {
        e.preventDefault()
        await addDoc(productsCollection, {description: description, stock: stock})
        navigate('/')
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col">
                <h1>Create product</h1>
                <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type='text'
                            className='form-control'
                        />
                    </div> 

                    <div className='mb-3'>
                        <label className='form-label'>Note</label>
                        <input
                            value={stock}
                            onChange={(e)=>setStock(e.target.value)}
                            type='text'
                            className='form-control'
                        />
                    </div> 

                    <button type='submit' className='btn btn-primary'>Create</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Create
