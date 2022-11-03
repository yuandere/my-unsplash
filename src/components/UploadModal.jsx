const UploadModal = ({
	setIsModalOpen,
	modalRef,
	setImageLabel,
	setImageURL,
  submitPhoto,
}) => {
	return (
		<div className="upload-modal">
			<div className="upload-modal-inner" ref={modalRef}>
				<h3>Add a new photo</h3>
				<div className="input-container">
					<p>Label</p>
					<input
						type="text"
						maxLength={32}
						size={28}
						onChange={(e) => setImageLabel(e.target.value)}
						placeholder="Suspendisse elit massa"
					></input>
				</div>
				<div className="upload-options">
					<div className="input-container">
						<p>Photo URL</p>
						<input
							type="text"
							maxLength={200}
							size={28}
							onChange={(e) => setImageURL(e.target.value)}
							placeholder="images.google.com"
						></input>
					</div>
					<p>OR</p>
					<button
						id="uploadBtn"
						className="nav-upload"
						onClick={() => setIsModalOpen(true)}
					>
						Upload file
					</button>
				</div>

				<div className="button-container">
					<button className="cancelBtn" onClick={() => setIsModalOpen(false)}>
						Cancel
					</button>

					<button className="nav-upload" onClick={submitPhoto}>Submit</button>
				</div>
			</div>
		</div>
	);
};

export default UploadModal;
