<div class="modal fade" id="modalFormPage" data-bs-backdrop="static" tabindex="-1">
    <div class="modal-dialog">
        <form class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalFormPageTitle">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="form-floating form-floating-outline mb-6">
                    <input type="text" class="form-control" id="namaPage" placeholder="Nama Page" />
                    <label for="namaPage">Nama Page</label>
                    <div id="invalid-namaPage" class="invalid-feedback"></div>
                </div>
                <div class="form-floating form-floating-outline">
                    <select id="status" class="select2 form-select form-select-lg" data-allow-clear="true">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                    </select>
                    <label for="status">Status</label>
                    <div id="invalid-status" class="invalid-feedback"></div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" id="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
    </div>
</div>
