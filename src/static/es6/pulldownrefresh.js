/**
 *
 * Created by kunjieyan on 2018/1/11.
 *
 */
import PullDownRefresh from 'mylib/PullDownRefresh'
window.onload = function () {
    let pullDownRefresh = new PullDownRefresh({
        // scrollSlct:".tab-page",
        bodySlct: "#wrapper",
        uiBoxSlct: ".pulldown-ui",
        triggerFn: function() {
            console.log('triggerFn')
        }
    });

    pullDownRefresh.init();
}
