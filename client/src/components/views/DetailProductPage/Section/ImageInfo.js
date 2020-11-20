import React from 'react'
import { Descriptions, Button } from 'antd';
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../../_actions/user_actions'

function ImageInfo(props) {
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(addToCart(props.detail._id))
        alert("added to cart!!")
    }
    return (
        <div>
            <Descriptions title="User Info" bordered>
                <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Description" span={3}>{props.detail.description}
                </Descriptions.Item>
            </Descriptions>
            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="danger" danger onClick={clickHandler}>Add to Cart</Button>
            </div>
        </div>
    )
}

export default ImageInfo
