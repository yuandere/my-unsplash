const Card = ({ url, tag, id, setIsDeleteModalOpen, setToDeleteId }) => {
	return (
		<div
			className="card-container"
			onTouchStart={(e) => {
				e.target.parentElement.classList.add('touched');
				setTimeout(() => {
					e.target.parentElement.classList.remove('touched');
				}, 3000);
			}}
		>
			<div className="card-overlay"></div>
			<img className="card-img" src={url}></img>
			<div className="card-details">
				<h3>{tag}</h3>
			</div>
			<div className="card-delete">
				<span
					className="material-icons"
					onClick={(e) => {
						setToDeleteId(id);
						setIsDeleteModalOpen(true);
					}}
				>
					delete
				</span>
			</div>
		</div>
	);
};

export default Card;
