import Ember from 'ember';

export default Ember.Component.extend({
  classNames:["rmenu"],
  didInsertElement:function(){
    console.log(this.get("dataSource"))
    var component=this;
    this.$().find(".deleteMenu").on("click",function(){
        component.send("deleteDataSource");
      });
    var mousedownHandler=function(event){
      if(event.button===2){
        $(".rmenu").css("display","none");
        $("body").unbind("mousedown",mousedownHandler);
        $("body").unbind("click",clickHandler);
      }
    };
    var clickHandler=function(){
      $(".rmenu").css("display","none");
      $("body").unbind("click",clickHandler);
      $("body").unbind("mousedown",mousedownHandler);
    };
    $("html").on("mousedown",mousedownHandler);
    $("html").on("click",clickHandler);
  },
  setPosition:function(){
    $(".rmenu").offset({top:this.get("yPosition"),left:this.get("xPosition")});
  }.observes("xPosition","yPosition"),
  actions:{
    deleteDataSource:function(){
      this.get("confirmModal").set("visible",true)
      this.get("confirmModal").set("message","Are you sure you would like to delete this DataSource and associated records?")
      var dataSource=this.get("dataSource");
      this.get("confirmModal").set("callback",function(result){
        if(result){
          dataSource.destroyRecord().then(function(){

          },function(error){
            dataSource.rollback();
          });
        }
      })
    }
  }
});
