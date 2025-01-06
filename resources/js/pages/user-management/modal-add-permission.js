var dt_permission;

document.addEventListener('DOMContentLoaded', async function () {
  await initLoad();
});

async function initLoad() {
  await dataTablePermission();
  await addPermission();
  await deletePermission();
  await updatePermission();
  await populatePermissionModal();
  await updateRole();
  await addRole();
  await populateTampilanListRole();
  await superadminCheck();
  await deleteRole();
}

async function dataTablePermission() {
  var dataTablePermissions = $('.datatables-permissions')
  // Users List datatable
  if (dataTablePermissions.length) {
    dt_permission = dataTablePermissions.DataTable({
      ajax: {
          url: baseUrl + 'api/user/list-permission',
          type: "GET",
          xhrFields: {
            withCredentials: true // Menyertakan cookie pada permintaan
          },
      },
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'id' },
        { data: 'name' },
        { data: 'created_at' },
        { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          orderable: false,
          searchable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          targets: 1,
          searchable: false,
          visible: false
        },
        {
          // Name
          targets: 2,
          render: function (data, type, full, meta) {
            var $name = full['name'];
            return '<span class="text-nowrap text-heading">' + $name + '</span>';
          }
        },
        {
          // remove ordering from Name
          targets: 3,
          orderable: true,
          render: function (data, type, full, meta) {
            var $date = full['created_at'];
            return '<span class="text-nowrap">' + formatTanggal($date) + '</span>';
          }
        },
        {
          // Actions
          targets: -1,
          searchable: false,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {

            const dataString = encodeURIComponent(JSON.stringify(full));
            return (
              `<div class="d-flex align-items-center">
                <button data-object='${dataString}' class="btn btn-sm btn-icon btn-text-secondary rounded-pill delete-record text-body waves-effect waves-light me-1" data-bs-toggle="tooltip" title="Delete">
                  <i class="ri-delete-bin-7-line ri-20px"></i>
                </button>
                <span class="text-nowrap"><button data-object='${dataString}' class="btn btn-sm btn-icon btn-text-secondary text-body rounded-pill waves-effect waves-light update-record" data-bs-target="#editPermissionModal" data-bs-toggle="modal" data-bs-dismiss="modal"><i class="ri-edit-box-line ri-20px"></i></button></span>
              </div>`
            );
          }
        }
      ],
      order: [[1, 'desc']],
      dom:
        '<"row mx-1"' +
        '<"col-sm-12 col-md-3 mt-5 mt-md-0" l>' +
        '<"col-sm-12 col-md-9"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end justify-content-center flex-wrap me-1"<"me-4"f>B>>' +
        '>t' +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: 'Show _MENU_',
        search: '',
        searchPlaceholder: 'Cari Permissions',
        paginate: {
          next: '<i class="ri-arrow-right-s-line"></i>',
          previous: '<i class="ri-arrow-left-s-line"></i>'
        }
      },
      // Buttons with Dropdown
      buttons: [
        {
          text: '<i class="ri-add-line me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Tambah Permission</span>',
          className: 'add-new btn btn-primary mb-5 mb-md-0 waves-effect waves-light',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#addPermissionModal',
            'id': "btnModalPermission"
          },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      },
      initComplete: function () {
        // Adding role filter once table initialized

      }
    });
  }
}

async function addPermission() {

  $("#btnModalPermission").click(async function() {
    formReset(["#namaPermission"]);
  });

  $("#addPermission").click(async function() {
      formValidationClear();
      try {
        let reqData = {
            "namaPermission": $("#namaPermission").val()
        }
        let response = await axios.post(app_url + '/api/user/add-permission', reqData);
        if (response.data.status) {
          formReset(["#namaPermission"]);
          $('#addPermissionModal').modal('hide');
          dt_permission.ajax.reload();
          await populatePermissionModal();
          Swal.fire({
            title: 'Permission Berhasil Ditambahkan!',
            text: `Permission ${$("#namaPermission").val()} Berhasil Ditambahkan`,
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary waves-effect waves-light'
            },
            buttonsStyling: false
          });
        }

      } catch (error) {
        //console.log(error);
        formValidation(error);
      }
  });
}

