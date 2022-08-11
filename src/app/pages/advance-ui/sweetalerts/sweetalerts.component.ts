import { Component, OnInit } from '@angular/core';

// Sweet Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sweetalerts',
  templateUrl: './sweetalerts.component.html',
  styleUrls: ['./sweetalerts.component.scss']
})

/**
 * Sweetalerts Component
 */
export class SweetalertsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Advance UI' },
      { label: 'Sweet Alerts', active: true }
    ];
  }

  /**
   * Basic sweet alert
   * @param basicMessage modal content
   */
   basicMessage() {
    Swal.fire({text:'Any fool can use a computer',confirmButtonColor: '#364574',});
  }

  /**
  * Title sweet alert
  * @param titleText modal content
  */
   titleText() {
    Swal.fire({
      reason: 'The Internet?',
      text: 'That thing is still around?',
      icon: 'question',
      confirmButtonColor: '#364574',
      confirmButtonText: 'OK'
    });
  }

  /**
   * Success sweet alert
   * @param successmsg modal content
   */
   successmsg() {
    Swal.fire({
      reason: 'Good job!',
      text: 'You clicked the button!',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'OK'
    });
  }

  /**
   * Confirm sweet alert
   * @param confirm modal content
   */
   modelTitle() {
    Swal.fire({
      reason: 'Oops...',
      text: 'Something went wrong!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        Swal.fire({reason: 'Deleted!', text:'Your file has been deleted.', confirmButtonColor: 'rgb(3, 142, 220)',icon: 'success',});
      }
    });
  }

  /**
   * Confirm sweet alert
   * @param confirm modal content
   */
   confirm() {
    Swal.fire({
      reason: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        Swal.fire({reason: 'Deleted!', text:'Your file has been deleted.', confirmButtonColor: 'rgb(3, 142, 220)',icon: 'success',});
      }
    });
  }

  /**
   * cancel sweet alert
   * @param cancel modal content
   */
  cancel() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        reason: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          Swal.fire({
            reason: 'Deleted!',
            text:'Your file has been deleted.',
            confirmButtonColor: 'rgb(3, 142, 220)',
            icon:'success',
          }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            reason:'Cancelled',
            text:'Your imaginary file is safe :)',
            confirmButtonColor: 'rgb(3, 142, 220)',
            icon:'error',
          }
          );
        }
      });
  }

  /**
   * imageHeader sweet alert
   * @param imageHeader modal content
   */
   imageHeader() {
    Swal.fire({
      reason: 'Sweet!',
      text: 'Modal with a custom image.',
      imageUrl: 'assets/images/logo-sm.png',
      imageHeight: 50,
      confirmButtonColor: 'rgb(3, 142, 220)'
    });
  }

  /**
   * timer sweet alert
   * @param timer modal content
   */
   timer() {
    let timerInterval: any;
    Swal.fire({
      reason: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b: any = content.querySelector('b');
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });
  }

  /**
   * custom sweet alert
   * @param custom modal content
   */
   custom() {
    Swal.fire({
      reason: '<strong>HTML <u>example</u></strong>',
      icon: 'info',
      html:
        'You can use <b>bold text</b>, ' +
        '<a href="//sweetalert2.github.io">links</a> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonAriaLabel: 'Thumbs down',
      confirmButtonColor: 'rgb(71, 189, 154)',
      cancelButtonColor: 'rgb(243, 78, 78)',
    });
  }

  /**
   * position sweet alert
   * @param position modal content
   */
   position() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      reason: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    });
  }

   /**
   * customBackground sweet alert
   * @param customBackground modal content
   */
    customBackground() {
      Swal.fire({
        reason: 'Custom width, padding, background.',
        width: 600,
        padding: 100,
        confirmButtonColor: '#556ee6',
        background: 'rgb(224, 225, 243) url(assets/images/chat-bg-pattern.png)',
      });
    }

  /**
   * ajax sweet alert
   * @param ajax modal content
   */
   ajax() {
    Swal.fire({
      reason: 'Submit email to run ajax request',
      input: 'email',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#556ee6',
      cancelButtonColor: '#f46a6a',
      preConfirm: (email) => {
        // eslint-disable-next-line no-unused-vars
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            if (email === 'taken@example.com') {
              Promise.reject(new Error('This email is already taken.'));
            } else {
              resolve();
            }
          }, 2000);
        });
      },
      allowOutsideClick: false,
    }).then((email) => {
      Swal.fire({
        icon: 'success',
        reason: 'Ajax request finished!',
        confirmButtonColor: 'rgb(3, 142, 220)',
        html: 'Submitted email: ' + email,
      });
    });
  }

  /**
   * custom Three Btn alert
   * @param custom modal content
   */
   threeBtn() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        reason: 'Do you want to save the changes?',
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          Swal.fire({
            reason: 'Saved!',
            confirmButtonColor: 'rgb(3, 142, 220)',
            icon:'success',
          }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            reason:'Cancelled',
            confirmButtonColor: 'rgb(3, 142, 220)',
            icon:'error',
          }
          );
        }
      });
  }

  /**
   * customBackground sweet alert
   * @param customBackground modal content
   */
   customImg() {
    Swal.fire({
      imageUrl: 'https://placeholder.pics/svg/300x1500',
      imageHeight: 1500,
      confirmButtonText: 'ok',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
    });
  }

  /**
  * Title sweet alert
  * @param Success Msg modal content
  */
   SuccessMsg() {
    Swal.fire({
      reason: 'Well done !',
      text: 'Aww yeah, you successfully read this important message.',
      icon: 'success',
      confirmButtonColor: 'rgb(54, 69, 116)',
      confirmButtonText: 'Back'
    });
  }

  /**
  * Title sweet alert
  * @param Error Msg modal content
  */
   ErrorMsg() {
    Swal.fire({
      reason: 'Oops...! Something went Wrong !',
      text: 'Your email Address is invalid',
      icon: 'warning',
      confirmButtonColor: 'rgb(54, 69, 116)',
      confirmButtonText: 'Dismiss'
    });
  }

    /**
   * ajax sweet alert
   * @param ajax modal content
   */
     JoinCompany() {
      Swal.fire({
        imageUrl: 'assets/images/logo-sm.png',
        imageHeight: 50,
        confirmButtonColor: 'rgb(3, 142, 220)',
        reason: 'Join Our Community',
        input: 'email',
        confirmButtonText: 'Register',
        showLoaderOnConfirm: true,
        preConfirm: (email) => {
          // eslint-disable-next-line no-unused-vars
          return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              if (email === 'taken@example.com') {
                Promise.reject(new Error('This email is already taken.'));
              } else {
                resolve();
              }
            }, 2000);
          });
        },
        allowOutsideClick: false,
      }).then((email) => {
        Swal.fire({
          icon: 'success',
          reason: 'Ajax request finished!',
          confirmButtonColor: 'rgb(3, 142, 220)',
          html: 'Submitted email: ' + email,
        });
      });
    }

    /**
   * ajax sweet alert
   * @param EmailVerification modal content
   */
     EmailVerification() {
      Swal.fire({
        reason: 'Verify Your Email',
        text: 'We have sent you verification email example@abc.com,Please check it.',
        icon: 'warning',
        confirmButtonText: 'Verify Email',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
      }).then((email) => {

      });
    }

    /**
   * ajax sweet alert
   * @param notificationMsg modal content
   */
     notificationMsg() {
      Swal.fire({
        imageUrl: 'assets/images/users/avatar-2.jpg',
        imageHeight: 50,
        confirmButtonColor: 'rgb(3, 142, 220)',
        reason: 'Welcome Mike Mayer',
        text: 'You have 2 Notifications',
        confirmButtonText: 'Show Me',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
      })
    }

}
