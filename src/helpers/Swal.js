import SW from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(SW)

class Swal {
    confirm(data, callback) {
        MySwal.fire({
            title: data.title,
            // text: "You won't be able to revert this!",
            icon: data.icon,
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: data.confirmText
          }).then((result) => {
            if (result.value) {
                callback()              
            }
        })
    }

    swalert(text, e, type) {
        MySwal.fire(text, e, type)
    }

    loading() {
        MySwal.fire({
            showConfirmButton: false,
            timerProgressBar: true,
            html: `
            <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            `
        })
    }
}

export default new Swal()