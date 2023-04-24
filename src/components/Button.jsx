import './Button.css';

const Button = ({icon, handleClick})=>{
    return(
        <div className='btn_box'>
            <button className="btn_button" 
            onClick={handleClick}>{icon}</button>
        </div>
        
    )
}

export {Button}