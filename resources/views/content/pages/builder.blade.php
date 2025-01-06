@extends('layouts/layoutMaster')

@section('title', 'Page Management')

@section('vendor-style')
@vite([
  'resources/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.scss',
  'resources/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.scss',
  'resources/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.scss',
  'resources/assets/vendor/libs/datatables-checkboxes-jquery/datatables.checkboxes.scss',
  'resources/assets/vendor/libs/select2/select2.scss',
  'resources/assets/vendor/libs/sweetalert2/sweetalert2.scss',
  'resources/assets/vendor/libs/toastr/toastr.scss',
])
@endsection

@section('vendor-script')
@vite([
  'resources/assets/vendor/libs/moment/moment.js',
  'resources/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js',
  'resources/assets/vendor/libs/select2/select2.js',
  'resources/assets/vendor/libs/sweetalert2/sweetalert2.js',
  'resources/assets/vendor/libs/toastr/toastr.js',
])
@endsection

@section('page-syle')
<link href="https://unpkg.com/grapick/dist/grapick.min.css" rel="stylesheet">
@vite([
  'resources/css/pages-management.css',
])
@endsection

@section('page-script')
  @vite([
    'resources/js/app.js',
    'resources/js/libs/grapejs.js',
    'resources/js/pages/page-builder.js'
  ])
@endsection

@section('content')
    <div id="gjs">

    </div>
@endsection
