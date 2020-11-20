import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import UserCardBlock from './Sections/UserCardBlock'
import { getCartItems, removeCartItem } from '../../../_actions/user_actions'
import { Empty } from 'antd';

function CartPage(props) {

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(props)

        let items = [];

        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach((item) => {
                    items.push(item.id)
                })

                dispatch(getCartItems(items, props.user.userData.cart))
                    .then(response => { setTotalAmount(response.payload) })
            }
        }

    }, [props.user.userData])

    const setTotalAmount = (products) => {
        let total = 0;
        console.log(products)
        products.map(product => {
            total += product.price * product.quantity
        })
        setTotal(total);
        setShowTotal(true)
    }

    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
            .then(response => {
                if (response.payload.productInfo.length <= 0) {
                    setShowTotal(false)
                }
            })
    }

    return (
        <div style={{ width: "85%", margin: '2rem auto' }}>
            <h1>My Cart</h1>
            <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart} />
            <br />
            {ShowTotal ?
                <h2>Total Amount: ${Total}</h2>
                : <Empty description={false} />}
        </div>
    )
}

export default CartPage
