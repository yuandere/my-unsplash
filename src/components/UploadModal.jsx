import isValidated from '../url-validate';

const UploadModal = ({
	setIsUploadModalOpen,
	uploadModalRef,
	setImageLabel,
	setImageURL,
	imageURL,
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
					full.substring(full.lastIndexOf('.'), full.length))
			: (filename = full);
	}

	const isValidUrl = () => {
		if (imageURL === '') {
			return true;
		}
		return isValidated(imageURL);
	};

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
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<p style={!isValidUrl() ? { color: 'red' } : null}>Photo URL</p>
							{!isValidUrl() ? (
								<p style={{ color: 'red' }}>Please enter a valid image URL!</p>
							) : null}
						</div>
						<input
							type="text"
							size={22}
							id="input-element"
							onChange={(e) => setImageURL(e.target.value)}
							placeholder="https://example.com/coolpic"
							style={!isValidUrl() ? { border: '1px solid red' } : null}
						></input>
					</div>
					<p style={{ alignSelf: 'center', margin: '0.5rem' }}>or</p>
					<button
						id="uploadBtn"
						className="nav-upload"
						style={{
							width: '7rem',
							alignSelf: 'center',
							background: 'white',
							color: 'black',
						}}
					>
						Upload file
					</button>
					{fileToUpload ? (
						<p style={{ marginBottom: 0, alignSelf: 'center' }}>{filename}</p>
					) : null}
				</div>

				<div className="button-container">
					<button
						className="cancelBtn"
						onClick={() => setIsUploadModalOpen(false)}
					>
						Cancel
					</button>

					<button
						className="nav-upload"
						onClick={() => {
							if (!isValidated(imageURL)) {
								return;
							}
							submitPhoto();
						}}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default UploadModal;
