const DeleteModal = ({
	deleteModalRef,
	setIsDeleteModalOpen,
	setDeletePasswordGuess,
	deleteStatus,
	setDeleteStatus,
	submitPassword,
}) => {
	return (
		<div className="upload-modal">
			{!deleteStatus ? (
				<div className="upload-modal-inner" ref={deleteModalRef}>
					<h3 style={{ marginLeft: 0 }}>To delete, please enter password:</h3>
					<div
						className="input-container"
						style={{ margin: '1rem auto 0.5rem' }}
					>
						<input
							type="text"
							size={28}
							maxLength={32}
							onChange={(e) => {
								setDeletePasswordGuess(e.target.value);
							}}
							autoFocus
						></input>
					</div>
					<div className="button-container">
						<button
							className="cancelBtn"
							onClick={() => setIsDeleteModalOpen(false)}
						>
							Cancel
						</button>
						<button className="nav-upload" onClick={submitPassword}>
							Submit
						</button>
					</div>
				</div>
			) : deleteStatus === 'incorrect' ? (
				<div className="upload-modal-inner" ref={deleteModalRef}>
					<h3>Incorrect password. Try again?</h3>
					<div
						className="input-container"
						style={{ margin: '1rem auto 0.5rem' }}
					>
						<input
							type="text"
							size={28}
							maxLength={32}
							onChange={(e) => {
								setDeletePasswordGuess(e.target.value);
							}}
							autoFocus
						></input>
					</div>
					<div className="button-container">
						<button
							className="cancelBtn"
							onClick={() => {
								setIsDeleteModalOpen(false);
								setDeleteStatus(null);
							}}
						>
							Cancel
						</button>
						<button className="nav-upload" onClick={submitPassword}>
							Submit
						</button>
					</div>
				</div>
			) : deleteStatus === 'success' ? (
				<div
					className="upload-modal-inner modal--success"
					ref={deleteModalRef}
					style={{ height: '14rem', paddingBottom: 0 }}
				>
					<div className="status-logo-container">
						<span className="material-icons">done</span>
					</div>
					<h3 style={{ marginLeft: 0 }}>Successfully deleted</h3>
					<button
						className="cancelBtn"
						onClick={() => {
							setIsDeleteModalOpen(false);
							setDeleteStatus(null);
						}}
						style={{marginTop: "1rem"}}
					>
						Close
					</button>
				</div>
			) : (
				<div className="upload-modal-inner modal--error" ref={deleteModalRef}>
					<h3>An error has occurred</h3>
					<button
						className="cancelBtn"
						onClick={() => {
							setIsDeleteModalOpen(false);
							setDeleteStatus(null);
						}}
					>
						Close
					</button>
				</div>
			)}
		</div>
	);
};

export default DeleteModal;
