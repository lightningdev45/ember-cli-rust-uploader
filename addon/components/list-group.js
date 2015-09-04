import Ember from 'ember';
import Pagination from "ember-cli-rust-uploader/mixins/pagination";
export default Ember.Component.extend(Pagination,{
  classNames:["panel", "panel-default"],
  paginationMixinInput:Ember.computed.alias("listGroup"),
  perPage:5
});
