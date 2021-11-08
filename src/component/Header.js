import {React} from 'react';
import header from './header.css'

function Header(){
    return(
        <header className='header'>
            <strong>Header</strong>
            <ul>
                <li>
                    <button>홈</button>
                </li>
                <li>
                    <a>프로필</a>
                </li>
            </ul>
        </header>
    );
}

export default Header;