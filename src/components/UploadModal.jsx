const UploadModal = ({
	setIsUploadModalOpen,
	uploadModalRef,
	setImageLabel,
	setImageURL,
  submitPhoto,
	fileToUpload
}) => {
	return (
		<div className="upload-modal">
			<div className="upload-modal-inner" ref={uploadModalRef}>
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
							size={28}
							onChange={(e) => setImageURL(e.target.value)}
							placeholder="images.google.com"
						></input>
					</div>
					<p>OR</p>
					<button
						id="uploadBtn"
						className="nav-upload"
					>
						Upload file
					</button>
					{fileToUpload ? <p>{fileToUpload.name}</p> : null}
				</div>

				<div className="button-container">
					<button className="cancelBtn" onClick={() => setIsUploadModalOpen(false)}>
						Cancel
					</button>

					<button className="nav-upload" onClick={submitPhoto}>Submit</button>
				</div>
			</div>
		</div>
	);
};

export default UploadModal;
