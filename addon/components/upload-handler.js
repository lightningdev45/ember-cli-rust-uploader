import Ember from 'ember';

export default Ember.Component.extend({
  startUploadingActionName:"startUploading",
  startProcessingActionName:"startProcessing",
  pushDataSourceActionName:"pushDataSourceIntoStore",
  finishUploadActionName:"finishUpload",
  loadingBarEnabled:true,
  actions:{
    pushDataSourceIntoStore:function(data){
      this.sendAction("pushDataSourceActionName",data)
    }
  },
  didInsertElement:function(){
    var component=this;
    $("#"+this.get("formName")).fileupload({
      dataType:"json",
      done:function(e,data){
        component.get("uploadContainer").set("uploadsRemaining",component.get("uploadContainer.uploadsRemaining")-1);
        component.get("uploadContainer").set("uploadCount",component.get("uploadContainer.uploadCount")+1);
        component.get("uploadContainer.uploadQueue").shift();
        if(component.get("uploadContainer.uploadQueue").length>0){
          component.get("uploadContainer.uploadQueue")[0].data.submit();
        }
        component.send("pushDataSourceIntoStore",data.result.data_source)
        component.sendAction("finishUploadActionName")
      },
      progress:function(e,data){
        if(component.get("loadingBarEnabled")){
          var progress = parseInt(data.loaded / data.total * 100, 10);
          if(progress===100){
            component.sendAction("startProcessingActionName");
          }
          $("#loading-bar").find(".progress-bar").css('width', progress + '%');
        }
      },
      add:function(e,data){
        if(component.get("loadingBarEnabled")){
          $(".loading-bar-container").css("display","inline-block");
          $("#loading-bar").find(".progress-bar").css('width', '0%');
        }
          component.get("uploadContainer").set("uploadsRemaining",component.get("uploadContainer.uploadsRemaining")+1);
          var uploadId=moment().valueOf();
          component.get("uploadContainer.uploadQueue").push({id:uploadId,data:data});
          var fileTypesOk=true;
          var fileSizeOk=true;
          data.files.forEach(function(file){
            console.log(file.type)
            if(file.type==="text/csv"||file.type==="application/vnd.ms-excel"){
            }else{
              fileTypesOk=false;
            }
            if(file.size/(1024*1024)<=1000){
              fileSizeOk=true;
            }else{
              fileSizeOk=false;
            }
          });
          if(fileTypesOk){
            if(fileSizeOk){
              if(component.get("uploadContainer.uploadQueue")[0].id===uploadId){
                data.submit();
                component.sendAction("startUploadingActionName");
              }
            }else{
              //controller.get("controllers.application").send("showTopAlert","You must upload a file <100 MB.  Please split the file up and try again.","alert alert-danger alert-dismissible","devise-alert")
              $(data.context).css("display","none");
            }
          }else{
            component.get("applicationState").setProperties({alertClass:"alert-danger",alertMessage:"You must upload a csv file!"});
            $(data.context).css("display","none");
          }
      },
      fail:function(e,data){
        console.log(e)
        console.log(data)
        component.get("uploadContainer").set("uploadsRemaining",component.get("uploadContainer.uploadsRemaining")-1);
        component.get("uploadContainer.uploadQueue").shift();

      }
    });
  }
});
