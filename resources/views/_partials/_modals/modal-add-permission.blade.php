<!-- Add Permission Modal -->
<div class="modal fade" id="addPermissionModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-simple">
    <div class="modal-content p-4 p-md-12">
      <button type="button" class="btn-close btn-pinned" data-bs-dismiss="modal" aria-label="Close"></button>
      <div class="modal-body p-md-0">
        <div class="text-center mb-6">
          <h3 class="mb-2 pb-1">Add New Permission</h3>
          <p>Permissions you may use and assign to your users.</p>
        </div>
        <form id="addPermissionForm" class="row" onsubmit="return false">
          <div class="col-12 mb-4">
            <div class="form-floating form-floating-outline">
              <input type="text" id="namaPermission" name="namaPermission" class="form-control" placeholder="isi nama permission" autofocus />
              <label for="namaPermission">Nama Permission</label>
              <div id="invalid-namaPermission" class="invalid-feedback"></div>
            </div>
          </div>
          <div class="col-12 mb-2">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="corePermission" />
              <label class="form-check-label" for="corePermission">
                Set as core permission
              </label>
            </div>
          </div>
          <div class="col-12 text-center demo-vertical-spacing">
            <button id="addPermission" type="button" class="btn btn-primary me-sm-4 me-1">Create Permission</button>
            <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Close">Discard</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<!--/ Add Permission Modal -->
