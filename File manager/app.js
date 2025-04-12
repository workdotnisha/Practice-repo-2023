document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const previewPanel = document.getElementById('preview-panel');
    const fileThumbnail = document.getElementById('file-thumbnail');
    const fileName = document.getElementById('file-name');
    const fileSize = document.getElementById('file-size');
  
    const previewBtn = document.getElementById('preview-btn');
    const editBtn = document.getElementById('edit-btn');
    const deleteBtn = document.getElementById('delete-btn');
  
    let selectedFile = null;  // Variable to store the current file
  
    // Handle drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('drag-over');
    });
  
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('drag-over');
    });
  
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
      handleFiles(e.dataTransfer.files);
    });
  
    // Handle file input selection
    document.getElementById('file-select-btn').addEventListener('click', () => {
      fileInput.click();
    });
  
    fileInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });
  
    function handleFiles(files) {
      selectedFile = files[0];  // Store the selected file globally
      previewFile(selectedFile);
    }
  
    function previewFile(file) {
      const reader = new FileReader();
      reader.onload = () => {
        fileThumbnail.src = reader.result;
        fileThumbnail.hidden = false;
        fileName.textContent = `File Name: ${file.name}`;
        fileSize.textContent = `File Size: ${(file.size / 1024).toFixed(2)} KB`;
  
        // Enable buttons
        previewBtn.disabled = false;
        editBtn.disabled = false;
        deleteBtn.disabled = false;
      };
      reader.readAsDataURL(file);
    }
  
    // Preview button functionality
    previewBtn.addEventListener('click', () => {
      if (selectedFile) {
        // Open a modal or show a larger preview
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
          <div class="modal-content">
            <span class="close">&times;</span>
            <img src="${fileThumbnail.src}" alt="Preview" style="max-width: 100%;">
          </div>
        `;
        document.body.appendChild(modal);
  
        // Close the modal
        const closeModal = modal.querySelector('.close');
        closeModal.addEventListener('click', () => {
          document.body.removeChild(modal);
        });
      }
    });
  
    // Edit button functionality
    editBtn.addEventListener('click', () => {
      if (selectedFile) {
        // Example: Apply a simple image filter (grayscale) for demo purposes
        fileThumbnail.style.filter = 'grayscale(100%)';
  
        // Ideally, call an API to perform actual image manipulation
        // e.g., send the image to a backend API to edit
      }
    });
  
    // Delete button functionality
    deleteBtn.addEventListener('click', () => {
      if (selectedFile) {
        // Clear the preview panel
        fileThumbnail.src = '';
        fileThumbnail.hidden = true;
        fileName.textContent = '';
        fileSize.textContent = '';
  
        // Disable buttons after deletion
        previewBtn.disabled = true;
        editBtn.disabled = true;
        deleteBtn.disabled = true;
  
        selectedFile = null;
  
      }
    });
  });
  