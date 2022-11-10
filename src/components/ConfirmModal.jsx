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
					className="upload-modal-inner confirm-modal modal--success"
					ref={confirmModalRef}
				>
					<h3>Your image has been added!</h3>
					<p>Password to delete: <span>{deletePassword}</span></p>
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
				<div className="upload-modal-inner confirm-modal modal--error" ref={confirmModalRef}>
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
