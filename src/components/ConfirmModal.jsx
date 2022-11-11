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
					<div className="status-logo-container">
						<span className="material-icons">
							done
						</span>
					</div>
					<h3 style={{margin: "1.25rem auto 0.5rem", alignSelf: "center"}}>Your image has been added!</h3>
					<p style={{margin: "0.5rem 0 0",alignSelf: "center"}}>Password to delete: <span>{deletePassword}</span></p>
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
