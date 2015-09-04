import Ember from 'ember';

export default Ember.Mixin.create({
  currentPage:1,

  actions:{
    changePage: function (index) {
      this.set("currentPage", index);
    },
    incrementPage:function(index){
      this.set("currentPage",Math.floor((index-1)/8)*8+9);
    },
    decrementPage:function(index){
      this.set("currentPage",Math.floor((index-1)/8)*8-7);
    }
  },

  visibleList: function () {
    return _.first(_.rest(this.get("paginationMixinInput"), (this.get("currentPage") - 1) * this.get("perPage")), this.get("perPage"));
  }.property( "paginationMixinInput.[]", "currentPage"),
  paginationHash: function(){
    var controller = this;
    var length = this.get("paginationMixinInput").length;
    var ceiling=0;
    if (length % this.get("perPage") === 0) {
      ceiling = Math.floor(length / this.get("perPage"));
    } else {
      ceiling = (Math.floor(length / this.get("perPage")) + 1);
    }
    var pagination = _.map(_.range(1, ceiling + 1), function (page) {
      if (page === controller.get("currentPage")) {
        return [page, true];
      } else {
        return [page, false];
      }
    });
    var currentPageGroupIndex=0;
    var groupIndex=-1;
    var groups=[];
    _.each(pagination,function(element,index){
      if(index%8===0){
        groups.push([]);
        groupIndex+=1;
      }
      if(element[1]===true){
        currentPageGroupIndex=groupIndex;
      }
      groups[Math.floor(index/8)].push(element);
    });
    var paginationHash={};
    paginationHash["pages"]=groups[currentPageGroupIndex];
    if(currentPageGroupIndex>0){
      paginationHash["leftArrow"]=true;
    }
    else{
      paginationHash["leftArrow"]=false;
    }
    if(currentPageGroupIndex<groups.length-1){
      paginationHash["rightArrow"]=true;
    }
    else{
      paginationHash["rightArrow"]=false;
    }
    return paginationHash;
  }.property("paginationMixinInput.[]", "perPage","currentPage")
});
