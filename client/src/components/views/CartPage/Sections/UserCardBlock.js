import React from 'react'
import { Button, Table } from 'antd';
import "./UserCardBlock.css"

function UserCardBlock(props) {

    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key ={index}>
                <td>
                    <img style={{ width: 100 }} alt='product' src={`http://localhost:5000/${product.images[0]}`} />
                </td>
                <td>
                    {product.quantity}EA
                </td>
                <td>
                    ${product.price}
                </td>
                <td>
                    <Button onClick={()=>props.removeItem(product._id)}>delete</Button>
                </td>
            </tr>
        ))
    )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
