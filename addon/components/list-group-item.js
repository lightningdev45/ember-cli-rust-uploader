import Ember from 'ember';
export default Ember.Component.extend({

  didInsertElement:function(){
    console.log(this.$().position());
  },
  contextMenu:function(event){
    this.send("showCustomMenu",event);
    return false;
  },
  actions:{
    showCustomMenu:function(event){
      //this.$().css("background","#e8e8e8")
      var component=this;
      console.log(this.get("dataSource.id"))
      var x=event.pageX;
      var y=event.pageY;
      this.$().find(".rmenu").css("display","inline-block");
      component.set("rightClickX",x);
      component.set("rightClickY",y);
    }
  }
});;
