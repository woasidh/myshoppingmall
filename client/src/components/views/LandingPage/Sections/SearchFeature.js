import React from 'react'
import { Input } from 'antd'

function SearchFeature(props) {

    const { Search } = Input;

    const searchHandler = (e)=>{
        props.passSearch(e)
    }
    return (
        <div style={{display: 'flex', justifyContent:'flex-end'}}>
            <Search
                placeholder="search"
                allowClear
                onSearch={searchHandler}
                style={{ width: 200, margin: '0 10px' }}
            />
        </div>
    )
}

export default SearchFeature
