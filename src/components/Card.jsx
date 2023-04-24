import'./Card.css';

const Card = ({name, img}) => {
  return (
    <div className="card">
        <p className="card_name">{name}</p>
        <div className="card_circle"></div>
        <img src={img} alt="pokemon img" className="card_img" />
    </div>
  )
}

export {Card} 