var data_table;

document.addEventListener('DOMContentLoaded', async function () {
  await initLoad();
});

async function initLoad() {
  await dataTable();
  await eventAddandUpdate();
  await submit();
  await deletePage();
}

async function dataTable() {
  data_table = $('.datatables').DataTable({
    ajax: {
      url: baseUrl + 'api/page/list-page',
      type: 'GET',
      xhrFields: {
        withCredentials: true
      }
    },
    columns: [{ data: '' }, { data: 'id' }, { data: 'page_name' }, { data: 'status' }, { data: '' }],
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
          var $pageName = full['page_name'];
          return '<span class="text-nowrap text-heading">' + $pageName + '</span>';
        }
      },
      {
        // remove ordering from Name
        targets: 3,
        orderable: true,
        render: function (data, type, full, meta) {
          var status = full['status'];
          return '<span class="text-nowrap">' + status + '</span>';
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
          return `<div class="d-flex align-items-center">
                <button data-object='${dataString}' class="btn btn-sm btn-icon btn-text-secondary rounded-pill delete-record text-body waves-effect waves-light me-1" data-bs-toggle="tooltip" title="Delete">
                  <i class="ri-delete-bin-7-line ri-20px"></i>
                </button>
                <span class="text-nowrap"><button data-object='${dataString}' class="btn btn-sm btn-icon btn-text-secondary text-body rounded-pill waves-effect waves-light update-record" data-bs-target="#modalFormPage" data-bs-toggle="modal" data-bs-dismiss="modal"><i class="ri-edit-box-line ri-20px"></i></button></span>
                <a href="/admin/builder/${full['id']}" class="btn btn-primary me-2">
                  <span class="tf-icons ri-checkbox-circle-line ri-16px me-2"></span> Build
                </a>
              </div>`;
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
    lengthMenu: [
      [10, 25, 50, 100, -1], // Tambahkan -1 untuk opsi "Show All"
      ['10', '25', '50', '100', 'All'] // Teks untuk dropdown
    ],
    pageLength: 10,
    language: {
      sLengthMenu: 'Show _MENU_',
      search: '',
      searchPlaceholder: 'Cari Page',
      paginate: {
        next: '<i class="ri-arrow-right-s-line"></i>',
        previous: '<i class="ri-arrow-left-s-line"></i>'
      }
    },
    // Buttons with Dropdown
    buttons: [
      {
        text: '<i class="ri-add-line me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Tambah</span>',
        className: 'add-new btn btn-primary mb-5 mb-md-0 waves-effect waves-light',
        attr: {
          'data-bs-toggle': 'modal',
          'data-bs-target': '#modalFormPage',
          id: 'btnModalAdd'
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
            return 'Details of ' + data['nama_page'];
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

async function eventAddandUpdate() {
  $(document).on('click', '#btnModalAdd', function () {
    formReset(['#namaPage', '#status']);
    $('#modalFormPageTitle').text('Tambah Page');
    $('#submit').text('Simpan');
  });
  $(document).on('click', '.update-record', function () {
    formReset(['#namaPage', '#status']);
    $('#modalFormPageTitle').text('Update Page');
    const data = JSON.parse(decodeURIComponent($(this).attr('data-object')));
    let namaPage = data.page_name;
    let status = data.status;
    $('#submit').attr('data-id', data.id);
    $('#submit').text('Update');
    $('#namaPage').val(namaPage);
    $('#status').val(status).trigger('change');
  });
}

async function deletePage() {
  // Delete Record
  $('.datatables tbody').on('click', '.delete-record', async function () {
    try {
      const data = JSON.parse(decodeURIComponent($(this).attr('data-object')));
      const id = data.id;
      const nama = data.page_name;
      Swal.fire({
        title: `Apakah Anda Yakin Ingin menghapus Page?`,
        text: `Apakah Anda Yakin Ingin menghapus Page ${nama}?`,
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
          let response = await axios.delete(app_url + `/api/page/delete-page/${id}`);
          if (response.data.status) {
            Swal.fire({
              title: 'Page Berhasil Dihapus!',
              text: `Page ${nama} Berhasil Dihapus`,
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

async function submit() {
  $('#submit').click(async function () {
    formValidationClear();

    try {
      let reqData = {
        namaPage: $('#namaPage').val(),
        status: $('#status').val()
      };

      const $title = $('#modalFormPageTitle');
      let textPopup;
      let response;
      if ($title.text() === 'Tambah Page') {
        response = await axios.post(app_url + '/api/page/store-page', reqData);
        textPopup = 'Ditambahkan';
      } else {
        response = await axios.put(app_url + '/api/page/update-page/' + $('#submit').attr('data-id'), reqData);
        textPopup = 'Diupdate';
      }

      if (response.data.status) {
        formReset(['#namaPage', '#status']);
        $('#modalFormPage').modal('hide');
        await data_table.ajax.reload();
        Swal.fire({
          title: `Page Berhasil ${textPopup}`,
          text: `Page ${$('#pageName').val()} Berhasil ${textPopup}`,
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
