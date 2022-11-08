const ConfirmModal = ({
	confirmModalRef,
	setIsConfirmModalOpen,
	confirmStatus,
	setConfirmStatus,
	deletePassword,
}) => {
	return (
		<div className="upload-modal">
			{confirmStatus === 'success' ? (
				<div
					className="upload-modal-inner modal--success"
					ref={confirmModalRef}
				>
					<h3>Your image has been added!</h3>
					<h3>Password to delete: {deletePassword}</h3>
					<div className="button-container">
						<button
							className="cancelBtn"
							onClick={() => {
								setIsConfirmModalOpen(false);
								setConfirmStatus(null);
							}}
						>
							Close
						</button>
					</div>
				</div>
			) : (
				<div className="upload-modal-inner modal--error" ref={confirmModalRef}>
					<h3>Something went wrong, please try again later</h3>
					<div className="button-container">
						<button
							className="cancelBtn"
							onClick={() => {
								setIsConfirmModalOpen(false);
								setConfirmStatus(null);
							}}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ConfirmModal;
