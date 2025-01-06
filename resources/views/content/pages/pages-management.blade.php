@extends('layouts/layoutMaster')

@section('title', 'Pages Management')

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
    'resources/js/pages/pages-management.js',
    'resources/js/helpers/formValidation.js',
  ])
@endsection

@section('content')
<div class="row g-6">
  <div class="col-12">
    <h4 class="mt-6 mb-1">Management Page</h4>
  </div>
  <div class="col-12">
    <!-- Permission Table -->
    <div class="card">
      <div class="card-datatable table-responsive">
        <table class="datatables table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Nama Page</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <!--/ Permission Table -->
  </div>
</div>

@include('_partials/_modals/modal-form-page')

@endsection
