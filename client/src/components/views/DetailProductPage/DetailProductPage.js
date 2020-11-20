import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ImageShow from './Section/ImageShow'
import ImageInfo from './Section/ImageInfo'
import { Row, Col } from 'antd'

function DetailProductPage(props) {

    const [Product, setProduct] = useState({})

    let productId = props.match.params.productId
    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                    setProduct(response.data[0])
            }).catch(err=>alert(err))
    }, [])

    return (
        <div style={{width: '100%', padding: '3rem 4rem'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h1>{Product.name}</h1>
            </div>
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <ImageShow detail ={Product}/>
                </Col>
                <Col lg={12} xs={24}>
                    <ImageInfo detail ={Product}/>
                </Col>

            </Row>
        </div>
    )
}

export default DetailProductPage
