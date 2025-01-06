var data_table;

document.addEventListener('DOMContentLoaded', async function () {
  await initLoad();
});

async function initLoad() {
  await dataTable();
  await initSelect2();
  await submitUser();
  await eventAddandUpdateUser();
  await deleteUser();
}

async function dataTable (){
  data_table = $('.datatables-users').DataTable({
    ajax: {
        url: baseUrl + 'api/user/list-user',
        type: "GET",
        xhrFields: {
          withCredentials: true
        },
    },
    columns: [
      // columns according to JSON
      { data: '' },
      { data: 'id' },
      { data: 'name' },
      { data: 'username' },
      { data: 'roles' },
      { data: '' },
    ],
    columnDefs: [
      {
        // For Responsive
        className: 'control',
        searchable: false,
        orderable: false,
        responsivePriority: 2,
        targets: 0,
        render: function (data, type, full, meta) {
          return '';
        }
      },
      {
        // For Checkboxes
        targets: 1,
        orderable: false,
        render: function () {
          return '<input type="checkbox" class="dt-checkboxes form-check-input">';
        },
        checkboxes: {
          selectAllRender: '<input type="checkbox" class="form-check-input">'
        }
      },
      {
        // User full name and email
        targets: 2,
        responsivePriority: 4,
        render: function (data, type, full, meta) {
          var $name = full['name'],
            $email = full['email']
            
          
          // For Avatar badge
          var stateNum = Math.floor(Math.random() * 6);
          var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
          var $state = states[stateNum],
            $name = full['name'],
            $initials = $name.match(/\b\w/g) || [];
          $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
          var $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
          
          // Creates full output for row
          var $row_output =
            '<div class="d-flex justify-content-start align-items-center user-name">' +
              '<div class="avatar-wrapper">' +
                '<div class="avatar avatar-sm me-3">' +
                  $output +
                '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
                '<a href="#' +
                '" class="text-truncate text-heading"><span class="fw-medium">' +
                 $name +
                '</span></a>' +
                '<small>' +
                  $email +
                '</small>' +
              '</div>' +
            '</div>';
          return $row_output;
        }
      },
      {
        // User username
        targets: 3,
        render: function (data, type, full, meta) {
          var $username = full['username'];
          return '<span >' + $username + '</span>';
        }
      },
      {
        // User Role
        targets: 4,
        render: function (data, type, full, meta) {
          var role = full['roles'];
          return `<span> ${ role.length == 0 ? "" : role[0].name} </span>`;
        }
      },
      {
        // Actions
        targets: 5,
        title: 'Actions',
        searchable: false,
        orderable: false,
        render: function (data, type, full, meta) {
          const dataString = encodeURIComponent(JSON.stringify(full));
          return (
            '<div class="d-flex align-items-center gap-50">' +
              `<a href="javascript:;" data-object='${dataString}' class="btn btn-sm btn-icon btn-text-secondary rounded-pill waves-effect delete-record" data-bs-toggle="tooltip" title="Delete User"><i class="ri-delete-bin-7-line ri-20px"></i></a>` +
              `<a href="javascript:;" data-object='${dataString}' class="btn btn-sm btn-icon btn-text-secondary rounded-pill waves-effect update-record" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser" title="Edit User"><i class="ri-edit-box-line ri-20px"></i></a>` +
            '</div>'
          );
        }
      }
    ],
    language: {
      sLengthMenu: 'Show _MENU_',
      search: '',
      searchPlaceholder: 'Cari User',
      paginate: {
        next: '<i class="ri-arrow-right-s-line"></i>',
        previous: '<i class="ri-arrow-left-s-line"></i>'
      }
    },
    dom: '<"row"' +
         '<"col-md-2 d-flex align-items-center justify-content-md-start justify-content-center"<"dt-action-buttons mt-5 mt-md-0"l>>' +
         '<"col-md-10"<"d-flex align-items-center justify-content-md-end justify-content-center"<"me-4"f><"add-new">>>' +
         '>t' +
         '<"row"' +
         '<"col-sm-12 col-md-6"i>' +
         '<"col-sm-12 col-md-6"p>' +
         '>',
    lengthMenu: [
        [10, 25, 50, 100, -1], // Tambahkan -1 untuk opsi "Show All"
        ['10', '25', '50', '100', 'All'] // Teks untuk dropdown
    ],
    pageLength: 10,
    // For responsive popup
    responsive: {
      details: {
        display: $.fn.dataTable.Responsive.display.modal({
          header: function (row) {
            var data = row.data();
            return 'Details of ' + data['full_name'];
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
      //Adding role filter once table initialized
      this.api()
      .columns(4)
      .every(function () {  
        var column = this;
        var select = $(
          '<select id="UserRole" class="form-select text-capitalize"><option value=""> Semua Role </option></select>'
        )
          .appendTo('.user_role')
          .on('change', function () {
            var val = $(this).val();
            column.search(val ? val : '', true, false).draw();
          });
        
          let uniqueRole = new Set();

          column
            .data()
            .sort()
            .each(function (d, j) {
              if (d.length > 0) {
                uniqueRole.add(d[0].name); // Tambahkan ke Set untuk memastikan unik
              }
            });
          
          uniqueRole.forEach(name => {
            select.append(`<option value="${name}">${name}</option>`);
          })
      });
      
      // // Adding status filter once table initialized
      // this.api()
      //   .columns(6)
      //   .every(function () {
      //     var column = this;
      //     var select = $(
      //       '<select id="FilterTransaction" class="form-select text-capitalize"><option value=""> Select Status </option></select>'
      //     )
      //       .appendTo('.user_status')
      //       .on('change', function () {
      //         var val = $.fn.dataTable.util.escapeRegex($(this).val());
      //         column.search(val ? '^' + val + '$' : '', true, false).draw();
      //       });

      //     column
      //       .data()
      //       .unique()
      //       .sort()
      //       .each(function (d, j) {
      //         select.append(
      //           '<option value="' +
      //             statusObj[d].title +
      //             '" class="text-capitalize">' +
      //             statusObj[d].title +
      //             '</option>'
      //         );
      //       });
      //   });
      $('.add-new').html(
        `<button id="btnModalAddUser" class='btn btn-primary waves-effect waves-light' data-bs-toggle='offcanvas' data-bs-target='#offcanvasAddUser'><i class='ri-add-line me-0 me-sm-1 d-inline-block d-sm-none'></i><span class= 'd-none d-sm-inline-block'> Add New User </span ></button>`
      );
    }
  });
}

async function initSelect2(){
  // Role
  let listRole = await axios.get(baseUrl + 'api/user/list-role');
  listRole = listRole.data.data.map(function (item) {
    return {
        id: item.id,
        text: item.name
    };
  });
  
  $('#role').select2({
    data: listRole,
    placeholder: 'Cari Role',
    allowClear: true,
    dropdownParent: $('#offcanvasAddUser'),
  });
}

async function eventAddandUpdateUser(){
  $(document).on('click', '#btnModalAddUser', function () {
    formReset(["#nama", "#username", "#email", "#role", "#password"]);
    $(".offcanvas-title").text("Add User");
  });
  $(document).on('click', '.update-record', function () {
    formReset(["#nama", "#username", "#email", "#role", "#password"]);
    $(".offcanvas-title").text("Update User");
    const data = JSON.parse(decodeURIComponent($(this).attr('data-object')));
    let nama = data.name;
    let email = data.email;
    let username = data.username;
    let role = data.roles[0].id;
    $("#submitUser").attr('data-id', data.id);
    console.log(data);
    $("#nama").val(nama);
    $("#email").val(email);
    $("#username").val(username);
    $("#role").val(role).trigger("change");
  });

}

async function deleteUser(){
  // Delete Record
  $('.datatables-users tbody').on('click', '.delete-record', async function () {
    try {
      const data = JSON.parse(decodeURIComponent($(this).attr('data-object')));
      const id = data.id;
      const nama = data.name;
      Swal.fire({
        title: `Apakah Anda Yakin Ingin menghapus User?`,
        text: `Apakah Anda Yakin Ingin menghapus User ${nama}?`,
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
          let response = await axios.delete(app_url + `/api/user/delete-user/${id}`);
          if (response.data.status) {
            Swal.fire({
              title: 'User Berhasil Dihapus!',
              text: `User ${nama} Berhasil Dihapus`,
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary waves-effect waves-light'
              },
              buttonsStyling: false
            });
            data_table.ajax.reload();
          }
        }
      });

    } catch (error) {
      console.log(error);
    }
  });
}

async function submitUser() {
  $("#submitUser").click(async function() {
    formValidationClear();
    
    try {
      let reqData = {
        "nama": $("#nama").val(),
        "username": $("#username").val(),
        "email": $("#email").val(),
        "password": $("#password").val(),
        "role": $("#role").val(),
      }

      const $title = $('.offcanvas-title');
      let textPopup;
      let response;
      if ($title.text() === "Add User") {
        response = await axios.post(app_url + '/api/user/add-user', reqData);
        textPopup = "Ditambahkan";
      }
      else {
        response = await axios.put(app_url + '/api/user/update-user/' + $("#submitUser").attr('data-id'), reqData);
        textPopup = "Diupdate";
      }

      
      if (response.data.status) {
        formReset(["#nama", "#username", "#email", "#role", "#password"]);
        $('#offcanvasAddUser').offcanvas('hide');
        await data_table.ajax.reload();
        Swal.fire({
          title: `User Berhasil ${textPopup}`,
          text: `User ${$("#nama").val()} Berhasil ${textPopup}`,
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary waves-effect waves-light'
          },
          buttonsStyling: false
        });
      }

    } catch (error) {
      console.log(error);
      formValidation(error);
    }
  });
}