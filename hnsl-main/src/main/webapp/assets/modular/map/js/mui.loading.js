(function ($, window) {
    //显示加载框
    $.showLoading = function (type) {
        var html = '';

        html =
            `<svg version="1.1" id="dc-spinner"
     xmlns="http://www.w3.org/2000/svg"
     x="0px" y="0px" width:"38" height:"44" viewBox="0 0 38 44" preserveAspectRatio="xMinYMin meet" >
<text x="4" y="42" font-family="Monaco" font-size="5px" style="letter-spacing:0.6" fill="white">正在加载中...
    <animate
            attributeName="opacity"
            values="0;1;0" dur="1.8s"
            repeatCount="indefinite"/>
</text>
<image xlink:href="/assets/modular/map/img/load.png" x="6" y="6" height="28" width="28"/>
<path fill="#373a42" d="M20,35c-8.271,0-15-6.729-15-15S11.729,5,20,5s15,6.729,15,15S28.271,35,20,35z M20,5.203
    C11.841,5.203,5.203,11.841,5.203,20c0,8.159,6.638,14.797,14.797,14.797S34.797,28.159,34.797,20
    C34.797,11.841,28.159,5.203,20,5.203z">
</path>

<path fill="#373a42" d="M20,33.125c-7.237,0-13.125-5.888-13.125-13.125S12.763,6.875,20,6.875S33.125,12.763,33.125,20
    S27.237,33.125,20,33.125z M20,7.078C12.875,7.078,7.078,12.875,7.078,20c0,7.125,5.797,12.922,12.922,12.922
    S32.922,27.125,32.922,20C32.922,12.875,27.125,7.078,20,7.078z">
</path>

<path fill="#2AA198" stroke="#2AA198" stroke-width="0.6027" stroke-miterlimit="10" d="M5.203,20
			c0-8.159,6.638-14.797,14.797-14.797V5C11.729,5,5,11.729,5,20s6.729,15,15,15v-0.203C11.841,34.797,5.203,28.159,5.203,20z">
    <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            calcMode="spline"
            keySplines="0.4, 0, 0.2, 1"
            keyTimes="0;1"
            dur="2s"
            repeatCount="indefinite"/>
</path>

<path fill="#859900" stroke="#859900" stroke-width="0.2027" stroke-miterlimit="10" d="M7.078,20
  c0-7.125,5.797-12.922,12.922-12.922V6.875C12.763,6.875,6.875,12.763,6.875,20S12.763,33.125,20,33.125v-0.203
  C12.875,32.922,7.078,27.125,7.078,20z">
    <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="1.8s"
            repeatCount="indefinite"/>
</path>
</svg>`
        //遮罩层
        var mask = document.getElementsByClassName("mui-show-loading-mask");
        if (mask.length == 0) {
            mask = document.createElement('div');
            mask.classList.add("mui-show-loading-mask");
            document.body.appendChild(mask);
            mask.addEventListener("touchmove", function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
        } else {
            mask[0].classList.remove("mui-show-loading-mask-hidden");
        }
        //加载框
        var toast = document.getElementsByClassName("mui-show-loading");
        if (toast.length == 0) {
            toast = document.createElement('div');
            toast.classList.add("mui-show-loading");
            toast.classList.add('loading-visible');
            document.body.appendChild(toast);
            toast.innerHTML = html;
            toast.addEventListener("touchmove", function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
        } else {
            toast[0].innerHTML = html;
            toast[0].classList.add("loading-visible");
        }
    };
    //隐藏加载框
    $.hideLoading = function (callback) {

        var mask = document.getElementsByClassName("mui-show-loading-mask");
        var toast = document.getElementsByClassName("mui-show-loading");
        if (mask.length > 0) {
            mask[0].classList.add("mui-show-loading-mask-hidden");
        }
        if (toast.length > 0) {
            toast[0].classList.remove("loading-visible");
            callback && callback();
        }
    }
})(mui, window);
