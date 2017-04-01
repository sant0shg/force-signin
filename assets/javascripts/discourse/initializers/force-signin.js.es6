import { default as computed, on, observes } from 'ember-addons/ember-computed-decorators';
import dModal from 'discourse/components/d-modal';
import {getSigninNotify,setSigninNotify} from 'discourse/plugins/force-signin/discourse/components/is-check-signin';
export default {
    name : 'force-signin',
    initialize(){
        
        dModal.reopen({
            
            @on("didInsertElement")
            setUp() {
                $('html').on('keydown.discourse-modal', e => {
                if (e.which === 27) {
                    Em.run.next(() => $('.modal-header a.close').click());
                }
                });

                this.appEvents.on('modal:body-shown', data => {
                if (data.title) {
                    this.set('title', I18n.t(data.title));
                } else if (data.rawTitle) {
                    this.set('title', data.rawTitle);
                }
                if(getSigninNotify() && !this.siteSettings.force_signin_allow_close)
                    $(".login-modal .close").css("display","none");
                });
            },

            click(e) {
                const $target = $(e.target);
                if (($target.hasClass("modal-middle-container") ||
                    $target.hasClass("modal-outer-container")) &&
                    !getSigninNotify()) {
                // Delegate click to modal close if clicked outside.
                // We do this because some CSS of ours seems to cover
                // the backdrop and makes it unclickable.
                if(getSigninNotify() && !this.siteSettings.force_signin_allow_close){
                    $(".login-modal .close").css("display","inline-block");
                    setSigninNotify(false)
                }
                    
                $('.modal-header a.close').click();
                }
            }
        })
    }
}