import React, {useState, useEffect} from 'react'

export default function Rate(props) {    
    let [value, setValue] = useState(props.value)
    let stars = []
    
    function setRate(index) {        
        if(props.hasOwnProperty('onChange')) {
            props.onChange(index)
            setValue(index)
            setupRate(index)
        }        
    }

    function setupRate() {
        for(let i = 0; i < 5; i++) {                        
            stars.push(
                <i key={i} className="material-icons pointer text-warning" onClick={() => setRate(i+1)}>
                    {`${i<value ? 'star' : 'star_border'}`}
                </i>
            )
        }
    }
    setupRate()

    return (
        <div className="text-primary">
            {stars}
        </div>
    )
}