const Card = ({ url, tag }) => {
  return (
    <div className="card-container">
      <div className="card-overlay"></div>
      <img className="card-img" src={url}></img>
      <div className="card-details">
        <h3>{tag}</h3>
      </div>
    </div>
  )
}

export default Card