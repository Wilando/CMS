@extends('layouts/layoutMaster')

@section('title', 'User List')

@section('vendor-style')
@vite([
  'resources/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.scss',
  'resources/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.scss',
  'resources/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.scss',
  'resources/assets/vendor/libs/datatables-checkboxes-jquery/datatables.checkboxes.scss',
  'resources/assets/vendor/libs/select2/select2.scss',
  'resources/assets/vendor/libs/sweetalert2/sweetalert2.scss',
])
@endsection

@section('vendor-script')
@vite([
  'resources/assets/vendor/libs/moment/moment.js',
  'resources/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js',
  'resources/assets/vendor/libs/select2/select2.js',
  'resources/assets/vendor/libs/sweetalert2/sweetalert2.js',
])
@endsection

@section('page-script')
  @vite([
    'resources/js/app.js',
    'resources/js/pages/user-management/user-list.js',
    'resources/js/helpers/formValidation.js',
  ])
@endsection

@section('content')

<!-- Users List Table -->
<div class="card">
  <div class="card-header border-bottom">
    <h5 class="card-title mb-0">Filters</h5>
    <div class="d-flex justify-content-between align-items-center row gx-5 pt-4 gap-5 gap-md-0">
      <div class="col-md-4 user_role"></div>
      <div class="col-md-4 user_plan"></div>
      <div class="col-md-4 user_status"></div>
    </div>
  </div>
  <div class="card-datatable table-responsive">
    <table class="datatables-users table">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>User</th>
          <th>Username</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
    </table>
  </div>
  <!-- Offcanvas to add new user -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
    <div class="offcanvas-header border-bottom">
      <h5 id="offcanvasAddUserLabel" class="offcanvas-title">Add User</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body mx-0 flex-grow-0 h-100">
      <form class="add-new-user pt-0" id="addNewUserForm" onsubmit="return false">
        <div class="form-floating form-floating-outline mb-5">
          <input type="text" class="form-control" id="nama" placeholder="Nama" name="nama" aria-label="Nama" />
          <label for="nama">Nama</label>
          <div id="invalid-nama" class="invalid-feedback"></div>
        </div>
        <div class="form-floating form-floating-outline mb-5">
          <input type="text" id="username" class="form-control" aria-label="Username" placeholder="Username" name="username" />
          <label for="username">Username</label>
          <div id="invalid-username" class="invalid-feedback"></div>
        </div>
        <div class="form-floating form-floating-outline mb-5">
          <input type="text" id="email" class="form-control" aria-label="Email" placeholder="Email" name="email" />
          <label for="email">Email</label>
          <div id="invalid-email" class="invalid-feedback"></div>
        </div>
        <div class="form-password-toggle mb-5">
          <div class="input-group input-group-merge">
            <div class="form-floating form-floating-outline">
              <input type="password" name="passaword" class="form-control" id="password" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" aria-describedby="password" />
              <label for="password">Password</label>
              <div id="invalid-password" class="invalid-feedback"></div>
            </div>
            <span class="input-group-text cursor-pointer"><i class="ri-eye-off-line"></i></span>
          </div>
          
        </div>
        <div class="form-floating form-floating-outline mb-5">
          <select id="role" class="form-select" name="role">
            <option></option>
          </select>
          <label for="role">Role</label>
          <div id="invalid-role" class="invalid-feedback"></div>
        </div>
        <button type="submit" id="submitUser" class="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>
        <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="offcanvas">Cancel</button>
      </form>
    </div>
  </div>
</div>
@endsection
