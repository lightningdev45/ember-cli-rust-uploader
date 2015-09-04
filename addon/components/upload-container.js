import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement:function(){
    $(".back-button").removeClass("active")
  },
  pushDataSourceActionName:"pushDataSourceIntoStore",
  uploadsRemaining:0,
  uploadCount:0,
  secondsRemaining:0,
  uploadQueue:[],
  uploadTypes:Ember.Object.create({"Core":"upload_transaction_inserts_form","Monitoring":"upload_transaction_inserts_form","Risk Threshold":"upload_transaction_inserts_form"}),
  uploadTypesKeys:function(){
    return Object.keys(this.get("uploadTypes"))
  }.property("uploadTypes"),
  isFinished:function(){
    if(this.get("uploadsRemaining")===0){
      return true;
    }else{
      return false;
    }
  }.property("uploadsRemaining"),
  isProcessing:false,
  isUploading:false,
  actions:{
    startUploading:function(){
      this.set("isUploading",true)
    },
    startProcessing:function(){
      this.set("isProcessing",true)
      this.set("isUploading",false)
    },
    finishUpload:function(){
      this.set("isProcessing",false)
      this.set("isUPloading",false)
    },
    pushDataSourceIntoStore:function(data){
      this.sendAction("pushDataSourceActionName",data)
    },
    setCurrentUploadType:function(upload_type){
      this.set("currentUploadType",upload_type);
      this.set("currentUploadFormName",this.get("uploadTypes")[upload_type]);
    },
    triggerUpload:function(formName){
      console.log("hi");
      console.log(formName);
      $("#"+formName+" .input_field").trigger("click");
    }
  }
});
