import React from 'react'
import {Navbar} from 'reactstrap'

const Header: React.FC = () => {
    return(
        <div>
            <Navbar className="font-weight-bolder" style={{color: "white"}}>
                PROJECT-IZ
            </Navbar>
        </div>
    )
}

export default Header