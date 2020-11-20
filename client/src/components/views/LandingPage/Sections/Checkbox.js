import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd'
function CheckBox(props) {

    const { Panel } = Collapse;
    const [Checked, setChecked] = useState([])

    const continentList = props.continentList;

    const toggleHandler = (id) => {

        let currentIndex = Checked.indexOf(id)
        let newChecked = [...Checked]
        if (currentIndex === -1) {
            //setChecked([...Checked, id])
            newChecked.push(id)
        } else {
            //Checked.splice(currentIndex, 1)
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

    return (
        <div>
            <Collapse accordion>
                <Panel header="Location filter">
                    {props.list.map((continent, index) => (
                        <Checkbox
                            onChange={() => toggleHandler(continent._id)}
                            checked={Checked.indexOf(continent._id) === -1 ? false : true} >{continent.name}
                        </Checkbox>
                    ))}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
