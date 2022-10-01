import { BaseService } from 'src/app/core/base/base.service';
import { ApplicationStatus, ProductPriority } from './../contants/enum';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedService } from 'src/app/shared/shared.service';

@Component({  
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent  {

    f!: FormGroup;
    fs!: FormGroup;
    fb!: FormBuilder;
    dialogName!: string;
    filterName!: string;
    controlName!: string;
    dialogHeader!: string;
    dialogCols!: any[];
    dialogData!: any[];
    // data!: ExportApplication[];
    cols!: any[];
    sharedService!: SharedService;
    confirmDialog!: ConfirmationService;
    numRecord = 10;
    pageIndex = 0;
    pFirst = 0;
    stopLoading = true;
    noRecode: boolean = false;
    noData!: any;
    service!: BaseService;
    queryString: any;
    objList: any = [];
    length!: number;
    obj: any;
    formStatus = 'list';
    pageName!: string;
    messageService!: MessageService;
    listQueryData: any;
    branchObj: any;
    sidebar = false;
    constructor() {
        
     }

    initForm() {
        this.initFormSearch();
    }

    initFormSearch() {
        this.fs = this.fb.group({
            query: null,
        });
    }

    onDialogAction(controlName: any, event: any) { }

    getObjList() {
        this.queryData();
    }

    queryData() {
        this.stopLoading = false;
        this.noData = 'Record loading....';
        this.sharedService.showLoading(true);
        this.service.list(this.queryString, this.pageIndex, this.numRecord)
            .subscribe(
                (data: any) => {
                    this.objList = data.results;
                    console.log('list: ',this.objList);
                    
                    // this.length = this.objList.length;
                    // console.log('lenght',this.length);
                    
                    this.listQueryData = data;
                    if (this.objList.results.length === 0) {
                        this.noRecode = true;
                        this.noData = 'No Record Found.';
                    } else {
                        this.noRecode = false;
                        this.noData = null;
                    }
                    this.stopLoading = true;
                    this.sharedService.showLoading(false);
                },
                (error: any) => {
                    this.stopLoading = true;
                    this.noData = 'Please contact support.';
                    this.sharedService.showLoading(false);
                }
            );
    }

    onAction(event: any) {
        if (event.action === 'View') {
            this.showViewForm(event.rowData);
        } else if (event.action === 'Edit') {
            this.showEditForm(event.rowData);
        } else if (event.action === 'Apply Role') {
            this.applyRole(event.rowData);
        } else if (event.action === 'Delete') {
            this.showDeleteForm(event.rowData);
        } else if (event.action === 'Permission') {
            this.showViewForm(event.rowData);
        } else if (event.action === 'Detail') {
            this.showDetailForm(event.rowData);
        } else if (event.action === 'Product-Approval') {
            this.showProductApprovalForm(event.rowData);
        } else if (event.action === 'Branch-Approval') {
            this.showBranchApprovalFrom(event.rowData);
        } else if (event.action === 'Inter Branch') {
            this.showInterBranchForm(event.rowData);
        } else if (event.action === 'Policy') {
            this.showApplyPolicy(event.rowData);
        } else if (event.action === 'Condition') {
            this.showConditionForm(event.rowData);
        } else if (event.action === 'Scoring') {
            this.showCreditScoreConditionForm(event.rowData);
        } else if (event.action === 'Fee') {
            this.showFeeConfigForm(event.rowData);
        }
    }
    onClickAction(data: any, event: any) {
        if (event === 'View') {
            this.showViewDetail(data);
            this.sidebar = true;

        } else if (event === 'Add') {
            this.showAddNewForm(data);
        }
    }
    showFeeConfigForm(obj: any) { }
    showCreditScoreConditionForm(obj: any) { }
    showProductApprovalForm(obj: any) { }
    showBranchApprovalFrom(obj: any) { }
    showConditionForm(obj: any) { }
    showInterBranchForm(obj: any) { }
    showViewDetail(obj: any) { }
    showDeleteForm(obj: any) {
        this.confirmDialog.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                obj.status = false;
                this.sharedService.showLoading(true);
                this.service.delete(obj).subscribe(
                    (res:any) => {
                        this.afterDeleteSuccess(res);
                    },
                    (error : any) => {
                        this.errorServiceGetResponse(error);
                    }
                );
            },
            reject: () => { },
        });
    }
    showApplyPolicy(obj: any) { }
    showAddNewForm(obj: any) { }

    afterDeleteSuccess(res?: any) {
        this.formStatus = 'list';
        this.getObjList();
        this.messageService.add({
            severity: 'success',
            summary: 'Delete',
            detail: this.pageName + ' was deleted successfully.',
        });
        this.sharedService.showLoading(false);
    }

    showViewForm(obj: any) {
        this.formStatus = 'view';
        this.obj = obj;
    }
    showDetailForm(obj: any) {
        this.formStatus = 'detail';
        this.obj = obj;
    }

    showEditForm(obj: any) {
        this.formStatus = 'edit';
        this.obj = obj;
        this.initForm();
    }

    showNewForm() {
        this.formStatus = 'new';
        this.initForm();
    }

    afterSaveSuccess() {
        this.formStatus = 'list';
        this.getObjList();
        this.messageService?.add({
            severity: 'success',
            summary: 'Created',
            detail: this.pageName + ' was created successfully.',
        });
        this.sharedService.showLoading(false);
    }
    afterErrorResponse(message: any) {
        this.messageService?.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
        });
        this.sharedService.showLoading(false);
    }

    afterUpdateSuccess() {
        this.formStatus = 'list';
        this?.getObjList();
        this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: this.pageName + ' was updated successfully.',
        });
        this.sharedService.showLoading(false);
    }

    search(query: any) {
        this.queryString = query;
        this.pageIndex = 0;
        this.activeCurrentPage();
        this.queryData();
    }

    activeCurrentPage() {
        this.pFirst = this.pageIndex * this.numRecord;
    }

    pageEvent(event: any) {
        this.numRecord = event.rows;
        this.pageIndex = event.page;
        this.activeCurrentPage();
        this.queryData();
    }

    saves(obj: any) {
        console.log(obj);
        
        this.service.create(obj).subscribe(
            (res: any) => {
                console.log(res);
            }
        );
    }

    

    save(obj: any) {
        this.sharedService.showLoading(true);
        if (this.formStatus === 'edit') {
            obj.id = this.obj.id;
            this.service.update(obj).subscribe(
                (res: any) => {
                    if (res.response.status === 200) {
                        this.afterUpdateSuccess();
                    } else {
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Warning',
                            detail: res.response.message,
                        });
                        this.sharedService.showLoading(false);
                    }
                },
                (error : any) => {
                    this.errorServiceGetResponse(error);
                }
            );
        } else {
            this.service.create(obj).subscribe(
                (res: any) => {
                    console.log(res);
                    
                    if (res.response.status === 200) {
                        this.afterSaveSuccess();
                    } else {
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Warning',
                            detail: res.response.message,
                        });
                        this.sharedService.showLoading(false);
                    }
                },
                (error : any) => {
                    this.errorServiceGetResponse(error);
                }
            );
        }
    }

    errorServiceGetResponse(error: any) {
        this.sharedService.showLoading(false);
        this.stopLoading = true;
        if (error?.status === 500 || error?.status === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Server',
                detail: ' Error server not response !!!',
            });
        } else if (error.status === 406) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Server',
                detail: error?.error.message,
            });
        } else if (error.status === 400) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: this.pageName + ' ' + error?.error?.errors,
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Server',
                detail: error?.error.message,
            });
        }
    }

    endProcess() {
        if (this.formStatus === 'new') {
            this.formStatus = 'list';
            this.getObjList();
            this.messageService.add({
                severity: 'success',
                summary: 'Created',
                detail: this.pageName + ' was created successfully.',
            });
            this.sharedService.showLoading(false);
        } else {
            this.formStatus = 'list';
            this.getObjList();
            this.messageService.add({
                severity: 'success',
                summary: 'Updated',
                detail: this.pageName + ' was updated successfully.',
            });
            this.sharedService.showLoading(false);
        }
    }

    initialBeforeSave() { }
    saveObject(formObj: any) {
        this.obj = formObj;
        this.initialBeforeSave();
        this.service.create(this.obj).subscribe(
            (res: any) => {
                if (res) {
                    this.afterSaveSuccess();
                } else {
                    // this.afterSaveFailed();
                }
            },
            (error : any) => {
                // this.errorServiceGetResponse(error);
            }
        );
    }
    applyRole(obj: any) {
        this.obj = obj;
    }

    employeeStatus(status: any) {
        let statusColor: string;
        if (status === ApplicationStatus.ACTIVE || status === true) {
            statusColor = '#009688';
        } else if (status === ApplicationStatus.CLOSED || status === false) {
            statusColor = '#f44336';
        } 
        else {
            statusColor = '#ac7e14';
        }
        return {
            color: statusColor,
        };
    }

    productStuts(status: any) {
        let statusColor: string;
        if (status === ProductPriority.HIGH) {
            statusColor = '#009688';
        } else if (status === ProductPriority.MEDIUM) {
            statusColor = '#ff9800';
        } else if (status === ProductPriority.LOW) {
            statusColor = '#f44336';
        } 
        else {
            statusColor = '#ff958e';
        }
        return {
            color: statusColor,
        };
    }



    roundTo(num: number, places: number) {
        const factor = 10 ** places;
        return Math.round(num * factor) / factor;
    }

}
