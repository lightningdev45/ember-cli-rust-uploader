import Ember from 'ember';

export default Ember.Component.extend({
  classNames:["loading-bar-container"],
  classNameBindings:["borderClass"],
  isFinished:Ember.computed.alias("uploadContainer.isFinished"),
  isUploading:Ember.computed.alias("uploadContainer.isUploading"),
  isProcessing:Ember.computed.alias("uploadContainer.isProcessing"),
  progressStatusClass:function(){
    if(this.get("isFinished")){
      return "progress-bar-success";
    }else if(this.get("isUploading")){
      return "progress-bar-warning";
    }else{
      return "";
    }
  }.property("isFinished","isProcessing","isUploading"),
  borderClass:function(){
    if(this.get("isFinished")){
      return "finished-border";
    }else if(this.get("isUploading")){
      return "processing-border";
    }else{
      return "uploading-border";
    }
  }.property("isFinished","isProcessing","isUploading"),
  actions:{
    closeLoadingBar:function(){
      this.$().css("display","none");
    }
  }
});
