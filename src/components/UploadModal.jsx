const UploadModal = ({
	setIsUploadModalOpen,
	uploadModalRef,
	setImageLabel,
	setImageURL,
	submitPhoto,
	fileToUpload,
}) => {
	let filename = '';
	if (fileToUpload) {
		const full = fileToUpload.name;
		full.length > 24
			? (filename =
					full.substring(0, 12) +
					'(. . .)' +
					full.substring(full.length - 3, full.length))
			: (filename = full);
	}

	return (
		<div className="upload-modal">
			<div className="upload-modal-inner" ref={uploadModalRef}>
				<h3>Add a new photo</h3>
				<div className="input-container">
					<p>Label</p>
					<input
						type="text"
						maxLength={32}
						size={22}
						onChange={(e) => setImageLabel(e.target.value)}
						placeholder="Suspendisse elit massa"
					></input>
				</div>
				<div className="upload-options">
					<div className="input-container">
						<p>Photo URL</p>
						<input
							type="text"
							size={22}
							onChange={(e) => setImageURL(e.target.value)}
							placeholder="images.google.com/coolpic"
						></input>
					</div>
					<p style={{ 'align-self': 'center', margin: '0.5rem' }}>or</p>
					<button
						id="uploadBtn"
						className="nav-upload"
						style={{ width: '7rem', 'align-self': 'center', background: "white", color: "black" }}
					>
						Upload file
					</button>
					{fileToUpload ? <p style={{ marginBottom: 0, alignSelf: 'center'}}>{filename}</p> : null}
				</div>

				<div className="button-container">
					<button
						className="cancelBtn"
						onClick={() => setIsUploadModalOpen(false)}
					>
						Cancel
					</button>

					<button className="nav-upload" onClick={submitPhoto}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default UploadModal;
