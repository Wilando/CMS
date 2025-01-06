import moment from 'moment';
import 'moment/locale/id';

window.formatTanggal = function(dateString) {
    return moment(dateString).locale('id').format('D MMMM YYYY, HH:mm');
};