@extends('layouts/layoutMaster')

@section('title', 'Roles dan Permission')

@section('vendor-style')
@vite([
  'resources/assets/vendor/libs/animate-css/animate.scss',
  'resources/assets/vendor/libs/sweetalert2/sweetalert2.scss',
  'resources/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.scss',
  'resources/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.scss',
  'resources/assets/vendor/libs/datatables-checkboxes-jquery/datatables.checkboxes.scss',
  ])
@endsection

@section('vendor-script')
@vite([
  'resources/assets/vendor/libs/sweetalert2/sweetalert2.js',
  'resources/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js'
  ])
@endsection

@section('page-script')
@vite([
  'resources/js/app.js',
  'resources/js/helpers/formValidation.js',
  'resources/js/helpers/tanggalWaktu.js',
  'resources/assets/js/app-access-roles.js',
  'resources/js/pages/user-management/modal-add-permission.js'
  ])
@endsection

@section('content')
<h4 class="mb-1">Roles List</h4>
<p class="mb-6">A role provided access to predefined menus and features so that depending on assigned role an administrator can have access to what user needs.</p>
<!-- Role cards -->
<div class="row g-6">
  <div class="col-xl-4 col-lg-6 col-md-6">
  <button data-bs-target="#addRoleModal" data-bs-toggle="modal" class="btn btn-xl btn-primary mb-4 text-nowrap add-new-role"><i class="ri-add-line"></i> Add Role</button>
  </div>
  <div class="row g-6 mt-0" id="roleContainer">

  </div>

  <div class="col-12">
    <h4 class="mt-6 mb-1">Permission List</h4>
    <p class="mb-0">Find all of your company’s administrator accounts and their associate roles.</p>
  </div>
  <div class="col-12">
    <!-- Permission Table -->
    <div class="card">
      <div class="card-datatable table-responsive">
        <table class="datatables-permissions table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <!--/ Permission Table -->

    <!-- Modal -->
    @include('_partials/_modals/modal-add-permission')
    @include('_partials/_modals/modal-edit-permission')
    <!-- /Modal -->
  </div>
</div>
<!--/ Role cards -->

<!-- Add Role Modal -->
@include('_partials/_modals/modal-add-role')
<!-- / Add Role Modal -->
@endsection
