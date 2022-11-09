// document.write("<script language = javascript src = 'assets/js/jquery.min.js' ></script>"); 
!function () {
    var website_title = "视频教程网站(DEMO)"
    var pageDate = new Date;
    var domain = window.location.host || "MOOC COURSE DEMO"
    var chg_title = document.getElementsByTagName('title')[0].innerText
    if (chg_title) {
        chg_title += " - " + website_title
    }
    // $("#copyright_host").text(domain.toUpperCase()).attr('href', window.location.origin || "#")
    // $("#copyright_year").text(pageDate.getFullYear())
    document.getElementsByTagName('title')[0].innerText = chg_title
    console.info("通过func-uno.js改变页面title标签内容", chg_title)
    document.getElementById('copyright_host').innerHTML = domain.toUpperCase()
    document.getElementById('copyright_host').setAttribute('href', window.location.origin || "#")
    document.getElementById('copyright_year').innerText = pageDate.getFullYear()
}();