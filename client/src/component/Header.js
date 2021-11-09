import {React} from 'react';
import header from './header.css'

function Header(){
    return(
        <header className='header'>
            <div className='top'></div>
            <div className='bottom'>
                <span className='bottomText'>메모장</span>
            </div>            
        </header>
    );
}

export default Header;