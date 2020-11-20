import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Row, Col, Button, Collapse, Input } from 'antd'
import ImageSlider from '../../utils/ImageSlider'
import CheckBox from './Sections/Checkbox'
import { continentList } from './Sections/Datas'
import SearchFeature from './Sections/SearchFeature'

function LandingPage() {
    const { Meta } = Card;

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [Posted, setPosted] = useState(8)
    const [Filter, setFilter] = useState({
        "continents": [],
        "price": []
    })
    const [SearchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        let page = {
            skip: Skip,
            limit: Limit
        }

        getProducts(page);
    }, [])

    const getProducts = (page) => {
        axios.post('/api/product/products', page)
            .then(response => {
                if (response.data.success) {
                    if (page.loadMore) {
                        setProducts([...Products, ...response.data.productinfo])
                    } else {
                        setProducts(response.data.productinfo)
                    }
                    setPosted(response.data.productinfo.length)
                } else {
                    alert('get product infos failed')
                }
            })
    }

    const moreHandler = () => {
        let newSkip = Limit + Skip;

        let page = {
            skip: newSkip,
            limit: Limit,
            loadMore: true
        }
        getProducts(page);
        setSkip(newSkip)
    }

    const showCard = Products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card cover={<a href = {`/product/${product._id}`}><ImageSlider images={product.images} /></a>}>
                    <Meta
                        title={product.name}
                        description={product.description} />
                </Card>
            </Col>
        )
    })

    const getNewResult = (newfilter) => {
        console.log(newfilter)
        let page = {
            skip: 0,
            limit: Limit,
            filter: newfilter
        }
        getProducts(page)
        setSkip(0)
    }

    const handleFilters = (filters, category) => {

        let newFilter = { ...Filter };
        newFilter[category] = filters;
        getNewResult(newFilter);
    }

    const updateSearchTerm = (value)=>{
 
        let page = {
            skip: 0,
            limit: Limit,
            filter: Filter,
            searchTerm: SearchTerm
        }

        getProducts(page)
        setSkip(0)
        setSearchTerm(value)
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            {/* Title */}
            <div style={{ textAlign: 'center' }}>
                <h1>Here's our finest products!</h1>
                <br />
            </div>
            {/* filter */}
            <CheckBox list={continentList} handleFilters={filters => handleFilters(filters, "continents")} />
            <br />
            {/* search */}
            <SearchFeature passSearch ={(value)=>updateSearchTerm(value)}/>
            <br />
            {/* products */}
            <Row gutter={[16, 16]}>
                {showCard}
            </Row>
            <br />
            {/* More */}
            {Posted >= Limit && <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={moreHandler}>More</Button>
            </div>}
        </div>
    )
}

export default LandingPage
