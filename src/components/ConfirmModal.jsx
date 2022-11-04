const ConfirmModal = ({ confirmModalRef, confirmStatus, deletePassword }) => {
	return (
		<>
			{confirmStatus === 'success' ? (
				<div className="upload-modal modal--success" ref={confirmModalRef}>
					<h3>Your image has been added!</h3>
					<h3>Password to delete: {deletePassword}</h3>
				</div>
			) : (
				<div className="upload-modal modal--error" ref={confirmModalRef}>
          Something went wrong, please try again later
        </div>
			)}
		</>
	);
};

export default ConfirmModal;
