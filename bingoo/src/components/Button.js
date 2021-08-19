import React from 'react'

const Button = (props) => {
    const {bValue} = props;
    return (
        <>
            <input type="submit" value={bValue}/>
        </>
    )
}

export default Button
