const DeleteModal = ({
	deleteModalRef,
	setIsDeleteModalOpen,
	setDeletePasswordGuess,
	deleteStatus,
  setDeleteStatus,
  submitPassword
}) => {
	return (
		<div className="upload-modal">
			{!deleteStatus ? (
				<div className="upload-modal-inner" ref={deleteModalRef}>
					<h3>To delete, please enter password:</h3>
					<div className="input-container" style={{ margin: '1rem auto 0.5rem' }}>
						<input
							type="text"
							size={28}
							maxLength={32}
							onChange={(e) => {
								setDeletePasswordGuess(e.target.value);
							}}
						></input>
					</div>
					<div className="button-container">
						<button
							className="cancelBtn"
							onClick={() => setIsDeleteModalOpen(false)}
						>
							Cancel
						</button>
						<button className="nav-upload" onClick={submitPassword}>Submit</button>
					</div>
				</div>
			) : deleteStatus === 'incorrect' ? (
				<div className="upload-modal-inner" ref={deleteModalRef}>
					<h3>Incorrect password. Try again?</h3>
					<div className="input-container" style={{ margin: '1rem auto 0.5rem' }}>
						<input
							type="text"
							size={28}
							maxLength={32}
							onChange={(e) => {
								setDeletePasswordGuess(e.target.value);
							}}
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
						<button className="nav-upload" onClick={submitPassword}>Submit</button>
					</div>
				</div>
			) : deleteStatus === 'success' ? (
				<div className="upload-modal-inner" ref={deleteModalRef}>
					<h3>Successfully deleted</h3>
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
			) : (
        <div className="upload-modal-inner" ref={deleteModalRef}>
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
