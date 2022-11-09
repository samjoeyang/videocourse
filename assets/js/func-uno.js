document.write("<script language=javascript src = 'assets/js/jquery.min.js'></script>"); 
!function () {
    var pageDate = new Date;
    var domain = window.location.host || "MOOC COURSE DEMO"

    // $("#copyright_host").text(domain.toUpperCase()).attr('href', window.location.origin || "#")
    // $("#copyright_year").text(pageDate.getFullYear())
    document.getElementById('copyright_host').innerHTML = domain.toUpperCase()
    document.getElementById('copyright_host').setAttribute('href', window.location.origin || "#")
    document.getElementById('copyright_year').innerHTML = pageDate.getFullYear()
}();