async function deletePermission(){
  // Delete Record
  $('.datatables-permissions tbody').on('click', '.delete-record', async function () {
    try {
      const data = JSON.parse(decodeURIComponent($(this).attr('data-object')));
      const id = data.id;
      const nama = data.name;
      Swal.fire({
        title: `Apakah Anda Yakin Ingin menghapus Permission?`,
        text: `Apakah Anda Yakin Ingin menghapus Permission ${nama}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
        customClass: {
          confirmButton: 'btn btn-primary me-3 waves-effect waves-light',
          cancelButton: 'btn btn-outline-secondary waves-effect'
        },
        buttonsStyling: false
      }).then(async function (result) {
        if (result.value) {
          let response = await axios.delete(app_url + `/api/user/delete-permission/${id}`);
          if (response.data.status) {
            Swal.fire({
              title: 'Permission Berhasil Dihapus!',
              text: `Permission ${nama} Berhasil Dihapus`,
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary waves-effect waves-light'
              },
              buttonsStyling: false
            });
            dt_permission.ajax.reload();
            await populatePermissionModal();
          }
          else if (response.data.status == false) {
            Swal.fire({
              title: 'Permission Gagal Dihapus!',
              text: `${response.data.message}`,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary waves-effect waves-light'
              },
              buttonsStyling: false
            });
          }
        }
      });

    } catch (error) {
      console.log(error);
    }
  });
}

async function updatePermission() {

  $('.datatables-permissions tbody').on('click', '.update-record',async function() {
    formReset(["#editPermissionName"]);
    const data = JSON.parse(decodeURIComponent($(this).attr('data-object')));
    const id = data.id;
    const nama = data.name;
    $("#updateButton").attr('data-id', id);
    $("#editPermissionName").val(nama);
  });

  $("#updateButton").click(async function() {
      formValidationClear();
      try {
        const id = $(this).attr('data-id');
        let reqData = {
          "editPermissionName": $("#editPermissionName").val()
        }
        let response = await axios.put(app_url + `/api/user/update-permission/${id}`, reqData);
        if (response.data.status) {
          formReset(["#editPermissionName"]);
          $('#editPermissionModal').modal('hide');
          dt_permission.ajax.reload();
          Swal.fire({
            title: 'Permission Berhasil Diubah!',
            text: `Permission ${$("#editPermissionName").val()} Berhasil Diubah`,
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary waves-effect waves-light'
            },
            buttonsStyling: false
          });
          await populatePermissionModal();
        }

      } catch (error) {
        //console.log(error);
        formValidation(error);
      }
  });
}

async function updateRole() {
  const $roleTitle = $('.role-title');

  // Event delegation untuk tombol tambah role
  $(document).on('click', '.add-new-role', function () {
    $roleTitle.text('Add New Role'); // Reset text
    formReset(["#namaRole", `#listInputPermission input[type="checkbox"]:checked`]);
    $("#addRole").attr('data-id', "");
  });

  // Event delegation untuk tombol edit role
  $(document).on('click', '.role-edit-modal', function () {
    formReset(["#namaRole", `#listInputPermission input[type="checkbox"]:checked`]);
    $roleTitle.text('Edit Role'); // Update text
    const data = JSON.parse(decodeURIComponent($(this).attr('data-object')));
    
    $("#namaRole").val(data.name);
    $("#addRole").attr('data-id', data.id);
    data.permissions.forEach(permission => {
      $(`#listInputPermission input[type="checkbox"][value="${permission.id}"]`).prop('checked', true);
    });
  });
}

async function populatePermissionModal() {
  let listPermission = await axios.get(baseUrl + 'api/user/list-permission');
  listPermission = listPermission.data.data;
  $("#listInputPermission").empty();
  listPermission.forEach(permission => {
    $("#listInputPermission").append(`
    <tr>
      <td class="text-nowrap fw-medium">${permission.name}</td>
      <td>
        <div class="d-flex justify-content-end">
          <div class="form-check mb-0 mt-1 me-4 me-lg-12">
            <input class="form-check-input" type="checkbox" value="${permission.id}" />
          </div>
        </div>
      </td>
    </tr>
    `)
  });
  
}

async function addRole() {
  $("#addRole").click(async function() {
    formValidationClear();
    
    try {
      const listPermissionDipilih = $('#listInputPermission input[type="checkbox"]:checked')
      .map(function () {
        return $(this).val();
      })
      .get();
      let reqData = {
        "namaRole": $("#namaRole").val(),
        "listPermission": listPermissionDipilih
      }

      const $roleTitle = $('.role-title');
      let textPopupRole;
      let response;
      if ($roleTitle.text() === "Add New Role") {
        response = await axios.post(app_url + '/api/user/add-role', reqData);
        textPopupRole = "Ditambahkan";
      }
      else {
        response = await axios.put(app_url + '/api/user/update-role/' + $("#addRole").attr('data-id'), reqData);
        textPopupRole = "Diupdate";
      }

      
      if (response.data.status) {
        formReset(["#namaRole", `#listInputPermission input[type="checkbox"]:checked`]);
        $('#addRoleModal').modal('hide');
          await populateTampilanListRole();
        Swal.fire({
          title: `Role Berhasil ${textPopupRole}`,
          text: `Role ${$("#namaRole").val()} Berhasil ${textPopupRole}`,
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary waves-effect waves-light'
          },
          buttonsStyling: false
        });
      }

    } catch (error) {
      formValidation(error);
    }
  });
}

async function populateTampilanListRole(){
  let listRole = await axios.get(baseUrl + 'api/user/list-role');
  listRole = listRole.data.data;
  $("#roleContainer").empty();
  listRole.forEach(permission => {
    const permissionJson = JSON.stringify(permission);
    $("#roleContainer").append(`
    <div class="col-xl-4 col-lg-6 col-md-6">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <p class="mb-0">Total 4 users</p>
          </div>
          
          <div class="accordion mb-4" id="acordion-role-permission${permission.id}">
            <div class="accordion-item">
              <h2 class="accordion-header d-flex align-items-center">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#acordion-role-permission${permission.id}-items" aria-expanded="false">
                  <i class="ri-shield-user-fill"></i>
                  Permission
                </button>
              </h2>
              <div id="acordion-role-permission${permission.id}-items" class="accordion-collapse collapse" >
                <div class="accordion-body">
                  <ul class="mb-0">
                    ${permission.permissions.map(perm => `
                      <li>${perm.name}</li>
                    `).join('')}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <div class="role-heading">
              <h5 class="mb-1">${permission.name}</h5>
              <div class="d-flex align-items-center">
                <button data-object='${permissionJson}' data-bs-toggle="modal" data-bs-target="#addRoleModal" class="btn btn-sm btn-icon btn-text-secondary rounded-pill text-body waves-effect waves-light me-1 role-edit-modal" title="Edit">
                  <i class="ri-edit-box-line ri-20px"></i>
                </button>
                <button data-object='${permissionJson}' class="btn btn-sm btn-icon btn-text-secondary rounded-pill delete-record-role text-body waves-effect waves-light me-1" data-bs-toggle="tooltip" title="Delete">
                  <i class="ri-delete-bin-7-line ri-20px"></i>
                </button>
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
    `)
  });
}

async function superadminCheck(){
  $('#superAdmin').on('change', function () {
    const isChecked = $(this).is(':checked');
    if (isChecked) {
      $(`#listInputPermission input[type="checkbox"]`).prop('checked', true);
    }
  });
}

async function deleteRole(){
  // Delete Record
  $(document).on('click', '.delete-record-role', async function () {
    try {
      const data = JSON.parse(decodeURIComponent($(this).attr('data-object')));
      const id = data.id;
      const nama = data.name;
      Swal.fire({
        title: `Apakah Anda Yakin Ingin menghapus Role?`,
        text: `Apakah Anda Yakin Ingin menghapus Role ${nama}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
        customClass: {
          confirmButton: 'btn btn-primary me-3 waves-effect waves-light',
          cancelButton: 'btn btn-outline-secondary waves-effect'
        },
        buttonsStyling: false
      }).then(async function (result) {
        if (result.value) {
          let response = await axios.delete(app_url + `/api/user/delete-role/${id}`);
          
          if (response.data.status) {
            Swal.fire({
              title: 'Role Berhasil Dihapus!',
              text: `Role ${nama} Berhasil Dihapus`,
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary waves-effect waves-light'
              },
              buttonsStyling: false
            });
            await populateTampilanListRole();
          }
          else if (response.data.status == false) {
            Swal.fire({
              title: 'Role Gagal Dihapus!',
              text: `${response.data.message}`,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary waves-effect waves-light'
              },
              buttonsStyling: false
            });
          }
        }
      });

    } catch (error) {
      console.log(error);
    }
  });
}
