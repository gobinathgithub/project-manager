import { Component, OnInit } from '@angular/core';
import { UserDetailsModel } from '../../model/user';
import { CommonService } from '../common.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../service/shared.service';
import { TaskDetailsModel } from '../../model/task';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userDetails = new UserDetailsModel();
  valButton = 'Add';
  userInforamtion: any;
  editId: any;
  serachUser: any;
  path: string[];
  sortOrder: number = 1 // For ASC 1, For DESC -1
  spinner: boolean = false;
  userAvailable: boolean = false;
  deleteUserInfo: any;
  errorMessage: any;
  constructor(private service: CommonService, private modalService: NgbModal, private shared: SharedService) {
    this.shared.TaskModel = new TaskDetailsModel();
  }

/**
 * When component initialze required informations/methods should call
 */
  ngOnInit() {
    this.getUser();
  }

/**
 * This method should call when add/edit user and store/update the user informations to DB
 * @param user : user information from form
 * @param userForm : user form details
 */
  addUser(user, userForm) {
    this.spinner = true;
    userForm.reset();
    if (this.valButton === 'Add') {
      this.service.addUser(user).subscribe(
        (res: any) => {
          if(res.success && res.success !== false) {
            this.getUser();
            this.resetModel();            
            this.spinner = false;
          } else {
            this.spinner = false;
            this.errorMessage = 'Failed: ' + res.message;
          }
        }, (error) => {
          this.spinner = false;
          this.errorMessage = 'We are having some technical error, please try after sometime to add new user...!!!';
        }
      )
    } else {
      user._id = this.editId;
      this.service.updateUser(user).subscribe(
        (data) => {
          this.valButton = 'Add';
          this.getUser();
          this.resetModel();
          this.spinner = false;
        }, (error) => {
          this.spinner = false;
          this.errorMessage = 'We are having some technical error, please try after sometime to update this user...!!!';
        }
      )
    }    
  }

/**
 * This method should call to get the existing user informations to append in view
 */
  getUser() {
    this.spinner = true;
    this.service.getUser().subscribe(
      (data: any) => {     
        if (data) {
          this.userInforamtion = data.data;
          this.userCountCheck(this.userInforamtion);   
          this.spinner = false;
        } else {
          this.spinner = false;
        }
      }, (error) => {
        this.spinner = false;
        this.errorMessage = 'We are having some technical error, please try after sometime to get the existing user informations...!!!';
      }
    )
  }

/**
 * This method should when click Edit user button
 * @param user : user information
 */
  editUser(user) {
    this.editId = user._id;
    this.valButton = 'Update';
    this.setUserInfo(user);
  }

/**
 * This method should call to assign the user informations to exit in view
 * @param userInfo : user informations to edit
 */
  setUserInfo(userInfo) {
    this.userDetails.firstName = userInfo.firstName;
    this.userDetails.lastName = userInfo.lastName;
    this.userDetails.employeeId = userInfo.employeeId;
  }

/**
 * This method should call to open the modal
 * @param content : modal name to open
 * @param user : user informations to edit
 */
  open(content, user) {
    this.modalService.open(content);
    this.deleteUserInfo = user;
  }

/**
 * This method should call to delete the existing user
 * @param user : user informations to delete
 */
  deleteUser(user) {
    this.spinner = true;
    this.service.deleteUser(user).subscribe(
      (data) => {
        if (data) {
          this.getUser();
          this.spinner = false;
        } else {
          this.spinner = false;
        }
      }, (error) => {
        this.spinner = false;
        this.errorMessage = 'We are having some technical error, please try after sometime to delete this user...!!!';
      }
    )
  }

/**
 * This method should to find the esiting user informations length
 * @param data : User informations to check the length of existing users
 */
  userCountCheck(data) {
    if (data.length > 0) {
      this.userAvailable = true;
    } else {
      this.userAvailable = false;
    }
  }

/**
 * This method should call to reset the the model values
 */
  resetModel() {
    this.userDetails = new UserDetailsModel();
  }

/**
 * This method should call to sort the user informations based on the key name
 * @param user : key name to sort the user information
 */
  sortUser(user: string) {
    this.path = user.split('.');
    this.sortOrder = this.sortOrder * (-1);
    return false;
  }
}
