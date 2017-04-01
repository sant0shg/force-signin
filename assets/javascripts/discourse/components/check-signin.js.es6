import {setSigninNotify} from 'discourse/plugins/force-signin/discourse/components/is-check-signin';
export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    var self = this;
    
    // Preconditions
    if(!this.siteSettings.force_signin_enabled) return;
    if ($(".current-user").length > 0) return; // must not be logged in
    // if($(".topic-post").length == 0) return;
    if(Discourse.User.current() != null) return;

    setTimeout(function(){
        setSigninNotify(true);
        $(".login-button").click();
        
    },1000)
  }
});
