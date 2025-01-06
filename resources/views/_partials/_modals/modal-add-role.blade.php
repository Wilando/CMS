<!-- Add Role Modal -->
<div class="modal fade" id="addRoleModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-simple modal-dialog-centered modal-add-new-role">
    <div class="modal-content">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      <div class="modal-body p-0">
        <div class="text-center mb-6">
          <h4 class="role-title mb-2 pb-0">Add New Role</h4>
          <p>Set role permissions</p>
        </div>
        <!-- Add role form -->
        <form id="addRoleForm" class="row g-3" onsubmit="return false">
          <div class="col-12 mb-3">
            <div class="form-floating form-floating-outline">
              <input type="text" id="namaRole" name="namaRole" class="form-control" placeholder="Enter a role name" tabindex="-1" />
              <label for="namaRole">Role Name</label>
              <div id="invalid-namaRole" class="invalid-feedback"></div>
            </div>
          </div>
          <div class="col-12">
            <h5 class="mb-6">Role Permissions</h5>
            <!-- Permission table -->
            <div class="table-responsive">
              <table class="table table-flush-spacing">
                <tbody id="listInputPermission">
                  <tr>
                    <td class="text-nowrap fw-medium">Administrator Access <i class="ri-information-line" data-bs-toggle="tooltip" data-bs-placement="top" title="Allows a full access to the system"></i></td>
                    <td>
                      <div class="d-flex justify-content-end">
                        <div class="form-check mb-0 mt-1">
                          <input class="form-check-input" type="checkbox" id="superAdmin" />
                          <label class="form-check-label" for="superAdmin">
                            Select All
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
            <!-- Permission table -->
          </div>
          <div class="col-12 d-flex flex-wrap justify-content-center gap-4 row-gap-4">
            <button type="submit" id="addRole" class="btn btn-primary">Submit</button>
            <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
          </div>
        </form>
        <!--/ Add role form -->
      </div>
    </div>
  </div>
</div>
<!--/ Add Role Modal -->
